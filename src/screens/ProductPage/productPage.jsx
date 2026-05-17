import React, { useEffect, useMemo, useState } from "react";
import { ProductPageWrapper, ProductBreadcrumbsWrapper } from "./productPage.styles";
import { AiFillStar as StarIcon, AiFillHeart as HeartFilledIcon, AiOutlineHeart as HeartOutlineIcon } from "react-icons/ai";
import { FiPlus as PlusIcon } from "react-icons/fi";
import { HiOutlineMinusSmall as MinusIcon } from "react-icons/hi2";
import { MdOutlineLocalShipping as ShipIcon, MdOutlineSecurity as SecureIcon } from "react-icons/md";
import { TbArrowBackUp as ReturnIcon } from "react-icons/tb";
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
import { useReviewsQuery } from "@/network/reviews";
import { handleAddProductToSavedItems, handleRemoveProductFromSavedItems } from "@/network/product";
import { TOAST_BOX } from "@/context/types";
import SellerEngagementCard from "./sections/community/SellerEngagementCard";
import CommunityDiscussions from "./sections/community/CommunityDiscussions";
import NegotiationModal from "./sections/community/NegotiationModal";
import { useNegotiation } from "@/hooks/useNegotiation";

// 5-star row (always renders 5, fills proportionally)
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

export default function ProductPage({ product, loading, relatedProducts }) {
  const { push, asPath } = useRouter();
  const { cart, addToCart, removeFromCart, updateQuantity, dispatch, setBuyNowItem, user } =
    useMainContext();
  const queryClient = useQueryClient();

  // ── State ──────────────────────────────────────────────────────────────────
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [numOfProduct, setNumOfProduct] = useState(1);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [isLoadingIncrease, setIsLoadingIncrease] = useState(false);
  const [isLoadingDecrease, setIsLoadingDecrease] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [moreReviewsActive, setMoreReviewsActive] = useState(false);
  const [negotiationOpen, setNegotiationOpen] = useState(false);

  // ── Data ───────────────────────────────────────────────────────────────────
  const priceData = useProductPrice(product);
  const formatPrice = useFormatPrice();
  const { submitOffer } = useNegotiation();
  const { data: reviewsData, isLoading: isLoadingReviews } = useReviewsQuery(product?._id);
  const reviews = useMemo(() => reviewsData?.body?.reviews || [], [reviewsData]);
  const starData = reviewsData?.body?.ratingSummary;

  const productInCart = useMemo(
    () => cart.find((item) => item?._id === product?._id),
    [cart, product]
  );

  // ── Sync state ─────────────────────────────────────────────────────────────
  useEffect(() => {
    setNumOfProduct(productInCart ? productInCart.quantity : 1);
  }, [productInCart]);

  useEffect(() => {
    setSelectedIdx(0);
  }, [product?._id]);

  // ── Derived ────────────────────────────────────────────────────────────────
  const images = product?.productImages || [];
  const selectedImage = images[selectedIdx] || images[0] || null;
  const discountPct =
    priceData?.hasDiscount && priceData?.originalPrice
      ? Math.round(((priceData.originalPrice - priceData.price) / priceData.originalPrice) * 100)
      : 0;

  // ── Handlers ───────────────────────────────────────────────────────────────
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

  // ── Loading / error states ─────────────────────────────────────────────────
  if (loading) return <OorsiLoader />;

  // ── More reviews full view ─────────────────────────────────────────────────
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

  // ── Breadcrumb ─────────────────────────────────────────────────────────────
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
        {/* ── TOP: Gallery + Info grid ── */}
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

            {/* Brand */}
            {(product?.brandName || product?.sellerName) && (
              <p className="pdp__brand">{product.brandName || product.sellerName}</p>
            )}

            {/* Name */}
            <h1 className="pdp__name">{product?.productName}</h1>

            {/* Rating + review count */}
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

            {/* Price block */}
            <div className="pdp__price__block">
              <span className="pdp__price">{formatPrice(priceData?.price || 0)}</span>
              {priceData?.hasDiscount && priceData?.originalPrice && (
                <>
                  <span className="pdp__original__price">{formatPrice(priceData.originalPrice)}</span>
                  {discountPct > 0 && <span className="pdp__discount__badge">-{discountPct}%</span>}
                </>
              )}
            </div>

            <div className="pdp__divider" />

            {/* Delivery info */}
            <div className="pdp__delivery__row">
              <ShipIcon size={17} color="var(--orrsiPrimary)" />
              <span>
                Shipping fee:{" "}
                <strong>{formatPrice(product?.shippingFee || 0)}</strong>
              </span>
            </div>

            <div className="pdp__divider" />

            {/* Quantity selector */}
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

            {/* CTA buttons */}
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

            {/* Trust badges */}
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

        {/* ── TABS: Description | Reviews ── */}
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
              onClick={() => setActiveTab("reviews")
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
              <ProductReviewBox
                reviews={reviews}
                loading={isLoadingReviews}
                onSeeMore={reviews.length > 0 ? () => setMoreReviewsActive(true) : null}
              />
            )}
          </div>
        </div>

        {/* ── Seller Engagement + Community Discussions ── */}
        <SellerEngagementCard
          seller={product?.seller}
          user={user}
          onNegotiate={() => setNegotiationOpen(true)}
        />
        <CommunityDiscussions
          productId={product?._id}
          sellerId={product?.seller?._id || product?.seller}
          user={user}
        />

        {/* ── Related products ── */}
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

      {negotiationOpen && product && (
        <NegotiationModal
          product={{ ...product, price: priceData?.originalPrice || priceData?.price || 0 }}
          seller={product.seller}
          onClose={() => setNegotiationOpen(false)}
          isSubmitting={submitOffer.isPending}
          onSubmit={async (payload) => {
            try {
              await submitOffer.mutateAsync(payload);
              setNegotiationOpen(false);
              dispatch({ type: "TOAST_BOX", payload: { type: "success", message: "Offer sent! The seller will respond within 48 hours." } });
            } catch (err) {
              dispatch({ type: "TOAST_BOX", payload: { type: "error", message: err?.response?.data?.message || "Failed to send offer." } });
            }
          }}
        />
      )}
    </>
  );
}
