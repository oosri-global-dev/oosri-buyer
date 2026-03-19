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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`, // Update with your success URL
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

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <FlexibleDiv
        flexDir="column"
        gap="20px"
        justifyContent="flex-start"
        alignItems="stretch"
        width="100%"
      >
        <div style={{ padding: "0 5px" }}>
            <PaymentElement />
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
            backgroundColor="linear-gradient(135deg, var(--orrsiPrimary) 0%, #ff6b6b 100%)"
            color="var(--orrsiWhite)"
            radius="10px"
            height="48px"
            width="100%"
            disabled={!stripe || isProcessing}
            loading={isProcessing}
          >
            Pay {formatCurrency(totalAmount)}
          </Button>
        </FlexibleDiv>
      </FlexibleDiv>
    </form>
  );
};

export default StripePaymentForm;
