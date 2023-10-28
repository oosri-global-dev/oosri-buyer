import { FlexibleDiv } from "../../Box/styles";
import { SingleCardWrapper } from "./singleCard.styles";
import { AiFillStar as LikeIcon } from "react-icons/ai";

export default function SingleCard({ key, product }) {
  const maxLikes = ["", "", "", "", ""];
  return (
    <>
      <SingleCardWrapper key={key}>
        <FlexibleDiv className="img__wrapper">
          <img src={product.image.src} alt="" />
        </FlexibleDiv>
        <FlexibleDiv className="product__info">
          <p className="device__name">{product.deviceName}</p>
          <FlexibleDiv
            flexDir="row"
            justifyContent="flex-start"
            className="price__wrapper"
          >
            <p className="product__price__grid">{product.price}</p>
            <p className="discounted__price__grid">{product.discountedPrice}</p>
          </FlexibleDiv>

          <div className="likes__wrapper">
            {maxLikes.map((like, idx) => (
              <LikeIcon
                className={`= ${maxLikes.length}`}
                size={8}
                fill={`${product.likes >= idx + 1 ? "#FCCB1B" : "#BDBDBD"}`}
                key={idx}
              />
            ))}
            <p className="likes__number">{product.likes}.0</p>
          </div>
        </FlexibleDiv>
      </SingleCardWrapper>
    </>
  );
}
