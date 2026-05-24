import { useState, useEffect } from "react";
import { SCProductWrapper } from "./single-cart-product.styles";
import { BsTrash as TrashIcon } from "react-icons/bs";
import { useProductPrice, useFormatPrice } from "@/data-helpers/hooks";
import SafeImage from "@/components/lib/SafeImage/SafeImage";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";
import { Spin } from "antd";

export default function SingleCartProduct({
  item,
  setIsModalOpen,
  setSelectedItem,
}) {
  const { updateQuantity, currency } = useMainContext();
  const [numOfProduct, setNumOfProduct] = useState(item.quantity);
  const [isLoadingIncrease, setIsLoadingIncrease] = useState(false);
  const [isLoadingDecrease, setIsLoadingDecrease] = useState(false);
  const { push } = useRouter();
  const priceData = useProductPrice(item);
  const formatPrice = useFormatPrice();

  // Keep local qty in sync with the authoritative cart value from context.
  useEffect(() => {
    setNumOfProduct(item.quantity);
  }, [item.quantity]);

  const isLoading = isLoadingIncrease || isLoadingDecrease;

  const handleDecrement = async () => {
    if (numOfProduct <= 1 || isLoading) return;
    const next = numOfProduct - 1;
    setNumOfProduct(next);
    await updateQuantity(item, next, setIsLoadingDecrease);
  };

  const handleIncrement = async () => {
    if (isLoading) return;
    const next = numOfProduct + 1;
    setNumOfProduct(next);
    await updateQuantity(item, next, setIsLoadingIncrease);
  };

  const rawPriceNGN = item?.discountPrice > 0 && item?.discountPrice < item?.regularPrice ? item.discountPrice : (item?.regularPrice || 0);
  const lineTotal = currency === 'NGN'
    ? Math.round(rawPriceNGN * numOfProduct)
    : (priceData?.price || 0) * numOfProduct;

  return (
    <SCProductWrapper>
      {/* Image */}
      <div
        className="product__image__wrapper"
        onClick={() => push(`/product/${item?._id}`)}
      >
        <SafeImage
          src={item?.productImages?.[0]}
          alt={item?.productName || "product"}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Name + Remove */}
      <div className="product__info">
        <p
          className="product__name"
          onClick={() => push(`/product/${item?._id}`)}
          style={{ cursor: "pointer" }}
        >
          {item.productName}
        </p>
        <div
          className="remove__box"
          onClick={() => {
            setIsModalOpen(true);
            setSelectedItem(item);
          }}
        >
          <TrashIcon color="var(--orrsiPrimary)" size={13} />
          <p>Remove</p>
        </div>
      </div>

      {/* Quantity stepper */}
      <div className="qty__controls">
        <div
          className={`qty__btn${numOfProduct <= 1 || isLoading ? " disabled" : ""}`}
          onClick={handleDecrement}
        >
          {isLoadingDecrease ? <Spin size="small" /> : "−"}
        </div>
        <p className="qty__count">{numOfProduct}</p>
        <div
          className={`qty__btn${isLoading ? " disabled" : ""}`}
          onClick={handleIncrement}
        >
          {isLoadingIncrease ? <Spin size="small" /> : "+"}
        </div>
      </div>

      {/* Price block */}
      <div className="price__block">
        <p className="line__total">
          {currency === 'NGN'
            ? `₦${lineTotal.toLocaleString()}`
            : formatPrice(lineTotal)
          }
        </p>
        {numOfProduct > 1 && (
          <p className="unit__price">
            {currency === 'NGN'
              ? `₦${Math.round(rawPriceNGN).toLocaleString()} each`
              : `${formatPrice(priceData?.price || 0)} each`
            }
          </p>
        )}
      </div>
    </SCProductWrapper>
  );
}
