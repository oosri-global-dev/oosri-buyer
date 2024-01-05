import { useEffect, useState, useContext } from "react";
import { CartPageWrapper } from "./cart.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { IoCartOutline as CartIcon } from "react-icons/io5";
import Button from "@/components/lib/Button";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import { MainContext } from "@/context";
import { PAGE_TITLE } from "@/context/types";
import SingleCartProduct from "@/components/lib/SingleCartProduct/single-cart-product";
import { cartItemsHelper } from "@/data-helpers/cart-helper";
import RemoveFromCartModal from "@/components/lib/Modals/remove-from-cart";

export default function CartPage() {
  const [cartIsEmpty, setCartIsEmpty] = useState(false);
  const { dispatch } = useContext(MainContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!cartIsEmpty) {
      async function SetPageTitle() {
        await dispatch({
          type: PAGE_TITLE,
          payload: "My Cart (3 Items)",
        });
      }
      SetPageTitle();
    } else {
      async function SetPageTitle() {
        await dispatch({
          type: PAGE_TITLE,
          payload: "My Cart",
        });
      }
      SetPageTitle();
    }
  }, [cartIsEmpty]);

  return (
    <CartPageWrapper>
      <RemoveFromCartModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
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
            {cartItemsHelper.map((item, idx) => (
              <SingleCartProduct item={item} key={idx} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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
                  Shipping Fee: <span>N500</span>
                </p>
                <p className="shipping__fee__text">
                  Sub Total: <span>N500,000</span>
                </p>
                <Button
                  backgroundColor="var(--orrsiPrimary)"
                  radius="10px"
                  height="40px"
                  color="var(--orrsiWhite)"
                  padding="0px 45px"
                >
                  Checkout (N550,000)
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
