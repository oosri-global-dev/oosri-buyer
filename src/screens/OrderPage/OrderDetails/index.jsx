import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { OrderDetailsWrapper } from './index.styles';
import { NameTag } from '../components/nameTag';
import { useGetOrderById } from '@/network/orders';
import { formatCurrency } from '@/data-helpers/hooks';

export default function OrderDetailsScreen() {
    const router = useRouter();
    const { id } = router.query;

    const { data, isLoading, isError } = useGetOrderById(id);
    // Backend wraps in body or returns directly
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

    // Vendor — comes from first product's sellerName
    const firstProduct = order?.products?.[0] || order?.items?.[0] || {};
    const vendorName = firstProduct?.sellerName || order?.vendorName || order?.seller?.name || "";
    const vendorImage = order?.vendorImage || order?.seller?.image || "https://placehold.co/24x24";

    // ─── Product fields ─────────────────────────────────────────────────────────
    const productTitle =
        firstProduct?.productName ||
        firstProduct?.title ||
        firstProduct?.product?.productName ||
        "Product";

    const productImage =
        firstProduct?.images?.[0] ||
        firstProduct?.productImages?.[0] ||
        firstProduct?.image ||
        firstProduct?.product?.productImages?.[0] ||
        "https://placehold.co/150x150";

    const productDescription =
        firstProduct?.description ||
        firstProduct?.productDescription ||
        firstProduct?.product?.description ||
        firstProduct?.product?.productDescription ||
        "";

    // Per-item price:
    // Use subtotalUSD (best USD subtotal from backend) divided by number of products
    const productCount = (order?.products || order?.items || []).length || 1;
    const subtotalUSDValue = order?.subtotalUSD || 0;
    const unitPrice = productCount > 0 ? subtotalUSDValue / productCount : subtotalUSDValue;
    const productPrice = formatCurrency(unitPrice);

    // ─── Address & fees ─────────────────────────────────────────────────────────
    const addr = order?.deliveryAddress || {};
    const address = [addr.address, addr.cityName, addr.countryName]
        .filter(Boolean)
        .join(", ") || "Address not available";
    const postalCode = addr.postalCode ? `Postal Code: ${addr.postalCode}` : "";
    const landmark = order?.landMark || order?.landmark || "";

    // deliveryFee: use NGN value if non-zero, else USD value; if both 0 → Free
    const deliveryFeeRaw = order?.deliveryFee || order?.deliveryFeeUSD || 0;
    const deliveryFee = deliveryFeeRaw === 0 ? "Free" : formatCurrency(deliveryFeeRaw);

    // ─── Totals ─────────────────────────────────────────────────────────────────
    // subtotalUSD is the pre-total in USD; totalAmount is the actual final charge in USD
    const subTotal = formatCurrency(order?.subtotalUSD || 0);
    const grandTotal = formatCurrency(order?.totalAmount || order?.subtotalUSD || 0);

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
                <button className='order_status track' onClick={() => router.push(`/order/${id}/track`)}>
                    Track Order
                </button>
            </div>

            <p className='time_frame'>{createdAt}</p>

            <div>
                {vendorName && <NameTag name={vendorName} image={vendorImage} />}

                {/* Product Card */}
                <div className='product_card'>
                    <div className='product_card_content'>
                        <div className='product_image_container'>
                            <Image
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
                            <p className='fee_value'>{deliveryFee}</p>
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
