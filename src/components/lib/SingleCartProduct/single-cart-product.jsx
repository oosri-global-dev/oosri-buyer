import { FlexibleDiv } from "../Box/styles";
import { SCProductWrapper } from "./single-cart-product.styles";
import ProductImage from "@/assets/images/iphone19.png";
import { BsTrash as TrashIcon } from "react-icons/bs";

export default function SingleCartProduct() {
  return (
    <SCProductWrapper>
      <FlexibleDiv
        className="box__left__section"
        flexDir="row"
        flexWrap="nowrap"
        gap="20px"
      >
        <div className="product__image__wrapper">
          <img src={ProductImage.src} alt="product" />
        </div>
        <FlexibleDiv
          className="text__section"
          flexDir="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <p className="product__name">
            Redmi Hot 12 6.28’’ 4GB RAM/128 GB ROM Android 12 - Black
          </p>
          <p className="product__discounted__price">N40,000</p>
          <div className="remove__box">
            <TrashIcon color="var(--orrsiPrimary)" size={20} />
            <p>REMOVE</p>
          </div>
        </FlexibleDiv>
      </FlexibleDiv>
      <FlexibleDiv className="box__right__section">
        <p className="product__price">N21,000</p>
        <FlexibleDiv>
          <p>-</p>
          <p>01</p>
          <p>+</p>
        </FlexibleDiv>
      </FlexibleDiv>
    </SCProductWrapper>
  );
}
