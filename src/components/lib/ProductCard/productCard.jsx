import { ProductCardWrapper } from "./productCard.styles";
import { FlexibleDiv } from "../Box/styles";
import { AiFillStar as LikeIcon } from "react-icons/ai";
import { AiFillHeart as HeartIcon } from "react-icons/ai";
import ReactCountryFlag from "react-country-flag";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductCard({ card, key, isLoading = false }) {
  const maxLikes = ["", "", "", "", ""];

  if (isLoading) {
    return <LoadingCard />;
  } else {
    return (
      <ProductCardWrapper key={key}>
        <img className="card__image" src={card.image.src} alt="" />
        <FlexibleDiv
          className="product__info"
          justifyContent="space-between"
          flexDir="row"
          flexWrap="nowrap"
        >
          <p className="product__name">{card.deviceName}</p>
          <div className="likes__wrapper">
            {maxLikes.map((like, idx) => (
              <LikeIcon
                className={`= ${maxLikes.length}`}
                size={10}
                fill={`${card.likes >= idx + 1 ? "#FCCB1B" : "#BDBDBD"}`}
                key={idx}
              />
            ))}
            <p className="likes__number">{card.likes}.0</p>
          </div>
        </FlexibleDiv>
        <p className="phone__status">{card.deviceStatus}</p>
        <FlexibleDiv className="product__price__section" justifyContent="start">
          <p className="product__price">{card.price}</p>
          <p className="discounted__price">{card.discountedPrice}</p>
        </FlexibleDiv>

        <FlexibleDiv className="favorite__wrapper">
          <HeartIcon
            size={18}
            fill={card.isFavorite ? "var(--orrsiPrimary)" : "transparent"}
          />
        </FlexibleDiv>
        <FlexibleDiv className="seller__info" justifyContent="flex-start">
          <p className="seller__text">From {card.seller}</p>
          <ReactCountryFlag countryCode={card.countryAbbrv} />
        </FlexibleDiv>
      </ProductCardWrapper>
    );
  }
}

export function LoadingCard({ key }) {
  return (
    <ProductCardWrapper key={key}>
      <SkeletonTheme
        baseColor="rgba(148, 148, 148, 0.1)"
        highlightColor="rgba(202, 202, 202, 0.4)"
      >
        <div className="card__image">
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
