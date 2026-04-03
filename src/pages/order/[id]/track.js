import OrderMap from '@/screens/OrderPage/OrderDetails/orderMap'
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Head from "next/head";

const TrackOrder = () => {
  return (
    <>
      <Head>
        <title>Track Order | Oosri</title>
      </Head>
      <OrderMap />
    </>
  );
};

TrackOrder.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default TrackOrder;