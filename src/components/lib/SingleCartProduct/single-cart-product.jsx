import { useState } from "react";
import { FlexibleDiv } from "../Box/styles";
import { SCProductWrapper } from "./single-cart-product.styles";
import { BsTrash as TrashIcon } from "react-icons/bs";
import { nairaFormatter } from "@/data-helpers/hooks";
import Image from "next/image";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";
import { Spin } from "antd";

export default function SingleCartProduct({
  item,
  isModalOpen,
  setIsModalOpen,
  setSelectedItem,
}) {
  const { updateQuantity, removeFromCart } = useMainContext();
  const [numOfProduct, setNumOfProduct] = useState(item.quantity);
  const [isLoadingIncrease, setIsLoadingIncrease] = useState(false);
  const [isLoadingDecrease, setIsLoadingDecrease] = useState(false);
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
          <p className="product__discounted__price">{item.previousPrice}</p>
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
          {nairaFormatter.format(item?.productPrice || item?.price || 0)}
        </p>
        <FlexibleDiv className="right__box__controls">
          <p
            onClick={async () => {
              if (numOfProduct > 1 && !isLoadingDecrease) {
                await updateQuantity(
                  item,
                  numOfProduct - 1,
                  setIsLoadingDecrease
                );
                setNumOfProduct(numOfProduct - 1);
              }
            }}
            className="count__trigger"
          >
            {isLoadingDecrease ? (
              <Spin size="small" />
            ) : (
              "-"
            )}
          </p>
          <p className="number__of__product">{numOfProduct}</p>
          <p
            onClick={async () => {
              if (!isLoadingIncrease) {
                await updateQuantity(
                  item,
                  numOfProduct + 1,
                  setIsLoadingIncrease
                );
                setNumOfProduct(numOfProduct + 1);
              }
            }}
            className="count__trigger"
          >
            {isLoadingIncrease ? <Spin size="small" /> : "+"}
          </p>
        </FlexibleDiv>
      </FlexibleDiv>
    </SCProductWrapper>
  );
}
