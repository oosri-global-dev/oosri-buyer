import React, { useEffect, useMemo, useState } from "react";
import { ProductPageWrapper, ProductBreadcrumbsWrapper } from "./productPage.styles";
import { AiFillStar as StarIcon, AiFillHeart as HeartFilledIcon, AiOutlineHeart as HeartOutlineIcon } from "react-icons/ai";
import { FiPlus as PlusIcon } from "react-icons/fi";
import { HiOutlineMinusSmall as MinusIcon } from "react-icons/hi2";
import { MdOutlineLocalShipping as ShipIcon, MdOutlineSecurity as SecureIcon } from "react-icons/md";
import { TbArrowBackUp as ReturnIcon } from "react-icons/tb";
import { IoCopyOutline as CopyIcon, IoShareSocialOutline as ShareIcon, IoCheckmarkOutline as CheckIcon } from "react-icons/io5";
import Button from "@/components/lib/Button";
import { Spin } from "antd";
import SafeImage from "@/components/lib/SafeImage/SafeImage";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import OorsiLoader from "@/components/lib/Loader/loader";
import ProductsGridBox from "../HomeScreens/Homepage/ProductsGridBox/productsGridBox";
import ProductDescription from "./sections/product-desc/productDescription";
import ProductReviewBox from "./sections/product-reviews/productReview";
import { MoreReviews } from "./sections/more-reviews/moreReviews";
import { useMainContext } from "@/context";
import { useProductPrice, useFormatPrice } from "@/data-helpers/hooks";
import { useReviewsQuery, createReview } from "@/network/reviews";
import { handleAddProductToSavedItems, handleRemoveProductFromSavedItems } from "@/network/product";
import { TOAST_BOX } from "@/context/types";

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: 4, cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon
          key={n}
          size={24}
          color={(hovered || value) >= n ? "#FCCB1B" : "#E0E0E0"}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
        />
      ))}
    </div>
  );
}

function WriteReviewForm({ productId, user, queryClient }) {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const { push, asPath } = useRouter();

  if (!user || (!user._id && !user.id)) {
    return (
      <div style={{
        border: "1px dashed #E0E0E0", borderRadius: 12,
        padding: "20px 24px", marginBottom: 24, textAlign: "center",
      }}>
        <p style={{ fontSize: 14, color: "#555", margin: "0 0 12px" }}>
          Log in to leave a review
        </p>
        <button
          onClick={() => push(`/login?from=${encodeURIComponent(asPath)}`)}
          style={{
            background: "var(--orrsiPrimary)", color: "#fff",
            border: "none", borderRadius: 8, padding: "9px 20px",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Log in
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div style={{
        border: "1px solid #E8F5E9", borderRadius: 12, background: "#F0FDF4",
        padding: "16px 20px", marginBottom: 24,
        fontSize: 14, color: "#15803D", fontWeight: 500,
      }}>
        Review submitted — thank you!
      </div>
    );
  }

  const handleSubmit = async () => {
    if (rating === 0) { setError("Please select a star rating."); return; }
    if (!text.trim()) { setError("Please write something about the product."); return; }
    setError("");
    setSubmitting(true);
    try {
      await createReview({ productId, review: text.trim(), productRating: rating });
      queryClient.invalidateQueries({ queryKey: ["reviews", productId] });
      setSubmitted(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to submit review. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{
      border: "1px solid #F0F0F0", borderRadius: 12,
      padding: "20px 20px 16px", marginBottom: 24, background: "#FAFAFA",
    }}>
      <p style={{ fontSize: 14, fontWeight: 700, color: "#212121", margin: "0 0 12px" }}>
        Write a Review
      </p>
      <StarPicker value={rating} onChange={setRating} />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Share your experience with this product…"
        style={{
          width: "100%", minHeight: 80, marginTop: 12, padding: "10px 12px",
          border: "1px solid #E0E0E0", borderRadius: 8, fontSize: 13,
          fontFamily: "inherit", resize: "vertical", color: "#212121",
          outline: "none", boxSizing: "border-box", background: "#fff",
        }}
      />
      {error && (
        <p style={{ fontSize: 12, color: "#DC2626", margin: "6px 0 0" }}>{error}</p>
      )}
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            background: "var(--orrsiPrimary)", color: "#fff",
            border: "none", borderRadius: 8, padding: "9px 22px",
            fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            opacity: submitting ? 0.6 : 1,
          }}
        >
          {submitting ? "Submitting…" : "Submit Review"}
        </button>
      </div>
    </div>
  );
}

function StarRow({ rating = 0, size = 15 }) {
  const filled = Math.round(rating);
  return (
    <span className="star__row">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} size={size} color={i <= filled ? "#FCCB1B" : "#e0e0e0"} />
      ))}
    </span>
  );
}

