import { useEffect, useState } from "react";
import { CartPageWrapper } from "./cart.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { IoCartOutline as CartIcon } from "react-icons/io5";
import Button from "@/components/lib/Button";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import { useMainContext } from "@/context";
import SingleCartProduct from "@/components/lib/SingleCartProduct/single-cart-product";
import RemoveFromCartModal from "@/components/lib/Modals/remove-from-cart";

export default function CartPage() {
  const { cart, dispatch } = useMainContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const cartIsEmpty = cart.length === 0;

  const subTotal = cart.reduce(
    (acc, item) => acc + item.productPrice * item.quantity,
    0
  );
  const shippingFee = 500;
  const total = subTotal + shippingFee;



  return (
    <CartPageWrapper>
      <RemoveFromCartModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        item={selectedItem}
      />
      {cartIsEmpty ? (
        <FlexibleDiv
          className="empty__cart__box"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          gap="25px"
        >
          <div className="icon__wrapper">
            <CartIcon color="#999999" size={100} />
          </div>
          <FlexibleDiv flexDir="column" gap="10px">
            <p className="no__empty__text">
              Your own cart no get anything inside am!
            </p>
            <p className="no__empty__subtext">
              Abeg, add some goodies make we dey roll.
            </p>
          </FlexibleDiv>
          <Button
            backgroundColor="var(--orrsiPrimary)"
            color="var(--orrsiWhite)"
          >
            Start Shopping
          </Button>
        </FlexibleDiv>
      ) : (
        <>
          <FlexibleDiv className="cart__section">
            {cart.map((item, idx) => (
              <SingleCartProduct
                item={item}
                key={idx}
                setIsModalOpen={setIsModalOpen}
                setSelectedItem={setSelectedItem}
              />
            ))}
            <FlexibleDiv
              className="summary__box"
              flexDir="row"
              justifyContent="flex-end"
              margin="50px 100px 0 0"
            >
              <FlexibleDiv
                className="total__prices__box"
                flexDir="column"
                gap="25px"
                justifyContent="flex-end"
                alignItems="flex-start"
                width="fit-content"
              >
                <h2>Cart Summary</h2>
                <p className="shipping__fee__text">
                  Shipping Fee: <span>N{shippingFee}</span>
                </p>
                <p className="shipping__fee__text">
                  Sub Total: <span>N{subTotal.toLocaleString()}</span>
                </p>
                <Button
                  backgroundColor="var(--orrsiPrimary)"
                  radius="10px"
                  height="40px"
                  color="var(--orrsiWhite)"
                  padding="0px 45px"
                >
                  Checkout (N{total.toLocaleString()})
                </Button>
              </FlexibleDiv>
            </FlexibleDiv>
          </FlexibleDiv>
        </>
      )}

      <FlexibleDiv>
        <ProductCarousel carouselTitle={`You may also like`} />
      </FlexibleDiv>
    </CartPageWrapper>
  );
}
