import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdCheck, MdShoppingBag, MdListAlt } from 'react-icons/md';
import { Spin } from 'antd';
import { ConfirmationContainer } from './orderConfirmation.styles';
import { usePaymentStatus } from '@/network/checkout';

const OrderConfirmation = () => {
    const router = useRouter();
    const { payment_intent } = router.query;
    const { data, isLoading, isError } = usePaymentStatus(payment_intent, {
        enabled: !!payment_intent,
    });

    const paymentState = data?.state || null;
    const orderCount = data?.confirmedOrders || 0;
    const isProcessing = !!payment_intent && (isLoading || paymentState === "processing");
    const needsAttention = paymentState === "failed" || isError;

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
                    ? "Your payment was received and we are waiting for the backend to finish creating your order. This page updates automatically."
                    : needsAttention
                    ? "We received your payment but could not fully confirm the order yet. Please check your orders shortly or contact support if this persists."
                    : `Your payment and order${orderCount > 1 ? "s have" : " has"} been confirmed successfully.`}
            </p>

            {payment_intent && (
                <div className="reference">
                    Transaction Reference: <strong>{payment_intent}</strong>
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
