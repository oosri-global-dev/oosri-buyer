import { ProductCardWrapper } from "./productCard.styles";
import { FlexibleDiv } from "../Box/styles";
import { AiFillStar as LikeIcon } from "react-icons/ai";
import { AiFillHeart as HeartIcon } from "react-icons/ai";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { formatCurrency, useProductPrice } from "@/data-helpers/hooks";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../Button";
import { useMainContext } from "@/context";
import { useState } from "react";
import { handleAddProductToSavedItems } from "@/network/product";
import { TOAST_BOX } from "@/context/types";

export function LoadingCard({ keyProp }) {
  return (
    <ProductCardWrapper key={keyProp}>
      <SkeletonTheme
        baseColor="rgba(148, 148, 148, 0.1)"
        highlightColor="rgba(202, 202, 202, 0.4)"
      >
        <div className="card__image" style={{ position: "relative" }}>
          <Skeleton style={{ height: "100%" }} />
        </div>
        <div style={{ width: "100%", height: "fit-content", marginTop: "6px" }}>
          <Skeleton style={{ width: "80%" }} />
          <Skeleton style={{ width: "60%" }} />
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

export default function ProductCard({ card, keyProp, isLoading = false }) {
  const { push } = useRouter();

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

  /**
   * ✅ NEW: Remove "ghost" products (the exact one you circled)
   * If it's not VIEW_MORE and it doesn't have a valid product id,
   * it isn't a real product — so we don't render it.
   */
  if (!card?._id) return null;

  // ✅ Normal product card logic
  const maxLikes = ["", "", "", "", ""];
  const { cart, addToCart, removeFromCart, dispatch, user } = useMainContext();
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(card?.isFavorite || false);
  const [isSavingFavorite, setIsSavingFavorite] = useState(false);
  const priceData = useProductPrice(card);

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
      const res = await handleAddProductToSavedItems(card._id);
      setIsFavorite(true);
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "success",
          message: res?.message || "Product added to favorites successfully",
        },
      });
    } catch (error) {
      dispatch({
        type: TOAST_BOX,
        payload: {
          type: "error",
          message:
            error?.response?.data?.message ||
            "Failed to add product to favorites",
        },
      });
    } finally {
      setIsSavingFavorite(false);
    }
  };

  const imgSrc = getFirstProductImage(card);

  return (
    <ProductCardWrapper key={keyProp}>
      <div className="card__wrap">
        <div className="card__image" style={{ position: "relative" }}>
          {imgSrc ? (
            <Image
              src={imgSrc}
              alt={`${card?._id} product image`}
              layout="fill"
              objectFit="cover"
              onClick={() => push(`/product/${card?._id}`)}
            />
          ) : (
            <div
              onClick={() => push(`/product/${card?._id}`)}
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                opacity: 0.7,
                cursor: "pointer",
              }}
            >
              No image
            </div>
          )}
        </div>

        <FlexibleDiv
          className="product__info"
          justifyContent="flex-start"
          alignItems="flex-start"
          flexDir="column"
          flexWrap="nowrap"
          gap="4px"
          onClick={() => push(`/product/${card?._id}`)}
        >
          <p className="product__name">{card?.productName || ""}</p>

          <div className="likes__wrapper">
            {maxLikes.map((_, idx) => (
              <LikeIcon
                size={10}
                fill={card?.productRating >= idx + 1 ? "#FCCB1B" : "#BDBDBD"}
                key={idx}
              />
            ))}
            <p className="likes__number">{card?.productRating || 0}.0</p>
          </div>
        </FlexibleDiv>

        <FlexibleDiv className="product__price__section" justifyContent="start">
          <p className="product__price">
            {formatCurrency(priceData?.price || 0)}
          </p>

          {priceData?.hasDiscount && priceData?.originalPrice && (
            <p className="discounted__price">
              {formatCurrency(priceData?.originalPrice || 0)}
            </p>
          )}
        </FlexibleDiv>

        <FlexibleDiv className="favorite__wrapper">
          <HeartIcon
            size={18}
            fill={isFavorite ? "var(--orrsiPrimary)" : "transparent"}
            onClick={handleFavoriteClick}
            style={{
              cursor: isSavingFavorite ? "not-allowed" : "pointer",
              opacity: isSavingFavorite ? 0.6 : 1,
            }}
          />
        </FlexibleDiv>

        <FlexibleDiv className="seller__info" justifyContent="flex-start">
          <p className="seller__text">
            From <span>{card?.sellerName || ""}</span>
          </p>
        </FlexibleDiv>
      </div>

      {isProductInCart(card?._id) ? (
        <Button
          width="100%"
          color="#000"
          backgroundColor="var(--orrsiSecondary)"
          hoverBg="var(--orrsiPrimary)"
          borderColor="#fff"
          hoverColor="#fff"
          radius="5px"
          height="40px"
          fontSize="0.85rem"
          border="1px solid #000"
          loading={isLoadingBtn}
          onClick={() => removeFromCart(card, setIsLoadingBtn)}
          className={!isLoadingBtn ? "remove-from-cart-btn" : "loading-btn"}
        >
          Remove from cart
        </Button>
      ) : (
        <Button
          width="100%"
          color="var(--orrsiWhite)"
          backgroundColor="var(--orrsiPrimary)"
          radius="5px"
          height="40px"
          fontSize="0.85rem"
          loading={isLoadingBtn}
          onClick={() => addToCart(card, setIsLoadingBtn)}
          className={!isLoadingBtn ? "add-to-cart-btn" : "loading-btn"}
        >
          Add to cart
        </Button>
      )}
    </ProductCardWrapper>
  );
}