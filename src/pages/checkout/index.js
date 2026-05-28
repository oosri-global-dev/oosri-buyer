import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";
import PaymentModal from "@/components/lib/PaymentModal/paymentModal";
import { FlexibleDiv } from "@/components/lib/Box/styles";
import { Spin } from "antd";

const CheckoutPage = () => {
    const { buyNowItem, fxRates } = useMainContext();
    const { push } = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!buyNowItem) {
            push("/shop");
        } else {
            setIsModalOpen(true);
        }
    }, [buyNowItem, push]);

    if (!buyNowItem) {
        return (
            <FlexibleDiv
                justifyContent="center"
                alignItems="center"
                style={{ height: "60vh" }}
            >
                <Spin size="large" />
            </FlexibleDiv>
        );
    }

    // Use regularPriceUSD so the display matches the NGN regularPrice shown on the product page.
    // Actual payment amount is always computed server-side.
    const liveNGNRate = fxRates?.NGN || 1550;
    const priceUSD = buyNowItem.regularPriceUSD || Number(((buyNowItem.regularPrice || 0) / liveNGNRate).toFixed(2));
    const subtotal = priceUSD * (buyNowItem.quantity || 1);

    return (
        <>
            <Head>
                <title>Checkout | Oosri</title>
            </Head>
            <FlexibleDiv
                justifyContent="center"
                alignItems="center"
                style={{ height: "60vh" }}
            >
                {isModalOpen && (
                    <PaymentModal
                        isOpen={isModalOpen}
                        setIsOpen={(val) => {
                            setIsModalOpen(val);
                            if (!val) {
                                // If user closes modal, go back to shop
                                push("/shop");
                            }
                        }}
                        subtotal={subtotal}
                        cartItems={[buyNowItem]}
                    />
                )}
            </FlexibleDiv>
        </>
    );
};

CheckoutPage.getLayout = (page) => <GeneralLayout>{page}</GeneralLayout>;

export default CheckoutPage;
