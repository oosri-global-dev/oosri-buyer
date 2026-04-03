import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import CartPage from "@/screens/Cart/cart";
import Head from "next/head";

const Cart = () => {
  return (
    <>
      <Head>
        <title>Cart | Oosri</title>
      </Head>
      <CartPage />
    </>
  );
};

Cart.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default Cart;
