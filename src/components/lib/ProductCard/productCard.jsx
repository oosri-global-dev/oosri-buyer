import { ProductCardWrapper } from "./productCard.styles";
import { FlexibleDiv } from "../Box/styles";
import { AiFillStar as StarIcon, AiFillHeart as HeartFilledIcon, AiOutlineHeart as HeartOutlineIcon } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useProductPrice, useFormatPrice } from "@/data-helpers/hooks";
import { useRouter } from "next/router";
import Image from "next/image";
import SafeImage from "../SafeImage/SafeImage";
import Button from "../Button";
import { useMainContext } from "@/context";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { handleAddProductToSavedItems, handleRemoveProductFromSavedItems } from "@/network/product";
import { TOAST_BOX } from "@/context/types";

export function LoadingCard({ keyProp }) {
  return (
    <ProductCardWrapper key={keyProp} className="loading">
      <SkeletonTheme
        baseColor="rgba(148, 148, 148, 0.1)"
        highlightColor="rgba(202, 202, 202, 0.4)"
      >
        <div style={{ aspectRatio: "1/1", width: "100%", background: "#f8f8f8" }}>
          <Skeleton style={{ width: "100%", height: "100%" }} />
        </div>
        <div style={{ padding: "12px", display: "flex", flexDirection: "column", gap: 8 }}>
          <Skeleton style={{ width: "50%", height: 11 }} />
          <Skeleton style={{ width: "85%", height: 14 }} />
          <Skeleton style={{ width: "40%", height: 11 }} />
          <Skeleton style={{ width: "55%", height: 16, marginTop: 4 }} />
        </div>
        <div style={{ padding: "0 12px 12px", display: "flex", gap: 8 }}>
          <Skeleton style={{ flex: 1, height: 38, borderRadius: 8 }} />
          <Skeleton style={{ flex: 1, height: 38, borderRadius: 8 }} />
        </div>
      </SkeletonTheme>
    </ProductCardWrapper>
  );
}

// ✅ Safe image getter
const getFirstProductImage = (card) => {
  const imgs = card?.productImages;
  if (Array.isArray(imgs) && imgs.length > 0 && typeof imgs[0] === "string") {
    return imgs[0];
  }
  return null;
};

const getDisplayBrandName = (card) => {
  return (
    card?.brandName ||
    card?.productBrand ||
    card?.brandArtist ||
    card?.artist ||
    card?.sellerName ||
    ""
  );
};

