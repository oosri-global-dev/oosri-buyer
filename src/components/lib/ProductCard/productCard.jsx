import { ProductCardWrapper } from "./productCard.styles";
import { FlexibleDiv } from "../Box/styles";
import { AiFillStar as LikeIcon } from "react-icons/ai";
import { AiFillHeart as HeartIcon } from "react-icons/ai";
import ReactCountryFlag from "react-country-flag";

export default function ProductCard({ card, key }) {
  const maxLikes = ["", "", "", "", ""];

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
