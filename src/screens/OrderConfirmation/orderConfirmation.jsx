import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';
import { MdCheck, MdShoppingBag, MdListAlt } from 'react-icons/md';
import { Spin } from 'antd';
import { ConfirmationContainer } from './orderConfirmation.styles';
import { usePaymentStatus, usePaystackPaymentStatus } from '@/network/checkout';
import { useMainContext } from '@/context';
import { CART } from '@/context/types';
import { handleClearCart } from '@/network/cart';

const POLL_TIMEOUT_MS = 2 * 60 * 1000; // stop polling after 2 minutes

const OrderConfirmation = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { payment_intent, paystack_reference } = router.query;
    const { dispatch, setBuyNowItem } = useMainContext();
    const [pollTimedOut, setPollTimedOut] = useState(false);
    const timerRef = useRef(null);
    const hasClearedCartRef = useRef(false);
    const hasInvalidatedOrdersRef = useRef(false);

    const stripeStatus = usePaymentStatus(payment_intent, { enabled: !!payment_intent && !pollTimedOut });
    const paystackStatus = usePaystackPaymentStatus(paystack_reference, { enabled: !!paystack_reference && !pollTimedOut });

    const { data, isLoading, isError } = payment_intent ? stripeStatus : paystackStatus;
    const reference = payment_intent || paystack_reference;

    const paymentState = data?.state || null;
    const orderCount = data?.confirmedOrders || 0;
    // !router.isReady: query params not yet populated on first render — prevents "Order Confirmed" flash.
    // !data && !isError: reference is known but the first poll hasn't returned yet.
    const isProcessing = !router.isReady ||
        (!!reference && !pollTimedOut && (isLoading || (!data && !isError) || paymentState === "processing"));
    const needsAttention = pollTimedOut || paymentState === "failed" || isError;

    useEffect(() => {
        if (!router.isReady || payment_intent || paystack_reference || typeof window === "undefined") return;

        const pendingPaystackReference = window.sessionStorage.getItem("oosri_pending_paystack_reference");
        if (!pendingPaystackReference) return;

        router.replace(
            {
                pathname: router.pathname,
                query: { paystack_reference: pendingPaystackReference },
            },
            undefined,
            { shallow: true }
        );
    }, [payment_intent, paystack_reference, router]);

    useEffect(() => {
        if (!reference || paymentState === "confirmed") return;
        timerRef.current = setTimeout(() => setPollTimedOut(true), POLL_TIMEOUT_MS);
        return () => clearTimeout(timerRef.current);
    }, [reference, paymentState]);

    useEffect(() => {
        if (paymentState !== "confirmed" || hasInvalidatedOrdersRef.current) return;

        hasInvalidatedOrdersRef.current = true;
        queryClient.invalidateQueries({ queryKey: ["user-orders"] });
    }, [paymentState, queryClient]);

    useEffect(() => {
        if (!paystack_reference || paymentState !== "confirmed" || hasClearedCartRef.current) return;

        hasClearedCartRef.current = true;
        dispatch({ type: CART, payload: [] });
        handleClearCart().catch(() => {});
        if (setBuyNowItem) setBuyNowItem(null);

        if (typeof window !== "undefined") {
            window.sessionStorage.removeItem("oosri_pending_paystack_reference");
        }
    }, [dispatch, paystack_reference, paymentState, setBuyNowItem]);

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
