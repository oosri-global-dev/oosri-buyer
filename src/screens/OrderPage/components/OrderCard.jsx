import React from "react";
import Image from "next/image";
import { OrderCardWrapper } from "./orderComponent.styled";
import { useRouter } from "next/router";

export default function OrderCard({ order }) {
  const router = useRouter();

  const handleCardClick = () => {
    if (order?.id || order?._id) {
      router.push(`/order/${order?.id || order?._id}`);
    }
  };

  // Format date/time if available
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

  // Get status badge class
  const getStatusClass = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower.includes("picked")) return "picked";
    if (statusLower.includes("delivered")) return "delivered";
    if (statusLower.includes("cancelled")) return "cancelled";
    if (statusLower.includes("pending")) return "pending";
    return "pending";
  };

  return (
    <OrderCardWrapper onClick={handleCardClick}>
      <div className="card_header">
        <h3 className="order_number">Order #{order?.orderNumber || order?.id || "N/A"}</h3>
        <span className={`status_badge ${getStatusClass(order?.status)}`}>
          {order?.status || "Pending"}
        </span>
      </div>
      <p className="timestamp">{formatDateTime(order?.createdAt || order?.date)}</p>
      
      <div className="card_content">
        <div className="product_image">
          <Image 
            src={order?.productImage || order?.items?.[0]?.image || "https://placehold.co/80x80"} 
            alt="Product"
            width={80}
            height={80}
          />
        </div>
        <div className="product_details">
          <h4 className="product_title">
            {order?.productTitle || order?.items?.[0]?.title || "Product Title"}
          </h4>
          {order?.items && order.items.length > 1 && (
            <p className="item_count">+{order.items.length - 1} more item{order.items.length > 2 ? "s" : ""}</p>
          )}
        </div>
      </div>
      
      <div className="card_footer">
        <span className="price">
          {order?.totalAmount || order?.price || "N0"}
        </span>
      </div>
    </OrderCardWrapper>
  );
}
