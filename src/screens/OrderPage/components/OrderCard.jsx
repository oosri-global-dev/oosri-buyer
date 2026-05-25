import SafeImage from "@/components/lib/SafeImage/SafeImage";
import { OrderCardWrapper } from "./orderComponent.styled";
import { useRouter } from "next/router";
import { formatCurrency, stripHtml } from "@/data-helpers/hooks";
import { MdOutlineChevronRight as ChevronIcon } from "react-icons/md";

const formatDateTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  const time = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  if (isToday) return `Today · ${time}`;
  if (isYesterday) return `Yesterday · ${time}`;
  return `${date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · ${time}`;
};

const getStatusClass = (status) => {
  const s = status?.toLowerCase() || "";
  if (s.includes("delivered") || s.includes("completed")) return "delivered";
  if (s.includes("cancelled")) return "cancelled";
  if (s.includes("picked")) return "picked";
  return "pending";
};

const getStatusLabel = (status) => {
  const s = status?.toLowerCase() || "";
  if (s.includes("delivered")) return "Delivered";
  if (s.includes("completed")) return "Completed";
  if (s.includes("cancelled")) return "Cancelled";
  if (s.includes("picked")) return "Picked Up";
  if (s.includes("processing")) return "Processing";
  return "Pending";
};

export default function OrderCard({ order }) {
  const router = useRouter();

  const handleCardClick = () => {
    const orderId = order?.orderId || order?.id || order?._id;
    if (orderId) router.push(`/order/${orderId}`);
  };

  const orderNumber = order?.orderId || order?.id || order?._id || "N/A";
  const orderStatus = order?.orderStatus || order?.status || "Pending";
  const dateString = order?.orderDate || order?.createdAt || order?.date;
  const allProducts = order?.products || order?.items || [];
  const firstProduct = allProducts[0] || {};
  const extraCount = allProducts.length - 1;

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
    null;

  const productDescription = stripHtml(
    firstProduct?.description ||
    firstProduct?.productDescription ||
    firstProduct?.product?.description ||
    ""
  );

  const currencyCode = order?.currencyCode || null;
  const usdAmount = order?.totalAmountUSD ?? null;
  const ngnAmount = order?.totalAmount ?? null;

  const statusClass = getStatusClass(orderStatus);
  const statusLabel = getStatusLabel(orderStatus);

  return (
    <OrderCardWrapper onClick={handleCardClick}>
      {/* ── Header ── */}
      <div className="card__header">
        <div className="header__left">
          <span className="order__number">#{String(orderNumber).slice(-8).toUpperCase()}</span>
          {dateString && (
            <span className="order__date">{formatDateTime(dateString)}</span>
          )}
        </div>
        <div className="header__right">
          <span className={`status__badge ${statusClass}`}>{statusLabel}</span>
          <ChevronIcon size={18} color="#bbb" />
        </div>
      </div>

      {/* ── Product preview ── */}
      <div className="product__preview">
        <div className="product__image">
          <SafeImage
            src={productImage}
            alt="product"
            width={72}
            height={72}
            className="product__img"
          />
        </div>
        <div className="product__info">
          <p className="product__title">{productTitle}</p>
          {productDescription && (
            <p className="product__desc">{productDescription}</p>
          )}
          {extraCount > 0 && (
            <p className="extra__items">
              +{extraCount} more item{extraCount > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="card__footer">
        <span className="footer__items__count">
          {allProducts.length} {allProducts.length === 1 ? "item" : "items"}
        </span>
        <span className="order__total">
          {currencyCode === 'NGN'
            ? (ngnAmount != null ? formatCurrency(ngnAmount, 'NGN') : '—')
            : (usdAmount != null ? formatCurrency(usdAmount, currencyCode || 'USD') : '—')}
        </span>
      </div>
    </OrderCardWrapper>
  );
}
