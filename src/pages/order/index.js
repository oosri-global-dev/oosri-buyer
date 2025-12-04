import OrderPage from '@/screens/OrderPage/orderPage'
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Head from "next/head";

const Order = () => {
  return (
    <>
      <Head>
        <title>Order | Oosri</title>
      </Head>
      <OrderPage />
    </>
  );
};

Order.getLayout = (page) => <GeneralLayout isAuth={true}>{page}</GeneralLayout>;

export default Order;