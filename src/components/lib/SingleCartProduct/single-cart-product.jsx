import { useState } from "react";
import { FlexibleDiv } from "../Box/styles";
import { SCProductWrapper } from "./single-cart-product.styles";
import ProductImage from "@/assets/images/iphone19.png";
import { BsTrash as TrashIcon } from "react-icons/bs";
import RemoveFromCartModal from "../Modals/remove-from-cart";

export default function SingleCartProduct({
  item,
  isModalOpen,
  setIsModalOpen,
}) {
  const [numOfProduct, setNumOfProduct] = useState(1);

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
          <p className="product__name">{item.productName}</p>
          <p className="product__discounted__price">{item.discountedPrice}</p>
          <div className="remove__box" onClick={() => setIsModalOpen(true)}>
            <TrashIcon color="var(--orrsiPrimary)" size={20} />
            <p>REMOVE</p>
          </div>
        </FlexibleDiv>
      </FlexibleDiv>
      <FlexibleDiv
        className="box__right__section"
        flexDir="column"
        height="100%"
        justifyContent="space-evenly"
      >
        <p className="product__price">{item.price}</p>
        <FlexibleDiv className="right__box__controls">
          <p
            onClick={() => {
              if (numOfProduct > 1) {
                setNumOfProduct(numOfProduct - 1);
              }
            }}
            className="count__trigger"
          >
            -
          </p>
          <p className="number__of__product">{numOfProduct}</p>
          <p
            onClick={() => setNumOfProduct(numOfProduct + 1)}
            className="count__trigger"
          >
            +
          </p>
        </FlexibleDiv>
      </FlexibleDiv>
    </SCProductWrapper>
  );
}
