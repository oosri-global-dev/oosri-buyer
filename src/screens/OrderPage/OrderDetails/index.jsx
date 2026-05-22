import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SafeImage from '@/components/lib/SafeImage/SafeImage';
import { OrderDetailsWrapper } from './index.styles';
import { NameTag } from '../components/nameTag';
import { useGetOrderById, useCancelOrder } from '@/network/orders';
import { formatCurrency, stripHtml } from '@/data-helpers/hooks';
import ReturnRequestModal from './ReturnRequestModal';
import toast, { Toaster } from 'react-hot-toast';

const RETURNABLE_STATUSES = ['completed', 'processing', 'pending_logistics'];
const CANCELLABLE_STATUSES = ['pending', 'processing', 'pending_logistics'];

export default function OrderDetailsScreen() {
    const router = useRouter();
    const { id } = router.query;
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [showCancelConfirm, setShowCancelConfirm] = useState(false);
    const { mutate: cancelOrder, isLoading: isCancelling } = useCancelOrder();

    const { data, isLoading, isError } = useGetOrderById(id);
    // The network layer does: const { data } = await instance.get(...)  → data = API response
    // API response shape: { status, message, body: { orderId, products, sellerFullName, ... } }
    const order = data?.body || data;

    if (isLoading) {
        return (
            <OrderDetailsWrapper>
                <p className="loading_text">Loading order details...</p>
            </OrderDetailsWrapper>
        );
    }

    if (isError || !order) {
        return (
            <OrderDetailsWrapper>
                <p className="error_text">Failed to load order details</p>
            </OrderDetailsWrapper>
        );
    }

    // ─── Date formatting ───────────────────────────────────────────────────────
    const formatDateTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // backend already formatted
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        const timeString = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return isToday
            ? `Today @ ${timeString}`
            : `${date.toLocaleDateString()} @ ${timeString}`;
    };

    // ─── Status helper ──────────────────────────────────────────────────────────
    const getStatusClass = (status) => {
        const s = status?.toLowerCase() || "";
        if (s.includes("delivered") || s.includes("completed")) return "delivered";
        if (s.includes("cancel")) return "cancelled";
        return "pending";
    };

    // ─── Core order fields (matching real API keys) ─────────────────────────────
    const orderNumber = order?.orderId || order?.id || order?._id || "N/A";
    const orderStatus = order?.orderStatus || order?.status || "Pending";
    const createdAt = formatDateTime(order?.orderDate || order?.createdAt || order?.date);

    // ─── Vendor ────────────────────────────────────────────────────────────────
    // The API returns sellerFullName at the order level (not on each product object)
    const firstProduct = order?.products?.[0] || {};
    const vendorName = order?.sellerFullName || '';
    const vendorImage = order?.vendorImage || 'https://placehold.co/24x24';

    // ─── Product fields ─────────────────────────────────────────────────────────
    // API response product object keys (from buyerOrderService retrieveOrderById):
    //   productName, productDescription, productBrand, color, condition,
    //   productType, dimension, productImage (array), productAmount (NGN), productAmountUSD
    const productTitle = firstProduct?.productName || 'Product';

    // productImage is an array of Cloudinary URLs
    const productImage = Array.isArray(firstProduct?.productImage)
        ? (firstProduct.productImage[0] || 'https://placehold.co/150x150')
        : (firstProduct?.productImage || 'https://placehold.co/150x150');

    // productDescription comes as HTML — strip tags before displaying
    const productDescription = stripHtml(firstProduct?.productDescription || '');

    // ─── Currency detection ───────────────────────────────────────────────────────
    const currencyCode = order?.currencyCode || 'USD';
    const isNGN = currencyCode === 'NGN';

    // ─── Product price ────────────────────────────────────────────────────────────
    // NGN orders: productAmount is the native NGN price stored in DB.
    // USD orders: productAmountUSD = productAmount × fxRate, computed server-side.
    const productAmountRaw = isNGN
        ? (firstProduct?.productAmount ?? null)
        : (firstProduct?.productAmountUSD ?? null);
    const productPrice = productAmountRaw !== null
        ? formatCurrency(productAmountRaw, currencyCode)
        : '—';

    // Extra product fields
    const productBrand = firstProduct?.productBrand || "";
    const color = firstProduct?.color || "";
    const condition = firstProduct?.condition || "";
    const productType = firstProduct?.productType || "";
    const dimension = firstProduct?.dimension || "";

    // ─── Delivery address ────────────────────────────────────────────────────────
    const addr = order?.deliveryAddress || {};
    const address = [addr.address, addr.cityName, addr.countryName]
        .filter(Boolean)
        .join(', ') || 'Address not available';
    const postalCode = addr.postalCode ? `Postal Code: ${addr.postalCode}` : '';
    const landmark = order?.landMark || order?.landmark || '';

    // ─── Financial summary ────────────────────────────────────────────────────────
    //
    // NGN orders (Paystack): subtotal/totalAmount/deliveryFee are all in NGN.
    // USD orders (Stripe):   subtotalUSD/totalAmountUSD/deliveryFeeUSD are the real values.
    //
    // Both paths show '—' when the value is null (fxRate service was down server-side).

    const subTotalRaw = isNGN ? (order?.subtotal ?? null) : (order?.subtotalUSD ?? null);
    const subTotal = subTotalRaw !== null ? formatCurrency(subTotalRaw, currencyCode) : '—';

    const deliveryFeeRaw = isNGN ? (order?.deliveryFee ?? 0) : (order?.deliveryFeeUSD ?? 0);
    const deliveryFeeDisplay = deliveryFeeRaw === 0
        ? 'Free'
        : formatCurrency(deliveryFeeRaw, currencyCode);

    const grandTotalRaw = isNGN ? (order?.totalAmount ?? null) : (order?.totalAmountUSD ?? null);
    const grandTotal = grandTotalRaw !== null ? formatCurrency(grandTotalRaw, currencyCode) : '—';

    return (
        <OrderDetailsWrapper>
            <Toaster />
            <p className="breadcrumb__paragraph">
                <span onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>Home</span> /
                <span onClick={() => router.push('/order')} style={{ cursor: 'pointer' }}> My Order</span> /
                <span> Order#{orderNumber}</span>
            </p>

            <div className='top_section'>
                <span className='order_title'>
                    <h3>Order #{orderNumber}</h3>
                    <span className={`order_status ${getStatusClass(orderStatus)}`}>
                        {orderStatus}
                    </span>
                </span>
                {/*
                <button className='order_status track' onClick={() => router.push(`/order/${id}/track`)}>
                    Track Order
                </button>
                */}
            </div>

            <p className='time_frame'>{createdAt}</p>

            <div>
                {vendorName && <NameTag name={vendorName} image={vendorImage} />}

                {/* Product Card */}
                <div className='product_card'>
                    <div className='product_card_content'>
                        <div className='product_image_container'>
                            <SafeImage
                                src={productImage}
                                alt={productTitle}
                                className='product_image'
                                width={150}
                                height={150}
                            />
                        </div>
                        <div className='product_info'>
                            <p className='order_id'>Order #{orderNumber}</p>
                            <h4 className='product_title'>{productTitle}</h4>
                            {productDescription && (
                                <p className='product_description' style={{ fontSize: '13px', color: '#666', marginTop: '4px' }}>
                                    {productDescription}
                                </p>
                            )}

                            {/* Extra Product Attributes */}
                            <div className='product_extra_attributes' style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '12px', color: '#555' }}>
                                {productBrand && <span style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}><b>Brand:</b> {productBrand}</span>}
                                {color && <span style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}><b>Color:</b> {color}</span>}
                                {condition && <span style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}><b>Condition:</b> {condition}</span>}
                                {productType && <span style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}><b>Type:</b> {productType}</span>}
                                {dimension && <span style={{ background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px' }}><b>Dimensions:</b> {dimension}</span>}
                            </div>
                            <div className='product_footer'>
                                <h3 className='product_price'>{productPrice}</h3>
                                <p className='product_time'>{createdAt}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Extra items */}
                {(order?.products || order?.items || []).length > 1 && (
                    <p style={{ fontSize: '13px', color: '#888', marginTop: '8px' }}>
                        +{(order?.products || order?.items).length - 1} more item(s) in this order
                    </p>
                )}

                <span className='total_amount'>
                    <p className='total_text'>Sub Total:</p>
                    <p>{subTotal}</p>
                </span>

                {/* Delivery Address Section */}
                <div className='delivery_section'>
                    <div className='delivery_header'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 7H16V6C16 4.9 15.1 4 14 4H10C8.9 4 8 4.9 8 6V7H5C3.9 7 3 7.9 3 9V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V9C21 7.9 20.1 7 19 7ZM10 6H14V7H10V6ZM19 19H5V9H19V19Z" fill="#FC5353" />
                        </svg>
                        <h5 className='delivery_title'>Delivery Address</h5>
                    </div>
                    <div className='delivery_details'>
                        <p className='address_text'>{address}</p>
                        {postalCode && <p className='landmark_label'>{postalCode}</p>}
                        {landmark && (
                            <p className='landmark_label'>Landmark: <span className='landmark_value'>{landmark}</span></p>
                        )}
                        <div className='delivery_fee_row'>
                            <p className='fee_label'>Delivery Fee:</p>
                            <p className='fee_value'>{deliveryFeeDisplay}</p>
                        </div>
                    </div>
                </div>

                <span className='total_amount grand_total'>
                    <p className='total_text'>Grand Total:</p>
                    <p className='grand_total_value'>{grandTotal}</p>
                </span>

                {CANCELLABLE_STATUSES.includes(orderStatus?.toLowerCase()) && (
                    <div style={{ marginTop: 24, borderTop: '1px solid #EEEEEE', paddingTop: 20 }}>
                        {!showCancelConfirm ? (
                            <>
                                <p style={{ fontSize: 13, color: '#9E9E9E', margin: '0 0 10px' }}>
                                    Need to cancel? You can cancel this order while it has not yet shipped.
                                </p>
                                <button
                                    onClick={() => setShowCancelConfirm(true)}
                                    style={{
                                        background: '#fff',
                                        border: '1px solid #9E9E9E',
                                        color: '#555',
                                        borderRadius: 8,
                                        padding: '10px 20px',
                                        fontSize: 14,
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontFamily: 'inherit',
                                    }}
                                >
                                    Cancel Order
                                </button>
                            </>
                        ) : (
                            <div style={{ background: '#FFF8F8', border: '1px solid #FFCDD2', borderRadius: 10, padding: '20px' }}>
                                <p style={{ fontSize: 15, color: '#222', margin: '0 0 16px', fontWeight: 700 }}>
                                    Before you cancel — here's what happens next
                                </p>

                                {/* Refund process steps */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
                                    {[
                                        {
                                            step: '1',
                                            title: 'Cancellation is confirmed',
                                            body: 'Your order status will change to Cancelled and the seller will be notified immediately.',
                                        },
                                        {
                                            step: '2',
                                            title: 'Refund is initiated',
                                            body: isNGN
                                                ? 'A refund will be submitted to Paystack and routed back to your original payment method (bank account or card).'
                                                : 'A refund will be submitted to Stripe and routed back to your original card.',
                                        },
                                        {
                                            step: '3',
                                            title: isNGN ? '3–5 business days' : '5–10 business days',
                                            body: isNGN
                                                ? 'Our payment partners typically complete refunds within 3–5 business days. Weekends and public holidays are not counted.'
                                                : 'Our payment partners typically complete refunds within 5–10 business days. The exact timing may vary depending on your card issuer.',
                                        },
                                        {
                                            step: '4',
                                            title: 'Confirmation email',
                                            body: 'You will receive an email confirmation once the cancellation is processed. If your refund does not arrive after the stated period, contact our support team.',
                                        },
                                    ].map(({ step, title, body }) => (
                                        <div key={step} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                            <div style={{
                                                minWidth: 24, height: 24, borderRadius: '50%',
                                                background: '#FC5353', color: '#fff',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: 12, fontWeight: 700, flexShrink: 0,
                                            }}>
                                                {step}
                                            </div>
                                            <div>
                                                <p style={{ margin: '0 0 2px', fontSize: 13, fontWeight: 600, color: '#333' }}>{title}</p>
                                                <p style={{ margin: 0, fontSize: 12, color: '#777', lineHeight: 1.5 }}>{body}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <p style={{ fontSize: 12, color: '#B00020', margin: '0 0 16px', fontWeight: 600 }}>
                                    ⚠ This action cannot be undone once confirmed.
                                </p>

                                <div style={{ display: 'flex', gap: 10 }}>
                                    <button
                                        disabled={isCancelling}
                                        onClick={() => {
                                            cancelOrder(String(orderNumber), {
                                                onSuccess: () => {
                                                    toast.success('Order cancelled. A confirmation email is on its way.', { position: 'top-center', duration: 4000 });
                                                    setTimeout(() => router.push('/order'), 1200);
                                                },
                                                onError: (err) => {
                                                    toast.error(err?.response?.data?.message || err.message || 'Failed to cancel order', { position: 'top-center' });
                                                    setShowCancelConfirm(false);
                                                },
                                            });
                                        }}
                                        style={{
                                            background: '#FC5353',
                                            border: 'none',
                                            color: '#fff',
                                            borderRadius: 8,
                                            padding: '10px 20px',
                                            fontSize: 14,
                                            fontWeight: 600,
                                            cursor: isCancelling ? 'not-allowed' : 'pointer',
                                            opacity: isCancelling ? 0.7 : 1,
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        {isCancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
                                    </button>
                                    <button
                                        disabled={isCancelling}
                                        onClick={() => setShowCancelConfirm(false)}
                                        style={{
                                            background: '#fff',
                                            border: '1px solid #DDDDDD',
                                            color: '#333',
                                            borderRadius: 8,
                                            padding: '10px 20px',
                                            fontSize: 14,
                                            fontWeight: 600,
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                        }}
                                    >
                                        Keep Order
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {RETURNABLE_STATUSES.includes(orderStatus?.toLowerCase()) && (
                    <div style={{ marginTop: 24, borderTop: '1px solid #EEEEEE', paddingTop: 20 }}>
                        <p style={{ fontSize: 13, color: '#9E9E9E', margin: '0 0 10px' }}>
                            Not satisfied with your order? You can request a return within the eligible window.
                        </p>
                        <button
                            onClick={() => setShowReturnModal(true)}
                            style={{
                                background: '#fff',
                                border: '1px solid #FC5353',
                                color: '#FC5353',
                                borderRadius: 8,
                                padding: '10px 20px',
                                fontSize: 14,
                                fontWeight: 600,
                                cursor: 'pointer',
                                fontFamily: 'inherit',
                            }}
                        >
                            Request Return
                        </button>
                    </div>
                )}
            </div>

            {showReturnModal && (
                <ReturnRequestModal
                    orderId={String(orderNumber)}
                    onClose={() => setShowReturnModal(false)}
                />
            )}
        </OrderDetailsWrapper>
    );
}
