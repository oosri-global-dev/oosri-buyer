import OrderConfirmationScreen from '@/screens/OrderConfirmation';
import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Head from "next/head";

const OrderConfirmation = () => {
    return (
        <>
            <Head>
                <title>Order Confirmation | Oosri</title>
            </Head>
            <OrderConfirmationScreen />
        </>
    );
};

// Wrap with GeneralLayout but doesn't strictly need to be logged in to view success page 
// (though they typically will be coming from checkout)
OrderConfirmation.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default OrderConfirmation;
