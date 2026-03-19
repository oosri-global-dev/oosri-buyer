import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { OrderDetailsWrapper } from './index.styles';
import { NameTag } from '../components/nameTag';
import { useGetOrderById } from '@/network/orders';

export default function OrderDetailsScreen() {
    const router = useRouter();
    const { id } = router.query;

    // Fetch order details using the API
    const { data, isLoading, isError } = useGetOrderById(id);
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

    // Format date/time
    const formatDateTime = (dateString) => {
        if (!dateString) return "Today @ 12:30PM";
        const date = new Date(dateString);
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        const timeString = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
        return isToday ? `Today @ ${timeString}` : `${date.toLocaleDateString()} @ ${timeString}`;
    };

    // Get status class
    const getStatusClass = (status) => {
        const statusLower = status?.toLowerCase() || "";
        if (statusLower.includes("picked")) return "picked";
        if (statusLower.includes("delivered")) return "delivered";
        if (statusLower.includes("cancelled")) return "cancelled";
        return "pending";
    };

    const orderNumber = order?.orderNumber || order?.id || "N/A";
    const status = order?.status || "Pending";
    const createdAt = formatDateTime(order?.createdAt || order?.date);
    const vendorName = order?.vendorName || order?.seller?.name || "Deskmound Gadget";
    const vendorImage = order?.vendorImage || order?.seller?.image || "https://placehold.co/24x24";

    // Handle single item or multiple items
    const items = order?.items || [];
    const firstItem = items[0] || order;
    const productImage = firstItem?.image || firstItem?.productImage || "https://placehold.co/150x150";
    const productTitle = firstItem?.title || firstItem?.productTitle || "Product Title";
    const productPrice = firstItem?.price || firstItem?.amount || "N0";

    const deliveryAddress = order?.deliveryAddress || {};
    const address = deliveryAddress?.address || "Michael John Street, Sanrab, Sabo Road Lokoja";
    const landmark = deliveryAddress?.landmark || "Opposite Crystal Clear School";
    const deliveryFee = order?.deliveryFee || deliveryAddress?.fee || "N500";

    const subTotal = order?.subTotal || order?.totalAmount || productPrice;
    const grandTotal = order?.grandTotal || order?.totalAmount || "N820,500";

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
                  <span className={`order_status ${getStatusClass(status)}`}>
                      {status}
                  </span>
              </span>
              <button className='order_status track' onClick={() => router.push(`/order/${id}/track`)}>
                  Track Order
              </button>
          </div>

          <p className='time_frame'>{createdAt}</p>

          <div>
              <NameTag name={vendorName} image={vendorImage} />

              {/* Product Card */}
              <div className='product_card'>
                  <div className='product_card_content'>
                      <div className='product_image_container'>
                          <Image src={productImage} alt={productTitle} className='product_image' width={150} height={150} />
                      </div>
                      <div className='product_info'>
                          <p className='order_id'>Order #{orderNumber}</p>
                          <h4 className='product_title'>{productTitle}</h4>
                          <div className='product_footer'>
                              <h3 className='product_price'>{productPrice}</h3>
                              <p className='product_time'>{createdAt}</p>
                          </div>
                      </div>
                  </div>
              </div>

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
                      <p className='landmark_label'>Landmark: <span className='landmark_value'>{landmark}</span></p>
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
