import { ProductCardWrapper } from "./productCard.styles";
import { FlexibleDiv } from "../Box/styles";
import { AiFillStar as LikeIcon } from "react-icons/ai";
import { AiFillHeart as HeartIcon } from "react-icons/ai";
import ReactCountryFlag from "react-country-flag";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { nairaFormatter } from "@/data-helpers/hooks";
import { useRouter } from "next/router";
import Image from "next/image";
import Button from "../Button";

export function LoadingCard({ key }) {
  return (
    <ProductCardWrapper key={key}>
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

export default function ProductCard({ card, key, isLoading = false }) {
  const maxLikes = ["", "", "", "", ""];
  const { push } = useRouter();

  if (isLoading) {
    return <LoadingCard key={key} />;
  } else {
    return (
      <ProductCardWrapper key={key}>
        <div className="card__wrap">
          <div className="card__image">
            <Image
              src={card?.productImages[0]}
              alt={`${card?._id} product image`}
              layout="fill"
              objectFit="cover"
              onClick={() => push(`/product/${card?._id}`)}
            />
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
              {maxLikes.map((like, idx) => (
                <LikeIcon
                  className={`= ${maxLikes.length}`}
                  size={10}
                  fill={`${
                    card?.productRating >= idx + 1 ? "#FCCB1B" : "#BDBDBD"
                  }`}
                  key={idx}
                />
              ))}
              <p className="likes__number">{card?.productRating || 0}.0</p>
            </div>
          </FlexibleDiv>
          {/* <p className="phone__status">{card.deviceStatus}</p> */}
          <FlexibleDiv
            className="product__price__section"
            justifyContent="start"
          >
            <p className="product__price">
              {nairaFormatter.format(card?.productPrice || 0)}
            </p>
            {card?.previousPrice && (
              <p className="discounted__price">
                {nairaFormatter.format(card?.previousPrice || 0)}
              </p>
            )}
          </FlexibleDiv>

          <FlexibleDiv className="favorite__wrapper">
            <HeartIcon
              size={18}
              fill={card.isFavorite ? "var(--orrsiPrimary)" : "transparent"}
              onClick={() => {}}
            />
          </FlexibleDiv>
          <FlexibleDiv className="seller__info" justifyContent="flex-start">
            <p className="seller__text">
              From <span>{card?.sellerName || ""}</span>
            </p>
            {/* <ReactCountryFlag countryCode={card.countryAbbrv} /> */}
          </FlexibleDiv>
        </div>
        <Button
          width="100%"
          color="var(--orrsiWhite)"
          backgroundColor="var(--orrsiPrimary)"
          radius="5px"
          height="40px"
          fontSize="0.85rem"
        >
          Add to cart
        </Button>
      </ProductCardWrapper>
    );
  }
}
