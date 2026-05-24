import { useState } from "react";
import { CartPageWrapper } from "./cart.styles";
import { IoCartOutline as CartIcon } from "react-icons/io5";
import { MdLockOutline as LockIcon } from "react-icons/md";
import Button from "@/components/lib/Button";
import { useMainContext } from "@/context";
import SingleCartProduct from "@/components/lib/SingleCartProduct/single-cart-product";
import RemoveFromCartModal from "@/components/lib/RemoveFromCartModal/remove-from-cart";
import PaymentModal from "@/components/lib/PaymentModal";
import { calculateProductPrice, useFormatPrice } from "@/data-helpers/hooks";
import { useRouter } from "next/router";
import _ from "lodash";

export default function CartPage() {
  const { cart, user, fxRates, currency } = useMainContext();
  const formatPrice = useFormatPrice();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const { push, pathname } = useRouter();

  const safeCart = Array.isArray(cart) ? cart : [];
  const cartIsEmpty = safeCart.length === 0;
  const itemCount = safeCart.reduce((sum, item) => sum + (item?.quantity || 1), 0);

  const liveNGNRate = fxRates?.NGN || 1550;

  // subTotal stays in USD — PaymentModal and Stripe depend on it
  const subTotal = safeCart.reduce((acc, item) => {
    if (!item) return acc;
    const priceData = calculateProductPrice(item);
    let priceUSD = priceData?.price || 0;
    if (!item.regularPriceUSD && !item.fxRate && priceUSD > 10000) {
      priceUSD = Number((priceUSD / liveNGNRate).toFixed(2));
    }
    const qty = (typeof item.quantity === "number" && item.quantity > 0) ? item.quantity : 1;
    return acc + priceUSD * qty;
  }, 0);

  // For NGN display: use raw stored NGN prices to avoid double-conversion rounding
  const subTotalNGN = safeCart.reduce((acc, item) => {
    if (!item) return acc;
    const priceNGN = (item.salesPrice > 0 ? item.salesPrice : (item.regularPrice || 0));
    const qty = (typeof item.quantity === "number" && item.quantity > 0) ? item.quantity : 1;
    return acc + Math.round(priceNGN) * qty;
  }, 0);

  const handleCheckout = () => {
    if (_.isEmpty(user) || !user?.id) {
      push(`/login?from=${pathname}&action=MERGE_CART`);
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  return (
    <CartPageWrapper>
      <RemoveFromCartModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        item={selectedItem}
      />
      <PaymentModal
        isOpen={isPaymentModalOpen}
        setIsOpen={setIsPaymentModalOpen}
        subtotal={subTotal}
        cartItems={cart}
      />

      {cartIsEmpty ? (
        <div className="empty__cart__box">
          <div className="icon__wrapper">
            <CartIcon color="#ccc" size={56} />
          </div>
          <p className="empty__title">Your cart is empty</p>
          <p className="empty__subtitle">
            Looks like you haven&apos;t added anything yet.
          </p>
          <Button
            backgroundColor="var(--orrsiPrimary)"
            color="var(--orrsiWhite)"
            radius="12px"
            height="48px"
            padding="0 40px"
            onClick={() => push("/shop")}
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="cart__header">
            <h1>Shopping Cart</h1>
            <p className="cart__item__count">
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </p>
          </div>

          <div className="cart__grid">
            {/* ── Left: items list ── */}
            <div className="cart__items__panel">
              {safeCart.map((item, idx) =>
                item ? (
                  <SingleCartProduct
                    item={item}
                    key={item._id || item.id || idx}
                    setIsModalOpen={setIsModalOpen}
                    setSelectedItem={setSelectedItem}
                  />
                ) : null
              )}
            </div>

            {/* ── Right: order summary ── */}
            <div className="cart__summary__card">
              <p className="summary__title">Order Summary</p>

              <div className="summary__row">
                <p className="summary__label">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </p>
                <p className="summary__value">
                  {currency === 'NGN' ? `₦${subTotalNGN.toLocaleString()}` : formatPrice(subTotal)}
                </p>
              </div>

              <div className="summary__row">
                <p className="summary__label">Shipping</p>
                <p className="summary__note">Calculated at checkout</p>
              </div>

              <hr className="summary__divider" />

              <div className="summary__total__row">
                <p className="total__label">Estimated Total</p>
                <p className="total__value">
                  {currency === 'NGN' ? `₦${subTotalNGN.toLocaleString()}` : formatPrice(subTotal)}
                </p>
              </div>

              <Button
                backgroundColor="var(--orrsiPrimary)"
                color="var(--orrsiWhite)"
                radius="12px"
                height="50px"
                width="100%"
                fontSize="0.95rem"
                fontWeight="700"
                className="checkout__cta"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </Button>

              <span
                className="continue__shopping"
                onClick={() => push("/shop")}
              >
                ← Continue Shopping
              </span>

              <div className="secure__badge">
                <LockIcon size={13} />
                Secure checkout
              </div>
            </div>
          </div>
        </>
      )}
    </CartPageWrapper>
  );
}
