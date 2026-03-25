import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SafeImage from '@/components/lib/SafeImage/SafeImage';
import { OrderDetailsWrapper } from './index.styles';
import { NameTag } from '../components/nameTag';
import { useGetOrderById } from '@/network/orders';
import { formatCurrency, stripHtml } from '@/data-helpers/hooks';

export default function OrderDetailsScreen() {
    const router = useRouter();
    const { id } = router.query;

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
        if (s.includes("cancelled")) return "cancelled";
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

    // ─── Product price ────────────────────────────────────────────────────────────
    // productAmountUSD = product.totalPrice (NGN) × fxRate → correctly computed USD
    // by the backend at request time. Use it directly; never recompute on the frontend.
    // If null (fxRate service was unavailable server-side), show '—' gracefully.
    const productAmountUSD = firstProduct?.productAmountUSD ?? null;
    const productPrice = productAmountUSD !== null
        ? formatCurrency(productAmountUSD)
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
    // Backend response — currency type of each field:
    //
    //   subtotalUSD   = sum(product.totalPrice [NGN]) × fxRate  → USD ✓  USE THIS
    //   deliveryFee   = order.deliveryFee saved as shippingFeeUSD → USD ✓  USE THIS
    //   totalAmount   = Stripe product charge (USD) + deliveryFee  → USD ✓  USE THIS
    //
    //   deliveryFeeUSD = deliveryFee (USD) × fxRate → USD×(USD/NGN) ✗  NEVER USE
    //   totalAmountUSD = totalAmount (USD) × fxRate → USD×(USD/NGN) ✗  NEVER USE
    //
    // subtotalUSD can be null when the fxRate service is temporarily down.
    // Show '—' instead of '$0.00' so the buyer is not misled.

    // Subtotal: product cost only (no delivery)
    const subtotalUSD = order?.subtotalUSD ?? null;
    console.log(order, "ORDER IS HERE");
    const subTotal = subtotalUSD !== null ? formatCurrency(subtotalUSD) : '—';

    // Delivery fee: persisted in USD at checkout; 0 means free (or pre-fee legacy order)
    const deliveryFeeRaw = order?.deliveryFee ?? 0;   // USD — NOT deliveryFeeUSD
    const deliveryFeeDisplay = deliveryFeeRaw === 0
        ? 'Free'
        : formatCurrency(deliveryFeeRaw);

    // Grand total: Stripe product USD + delivery USD — the actual amount buyer was charged
    const grandTotalRaw = order?.totalAmount ?? null;  // USD — NOT totalAmountUSD
    const grandTotal = grandTotalRaw !== null ? formatCurrency(grandTotalRaw) : '—';

    return (
        <OrderDetailsWrapper>
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
            </div>
        </OrderDetailsWrapper>
    );
}
