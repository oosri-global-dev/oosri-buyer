import OrderDetailsScreen from '@/screens/OrderPage/OrderDetails'
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Head from "next/head";

const OrderDetails = () => {
  return (
    <>
      <Head>
        <title>Order Details | Oosri</title>
      </Head>
      <OrderDetailsScreen />
    </>
  );
};

OrderDetails.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default OrderDetails;