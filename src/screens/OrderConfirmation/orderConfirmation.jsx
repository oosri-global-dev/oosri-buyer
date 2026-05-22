import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdCheck, MdShoppingBag, MdListAlt } from 'react-icons/md';
import { Spin } from 'antd';
import { ConfirmationContainer } from './orderConfirmation.styles';
import { usePaymentStatus, usePaystackPaymentStatus } from '@/network/checkout';

const POLL_TIMEOUT_MS = 2 * 60 * 1000; // stop polling after 2 minutes

const OrderConfirmation = () => {
    const router = useRouter();
    const { payment_intent, paystack_reference } = router.query;
    const [pollTimedOut, setPollTimedOut] = useState(false);
    const timerRef = useRef(null);

    const stripeStatus = usePaymentStatus(payment_intent, { enabled: !!payment_intent && !pollTimedOut });
    const paystackStatus = usePaystackPaymentStatus(paystack_reference, { enabled: !!paystack_reference && !pollTimedOut });

    const { data, isLoading, isError } = payment_intent ? stripeStatus : paystackStatus;
    const reference = payment_intent || paystack_reference;

    const paymentState = data?.state || null;
    const orderCount = data?.confirmedOrders || 0;
    const isProcessing = !!reference && !pollTimedOut && (isLoading || paymentState === "processing");
    const needsAttention = pollTimedOut || paymentState === "failed" || isError;

    useEffect(() => {
        if (!reference || paymentState === "confirmed") return;
        timerRef.current = setTimeout(() => setPollTimedOut(true), POLL_TIMEOUT_MS);
        return () => clearTimeout(timerRef.current);
    }, [reference, paymentState]);

    return (
        <ConfirmationContainer>
            <div className="success-icon-wrapper">
                {isProcessing ? <Spin size="large" /> : <MdCheck size={40} color="white" />}
            </div>

            <h1 className="title">
                {isProcessing
                    ? "Finalizing Your Order"
                    : needsAttention
                    ? "Payment Received, Order Under Review"
                    : "Order Confirmed!"}
            </h1>
            <p className="description">
                {isProcessing
                    ? "Your payment was received. We're waiting for confirmation — this page updates automatically."
                    : pollTimedOut
                    ? "This is taking longer than expected. Your payment was received — please check your orders in a few minutes or contact support if nothing appears."
                    : needsAttention
                    ? "We received your payment but could not fully confirm the order yet. Please check your orders shortly or contact support if this persists."
                    : `Your payment and order${orderCount > 1 ? "s have" : " has"} been confirmed successfully.`}
            </p>

            {reference && (
                <div className="reference">
                    Transaction Reference: <strong>{reference}</strong>
                </div>
            )}

            <div className="button-group">
                <Link href="/shop" passHref legacyBehavior>
                    <a className="btn secondary">
                        <MdShoppingBag size={20} />
                        Continue Shopping
                    </a>
                </Link>
                <Link href="/order" passHref legacyBehavior>
                    <a className="btn primary">
                        <MdListAlt size={20} />
                        {isProcessing ? "Refresh Orders" : "Go to Orders"}
                    </a>
                </Link>
            </div>
        </ConfirmationContainer>
    );
};

export default OrderConfirmation;
