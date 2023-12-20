import { useEffect, useState, useContext } from "react";
import { CartPageWrapper } from "./cart.styles";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { IoCartOutline as CartIcon } from "react-icons/io5";
import Button from "@/components/lib/Button";
import ProductCarousel from "@/components/lib/ProductCarousel/productCarousel";
import { MainContext } from "@/context";
import { PAGE_TITLE } from "@/context/types";
import SingleCartProduct from "@/components/lib/SingleCartProduct/single-cart-product";

export default function CartPage() {
  const [cartIsEmpty, setCartIsEmpty] = useState(false);
  const { dispatch } = useContext(MainContext);

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
      {cartIsEmpty && (
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
      )}
      {!cartIsEmpty && (
        <FlexibleDiv className="cart__section">
          <SingleCartProduct />
        </FlexibleDiv>
      )}
      <FlexibleDiv>
        <ProductCarousel carouselTitle={`You may also like`} />
      </FlexibleDiv>
    </CartPageWrapper>
  );
}