async function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text);
  }
  const el = document.createElement("textarea");
  el.value = text;
  el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0";
  document.body.appendChild(el);
  el.focus();
  el.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(el);
  if (!ok) throw new Error("copy failed");
}

function ShareButtons({ product }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(typeof navigator !== "undefined" && !!navigator.share);
  }, []);

  const handleCopy = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      await copyToClipboard(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (_) {}
  };

  const handleNativeShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = product?.productName || "Check this out on Oosri";
    try {
      await navigator.share({ title, text: `${title} — shop on Oosri`, url });
    } catch (err) {
      if (err.name !== "AbortError") handleCopy();
    }
  };

  return (
    <div className="pdp__share__group">
      <button type="button" className="pdp__share__btn" onClick={handleCopy} title="Copy link">
        {copied ? <><CheckIcon size={14} /> Copied!</> : <><CopyIcon size={14} /> Copy Link</>}
      </button>
      {canNativeShare && (
        <button type="button" className="pdp__share__btn pdp__share__icon" onClick={handleNativeShare} title="Share">
          <ShareIcon size={15} />
        </button>
      )}
    </div>
  );
}

export default function ProductPage({ product, loading, relatedProducts }) {
  const { push, asPath } = useRouter();
  const { cart, addToCart, removeFromCart, updateQuantity, dispatch, setBuyNowItem, user, currency } =
    useMainContext();
  const queryClient = useQueryClient();

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [numOfProduct, setNumOfProduct] = useState(1);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [isLoadingIncrease, setIsLoadingIncrease] = useState(false);
  const [isLoadingDecrease, setIsLoadingDecrease] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [moreReviewsActive, setMoreReviewsActive] = useState(false);

  const priceData = useProductPrice(product);
  const formatPrice = useFormatPrice();
  const { data: reviewsData, isLoading: isLoadingReviews } = useReviewsQuery(product?._id);
  const reviews = useMemo(() => reviewsData?.body?.reviews || [], [reviewsData]);
  const starData = reviewsData?.body?.ratingSummary;

  const productInCart = useMemo(
    () => cart.find((item) => item?._id === product?._id),
    [cart, product]
  );

  useEffect(() => {
    setNumOfProduct(productInCart ? productInCart.quantity : 1);
  }, [productInCart]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [product?._id]);

  const images = product?.productImages || [];
  const selectedImage = images[selectedIdx] || images[0] || null;
  const discountPct =
    priceData?.hasDiscount && priceData?.originalPrice
      ? Math.round(((priceData.originalPrice - priceData.price) / priceData.originalPrice) * 100)
      : 0;

  const sellerStoreName = product?.seller?.storeProfile?.storeName || product?.seller?._id || product?.seller;
  const sellerDisplayName =
    product?.seller?.corporateBusinessAccount?.companyName ||
    product?.seller?.storeProfile?.storeName ||
    product?.sellerName ||
    null;

  const handleDecrement = async () => {
    if (numOfProduct <= 1 || isLoadingDecrease) return;
    if (productInCart) {
      await updateQuantity(product, numOfProduct - 1, setIsLoadingDecrease);
      setNumOfProduct((n) => n - 1);
    } else {
      setNumOfProduct((n) => Math.max(1, n - 1));
    }
  };

  const handleIncrement = async () => {
    if (isLoadingIncrease) return;
    if (productInCart) {
      await updateQuantity(product, numOfProduct + 1, setIsLoadingIncrease);
      setNumOfProduct((n) => n + 1);
    } else {
      setNumOfProduct((n) => n + 1);
    }
  };

  const handleBuyNow = () => {
    if (!user || (!user._id && !user.id)) {
      push(`/login?from=${encodeURIComponent(asPath)}`);
      return;
    }
    setBuyNowItem({ ...product, quantity: numOfProduct });
    push("/checkout");
  };

  const handleCartToggle = () => {
    if (productInCart) {
      removeFromCart(product, setIsLoadingBtn);
    } else {
      addToCart({ ...product, quantity: numOfProduct }, setIsLoadingBtn);
    }
  };

  const handleFavorite = async () => {
    if (isSavingFavorite || !product?._id) return;
    if (!user || !user.id) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: "Please login to save items" } });
      setTimeout(() => push("/login"), 1800);
      return;
    }
    setIsSavingFavorite(true);
    try {
      if (isFavorite) {
        await handleRemoveProductFromSavedItems(product._id);
        setIsFavorite(false);
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Removed from saved items" } });
      } else {
        const res = await handleAddProductToSavedItems(product._id);
        setIsFavorite(true);
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: res?.message || "Added to saved items" } });
      }
      queryClient.invalidateQueries({ queryKey: ["saved-items"], refetchType: "none" });
    } catch (err) {
      dispatch({ type: TOAST_BOX, payload: { type: "error", message: err?.response?.data?.message || "Failed to update saved items" } });
    } finally {
      setIsSavingFavorite(false);
    }
  };

  if (loading) return <OorsiLoader />;

  if (moreReviewsActive) {
    return (
      <ProductPageWrapper>
        <MoreReviews
          id={product?._id}
          starData={starData}
          reviewData={reviews}
          setMoreReviewsActive={() => setMoreReviewsActive(false)}
        />
      </ProductPageWrapper>
    );
  }

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: product?.category || "Shop", href: `/shop?category=${encodeURIComponent(product?.category || "")}` },
    { label: product?.productName || "", href: null },
  ];

  return (
    <>
      <ProductBreadcrumbsWrapper>
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {crumb.href ? (
              <Link href={crumb.href} className="crumb__link">
                {crumb.label}
              </Link>
            ) : (
              <span className="crumb__current">{crumb.label}</span>
            )}
            {idx < breadcrumbs.length - 1 && <span className="crumb__sep">/</span>}
          </React.Fragment>
        ))}
      </ProductBreadcrumbsWrapper>

      <ProductPageWrapper>
        <div className="pdp__layout">

          {/* LEFT: Image gallery */}
          <div className="pdp__gallery">
            <div className="pdp__main__image">
              {selectedImage ? (
                <SafeImage
                  src={selectedImage}
                  alt={product?.productName || "product"}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 600px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="no__image__box">No image</div>
              )}
            </div>
            {images.length > 1 && (
              <div className="pdp__thumbs">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp__thumb${idx === selectedIdx ? " active" : ""}`}
                    onClick={() => setSelectedIdx(idx)}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <SafeImage
                      src={img}
                      alt={`${product?.productName} view ${idx + 1}`}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="80px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product info */}
          <div className="pdp__info">

            {/* Seller + share row */}
            <div className="pdp__seller__row">
              {sellerDisplayName && sellerStoreName ? (
                <Link href={`/store/${sellerStoreName}`} className="pdp__seller__link">
                  {sellerDisplayName}
                </Link>
              ) : sellerDisplayName ? (
                <span className="pdp__brand">{sellerDisplayName}</span>
              ) : null}
              <ShareButtons product={product} />
            </div>

            <h1 className="pdp__name">{product?.productName}</h1>

            <div className="pdp__rating__row">
              <StarRow rating={product?.productRating || 0} size={15} />
              <span className="pdp__rating__score">{product?.productRating || 0}.0</span>
              <button
                type="button"
                className="pdp__review__link"
                onClick={() => setActiveTab("reviews")}
              >
                {isLoadingReviews ? "…" : `${reviews.length} review${reviews.length !== 1 ? "s" : ""}`}
              </button>
              {product?.numOfPurchase > 0 && (
                <span className="pdp__purchases">{product.numOfPurchase} purchases</span>
              )}
            </div>

            <div className="pdp__divider" />

            <div className="pdp__price__block">
              {currency === 'NGN' ? (
                // For NGN buyers: use the raw NGN price directly — avoids NGN→USD→NGN
                // double conversion which introduces rounding errors of ₦1–₦125.
                <>
                  <span className="pdp__price">
                    ₦{Math.round(product?.salesPrice > 0 ? product.salesPrice : (product?.regularPrice || 0)).toLocaleString()}
                  </span>
                  {product?.salesPrice > 0 && product?.regularPrice > product.salesPrice && (
                    <>
                      <span className="pdp__original__price">
                        ₦{Math.round(product.regularPrice).toLocaleString()}
                      </span>
                      {discountPct > 0 && <span className="pdp__discount__badge">-{discountPct}%</span>}
                    </>
                  )}
                </>
              ) : (
                <>
                  <span className="pdp__price">{formatPrice(priceData?.price || 0)}</span>
                  {priceData?.hasDiscount && priceData?.originalPrice && (
                    <>
                      <span className="pdp__original__price">{formatPrice(priceData.originalPrice)}</span>
                      {discountPct > 0 && <span className="pdp__discount__badge">-{discountPct}%</span>}
                    </>
                  )}
                </>
              )}
            </div>

            <div className="pdp__divider" />

            <div className="pdp__delivery__row">
              <ShipIcon size={17} color="var(--orrsiPrimary)" />
              <span>
                Shipping fee:{" "}
                <strong>{formatPrice(product?.shippingFee || 0)}</strong>
              </span>
            </div>

            <div className="pdp__divider" />

            <div className="pdp__qty__row">
              <span className="pdp__qty__label">Quantity</span>
              <div className="pdp__qty__control">
                <button
                  type="button"
                  className="pdp__qty__btn"
                  onClick={handleDecrement}
                  disabled={numOfProduct <= 1 || isLoadingDecrease}
                  aria-label="Decrease quantity"
                >
                  {isLoadingDecrease ? <Spin size="small" /> : <MinusIcon size={16} />}
                </button>
                <span className="pdp__qty__value">
                  {numOfProduct < 10 ? `0${numOfProduct}` : numOfProduct}
                </span>
                <button
                  type="button"
                  className="pdp__qty__btn"
                  onClick={handleIncrement}
                  disabled={isLoadingIncrease}
                  aria-label="Increase quantity"
                >
                  {isLoadingIncrease ? <Spin size="small" /> : <PlusIcon size={16} />}
                </button>
              </div>
            </div>

            <div className="pdp__ctas">
              <Button
                width="100%"
                height="50px"
                backgroundColor="var(--orrsiPrimary)"
                color="#fff"
                radius="12px"
                fontSize="0.95rem"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                width="100%"
                height="50px"
                backgroundColor="transparent"
                color="var(--orrsiPrimary)"
                border="1px solid var(--orrsiPrimary)"
                hoverBg="var(--orrsiPrimary)"
                hoverColor="#fff"
                radius="12px"
                fontSize="0.95rem"
                loading={isLoadingBtn}
                onClick={handleCartToggle}
              >
                {productInCart ? "Remove from Cart" : "Add to Cart"}
              </Button>
              <button
                type="button"
                className={`pdp__wishlist__btn${isFavorite ? " saved" : ""}`}
                onClick={handleFavorite}
                disabled={isSavingFavorite}
              >
                {isFavorite ? <HeartFilledIcon size={17} /> : <HeartOutlineIcon size={17} />}
                {isFavorite ? "Saved to Wishlist" : "Save to Wishlist"}
              </button>
            </div>

            <div className="pdp__trust">
              <div className="trust__badge">
                <SecureIcon size={15} />
                <span>Secure Payment</span>
              </div>
              <div className="trust__badge">
                <ReturnIcon size={15} />
                <span>Easy Returns</span>
              </div>
            </div>

          </div>
        </div>

        {/* TABS */}
        <div className="pdp__tabs">
          <div className="pdp__tab__bar" role="tablist">
            <button
              role="tab"
              aria-selected={activeTab === "description"}
              className={`pdp__tab${activeTab === "description" ? " active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              role="tab"
              aria-selected={activeTab === "reviews"}
              className={`pdp__tab${activeTab === "reviews" ? " active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
              {reviews.length > 0 && (
                <span className="tab__count__badge">{reviews.length}</span>
              )}
            </button>
          </div>

          <div className="pdp__tab__content">
            {activeTab === "description" && (
              <ProductDescription content={product?.productDescription || ""} />
            )}
            {activeTab === "reviews" && (
              <>
                <WriteReviewForm
                  productId={product?._id}
                  user={user}
                  queryClient={queryClient}
                />
                <ProductReviewBox
                  reviews={reviews}
                  loading={isLoadingReviews}
                  onSeeMore={reviews.length > 0 ? () => setMoreReviewsActive(true) : null}
                />
              </>
            )}
          </div>
        </div>

        {/* Related products */}
        {(relatedProducts || []).length > 0 && (
          <div className="pdp__related">
            <ProductsGridBox
              content={relatedProducts}
              sectionTitle="You May Also Like"
              showViewAll={false}
            />
          </div>
        )}

      </ProductPageWrapper>
    </>
  );
}