export default function ProductCard({ card, keyProp, isLoading = false }) {
  const { push, asPath } = useRouter();

  // ✅ ALL hooks declared unconditionally at the top — Rules of Hooks
  const { cart, addToCart, removeFromCart, dispatch, user, setBuyNowItem, currency } = useMainContext();
  const queryClient = useQueryClient();
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(card?.isFavorite || false);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const priceData = useProductPrice(card);
  const formatPrice = useFormatPrice();

  // ✅ 0) If card is empty, don't render anything
  if (!card) return null;

  // ✅ 1) Handle View More tile FIRST (so it never behaves like a product)
  if (card?.type === "VIEW_MORE") {
    const handleClick = (e) => {
      e?.stopPropagation?.();
      if (typeof card?.onClick === "function") card.onClick();
    };

    return (
      <ProductCardWrapper
        key={keyProp}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
      >
        <div className="card__wrap">
          <div
            className="card__image"
            style={{
              background: "rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "14px",
              overflow: "hidden",
            }}
          >
            <button
              type="button"
              onClick={handleClick}
              style={{
                border: "none",
                outline: "none",
                padding: "12px 22px",
                borderRadius: "999px",
                background: "rgba(0,0,0,0.85)",
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {card?.title || "View all"}
            </button>
          </div>

          <FlexibleDiv
            className="product__info"
            justifyContent="flex-start"
            alignItems="flex-start"
            flexDir="column"
            flexWrap="nowrap"
            gap="4px"
          >
            <p className="product__name" style={{ opacity: 0.85 }}>
              {card?.subtitle || ""}
            </p>
            <div style={{ height: 14 }} />
          </FlexibleDiv>
        </div>
      </ProductCardWrapper>
    );
  }

  // ✅ Loading state
  if (isLoading) {
    return <LoadingCard keyProp={keyProp} />;
  }

  if (!card?._id) return null;

  // ✅ Normal product card logic
  const maxLikes = ["", "", "", "", ""];

  const isProductInCart = (productId) => {
    return cart.some((item) => item._id === productId);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (isSavingFavorite || !card?._id) return;

    if (!user || !user.id) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: "Please login to save products to your wishlist",
        },
      });

      setTimeout(() => {
        push("/login");
      }, 2000);
      return;
    }

    setIsSavingFavorite(true);
    try {
      if (isFavorite) {
        await handleRemoveProductFromSavedItems(card._id);
        setIsFavorite(false);
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: "Removed from saved items" } });
      } else {
        const res = await handleAddProductToSavedItems(card._id);
        setIsFavorite(true);
        dispatch({ type: TOAST_BOX, payload: { type: "success", message: res?.message || "Added to saved items" } });
      }
      // Mark stale without immediate refetch — prevents wishlist page glitch
      queryClient.invalidateQueries({ queryKey: ["saved-items"], refetchType: "none" });
    } catch (error) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message: error?.response?.data?.message || "Failed to update saved items",
        },
      });
    } finally {
      setIsSavingFavorite(false);
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();
    if (!user || (!user._id && !user.id)) {
      push(`/login?from=${encodeURIComponent(asPath)}`);
      return;
    }
    setBuyNowItem({ ...card, quantity: 1 });
    push("/checkout");
  };

  const imgSrc = getFirstProductImage(card);
  const brandName = getDisplayBrandName(card);
  const inCart = isProductInCart(card?._id);

  return (
    <ProductCardWrapper key={keyProp}>
      {/* ── Image ── */}
      <div
        className="card__image"
        onClick={() => push(`/product/${card?._id}`)}
      >
        {imgSrc ? (
          <SafeImage
            src={imgSrc}
            alt={card?.productName || "product"}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 480px) 48vw, (max-width: 900px) 32vw, 220px"
          />
        ) : (
          <div className="no__image">No image</div>
        )}

        {/* Heart badge */}
        <button
          className={`heart__btn${isFavorite ? " active" : ""}`}
          onClick={(e) => { e.stopPropagation(); handleFavoriteClick(e); }}
          aria-label={isFavorite ? "Remove from saved" : "Save item"}
          style={{ opacity: isSavingFavorite ? 0.5 : 1 }}
        >
          {isFavorite
            ? <HeartFilledIcon size={15} />
            : <HeartOutlineIcon size={15} />
          }
        </button>

      </div>

      {/* ── Info ── */}
      <div
        className="card__body"
        onClick={() => push(`/product/${card?._id}`)}
      >
        {brandName && <p className="card__brand">{brandName}</p>}
        <p className="card__name">{card?.productName || ""}</p>

        <div className="card__rating">
          {maxLikes.map((_, idx) => (
            <StarIcon
              key={idx}
              size={11}
              color={card?.productRating >= idx + 1 ? "#FCCB1B" : "#e0e0e0"}
            />
          ))}
          <span className="rating__num">{card?.productRating || 0}.0</span>
        </div>

        <div className="card__price__row">
          {currency === 'NGN' ? (
            <span className="card__price">
              ₦{Math.round(card?.discountPrice > 0 && card?.discountPrice < card?.regularPrice ? card.discountPrice : (card?.regularPrice || 0)).toLocaleString()}
            </span>
          ) : (
            <span className="card__price">
              {formatPrice(priceData?.price || 0)}
            </span>
          )}
        </div>
      </div>

      {/* ── Actions ── */}
      <div className="card__actions">
        {inCart ? (
          <>
            <Button
              width="100%"
              color="var(--orrsiPrimary)"
              backgroundColor="transparent"
              border="1px solid var(--orrsiPrimary)"
              hoverBg="var(--orrsiPrimary)"
              hoverColor="var(--orrsiWhite)"
              radius="8px"
              height="38px"
              fontSize="0.8rem"
              loading={isLoadingBtn}
              onClick={(e) => { e.stopPropagation(); removeFromCart(card, setIsLoadingBtn); }}
              className={!isLoadingBtn ? "remove-from-cart-btn" : "loading-btn"}
            >
              Remove
            </Button>
            <Button
              width="100%"
              color="var(--orrsiWhite)"
              backgroundColor="var(--orrsiPrimary)"
              radius="8px"
              height="38px"
              fontSize="0.8rem"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </>
        ) : (
          <>
            <Button
              width="100%"
              color="var(--orrsiPrimary)"
              backgroundColor="transparent"
              border="1px solid var(--orrsiPrimary)"
              hoverBg="var(--orrsiPrimary)"
              hoverColor="var(--orrsiWhite)"
              radius="8px"
              height="38px"
              fontSize="0.8rem"
              loading={isLoadingBtn}
              onClick={(e) => { e.stopPropagation(); addToCart(card, setIsLoadingBtn); }}
              className={!isLoadingBtn ? "add-to-cart-btn" : "loading-btn"}
            >
              Add to cart
            </Button>
            <Button
              width="100%"
              color="var(--orrsiWhite)"
              backgroundColor="var(--orrsiPrimary)"
              radius="8px"
              height="38px"
              fontSize="0.8rem"
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </>
        )}
      </div>
    </ProductCardWrapper>
  );
}
