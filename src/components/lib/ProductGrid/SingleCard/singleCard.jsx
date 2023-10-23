import { FlexibleDiv } from "../../Box/styles";
import { SingleCardWrapper } from "./singleCard.styles";

export default function SingleCard({ key, product }) {
  return (
    <>
      <SingleCardWrapper key={key}>
        <FlexibleDiv className="img__wrapper">
          <img src={product.image.src} alt="" />
        </FlexibleDiv>
        <FlexibleDiv className="product__info">
          <p>{product.deviceName}</p>
          <p>{product.price}</p>
        </FlexibleDiv>
      </SingleCardWrapper>
    </>
  );
}
