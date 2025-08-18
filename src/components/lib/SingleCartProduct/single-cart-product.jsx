import { useState } from "react";
import { FlexibleDiv } from "../Box/styles";
import { SCProductWrapper } from "./single-cart-product.styles";
import ProductImage from "@/assets/images/iphone19.png";
import { BsTrash as TrashIcon } from "react-icons/bs";
import { nairaFormatter } from "@/data-helpers/hooks";
import Image from "next/image";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";

export default function SingleCartProduct({
  item,
  isModalOpen,
  setIsModalOpen,
  setSelectedItem,
}) {
  const { updateQuantity, removeFromCart } = useMainContext();
  const [numOfProduct, setNumOfProduct] = useState(item.quantity);
  const { push } = useRouter();

  return (
    <SCProductWrapper>
      <FlexibleDiv
        className="box__left__section"
        flexDir="row"
        flexWrap="nowrap"
        gap="20px"
      >
        <div className="product__image__wrapper">
          <Image
            src={item?.productImages[0]}
            alt={`${item?._id} product image`}
            layout="fill"
            objectFit="cover"
            onClick={() => push(`/product/${item?._id}`)}
          />
        </div>
        <FlexibleDiv
          className="text__section"
          flexDir="column"
          justifyContent="space-evenly"
          alignItems="flex-start"
        >
          <p className="product__name">{item.productName}</p>
          <p className="product__discounted__price">{item.discountedPrice}</p>
          <div
            className="remove__box"
            onClick={() => {
              setIsModalOpen(true);
              setSelectedItem(item);
            }}
          >
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
        <p className="product__price">
          {nairaFormatter.format(item?.price || 0)}
        </p>
        <FlexibleDiv className="right__box__controls">
          <p
            onClick={() => {
              if (numOfProduct > 1) {
                setNumOfProduct(numOfProduct - 1);
                updateQuantity(item, numOfProduct - 1);
              }
            }}
            className="count__trigger"
          >
            -
          </p>
          <p className="number__of__product">{numOfProduct}</p>
          <p
            onClick={() => {
              setNumOfProduct(numOfProduct + 1);
              updateQuantity(item, numOfProduct + 1);
            }}
            className="count__trigger"
          >
            +
          </p>
        </FlexibleDiv>
      </FlexibleDiv>
    </SCProductWrapper>
  );
}
