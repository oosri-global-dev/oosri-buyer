import GeneralLayout from "@/components/layouts/GeneralLayout/generalLayout";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useMainContext } from "@/context";
import { useRouter } from "next/router";
import PaymentModal from "@/components/lib/PaymentModal/paymentModal";
import { calculateProductPrice } from "@/data-helpers/hooks";
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

    const priceData = calculateProductPrice(buyNowItem);
    let priceUSD = priceData?.price || 0;
    // Guard: if the product has no fxRate or regularPriceUSD and the raw price looks like
    // an NGN value, convert it to USD using the live rate from context.
    const liveNGNRate = fxRates?.NGN || 1550;
    if (!buyNowItem.regularPriceUSD && !buyNowItem.fxRate && priceUSD > 10000) {
        priceUSD = Number((priceUSD / liveNGNRate).toFixed(2));
    }
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
