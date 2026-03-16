import React from "react";
import Image from "next/image";
import { OrderCardWrapper } from "./orderComponent.styled";
import { useRouter } from "next/router";
import { formatCurrency, stripHtml } from "@/data-helpers/hooks";

export default function OrderCard({ order }) {
  const router = useRouter();

  const handleCardClick = () => {
    const orderId = order?.orderId || order?.id || order?._id;
    if (orderId) {
      router.push(`/order/${orderId}`);
    }
  };

  // Format date/time — backend sends "YYYY-MM-DD HH:mm:ss AM/PM"
  const formatDateTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // fallback if parse fails
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

  // Get status badge class — backend uses "processing", "delivered", "cancelled"
  const getStatusClass = (status) => {
    const s = status?.toLowerCase() || "";
    if (s.includes("delivered") || s.includes("completed")) return "delivered";
    if (s.includes("cancelled")) return "cancelled";
    if (s.includes("processing") || s.includes("pending") || s.includes("picked"))
      return "pending";
    return "pending";
  };

  // Correct field names from the real API response
  const orderNumber = order?.orderId || order?.id || order?._id || "N/A";
  const orderStatus = order?.orderStatus || order?.status || "Pending";
  const dateString = order?.orderDate || order?.createdAt || order?.date;

  // Products live in order.products[]
  const firstProduct = order?.products?.[0] || order?.items?.[0] || {};
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
    "/images/placeholder.svg";
  const productDescription = stripHtml(
    firstProduct?.description ||
    firstProduct?.productDescription ||
    firstProduct?.product?.description ||
    firstProduct?.product?.productDescription ||
    ""
  );

  const extraCount = (order?.products || order?.items || []).length - 1;

  // Price: totalAmount is the correct grand total (totalAmountUSD can be near-zero test values)
  const totalAmount = order?.totalAmount || order?.subtotalUSD || order?.totalAmountUSD || 0;
  console.log(totalAmount, "TOTAL AMOUNT", order);

  return (
    <OrderCardWrapper onClick={handleCardClick}>
      <div className="card_header">
        <h3 className="order_number">Order #{orderNumber}</h3>
        <span className={`status_badge ${getStatusClass(orderStatus)}`}>
          {orderStatus}
        </span>
      </div>
      {/* <p className="timestamp">{formatDateTime(dateString)}</p> */}

      <div className="card_content">
        <div className="product_image">
          <Image
            src={productImage}
            alt={productTitle}
            width={80}
            height={80}
          />
        </div>
        <div className="product_details">
          <h4 className="product_title">{productTitle}</h4>
          {productDescription && (
            <p
              className="product_description"
              style={{
                fontSize: "12px",
                color: "#666",
                marginTop: "4px",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {productDescription}
            </p>
          )}
          {extraCount > 0 && (
            <p className="item_count">
              +{extraCount} more item{extraCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      <div className="card_footer">
        <span className="price">{formatCurrency(totalAmount)}</span>
      </div>
    </OrderCardWrapper>
  );
}
