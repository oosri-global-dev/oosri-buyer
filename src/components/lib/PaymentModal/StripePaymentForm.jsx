import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Spin } from "antd";
import Button from "../Button";
import { FlexibleDiv } from "../Box/styles";
import { formatCurrency } from "@/data-helpers/hooks";

const StripePaymentForm = ({ totalAmount, onSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  // Track whether the PaymentElement iframe has fully mounted
  const [isElementReady, setIsElementReady] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Guard: stripe, elements, and the Payment Element must all be ready
    if (!stripe || !elements || !isElementReady) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // Submit the elements form first so Stripe can validate the Payment Element
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsProcessing(false);
      return;
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent);
      setIsProcessing(false);
    } else {
      setErrorMessage("Something went wrong.");
      setIsProcessing(false);
    }
  };

  const isSubmitDisabled = !stripe || !isElementReady || isProcessing;

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <FlexibleDiv
        flexDir="column"
        gap="20px"
        justifyContent="flex-start"
        alignItems="stretch"
        width="100%"
      >
        <div style={{ padding: "0 5px", minHeight: "200px" }}>
          {/* Show spinner while Stripe iframe is loading */}
          {!isElementReady && (
            <FlexibleDiv justifyContent="center" padding="40px 0">
              <Spin size="large" tip="Loading payment form..." />
            </FlexibleDiv>
          )}
          <PaymentElement
            onReady={() => setIsElementReady(true)}
            options={{ layout: "tabs" }}
          />
        </div>

        {errorMessage && (
          <div style={{ color: "red", fontSize: "14px", marginTop: "10px" }}>
            {errorMessage}
          </div>
        )}

        <FlexibleDiv gap="10px" width="100%" margin="20px 0 0 0">
          <Button
            type="button"
            onClick={onBack}
            backgroundColor="transparent"
            color="var(--orrsiPrimary)"
            border="1px solid var(--orrsiPrimary)"
            radius="10px"
            height="48px"
            width="100%"
            disabled={isProcessing}
          >
            Back
          </Button>

          <Button
            type="submit"
            htmlType="submit"
            backgroundColor={
              isSubmitDisabled
                ? "#ccc"
                : "linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff6b6b 100%)"
            }
            color="var(--orrsiWhite)"
            radius="10px"
            height="48px"
            width="100%"
            disabled={isSubmitDisabled}
            loading={isProcessing}
          >
            {isElementReady ? `Pay ${formatCurrency(totalAmount)}` : "Loading..."}
          </Button>
        </FlexibleDiv>
      </FlexibleDiv>
    </form>
  );
};

export default StripePaymentForm;
