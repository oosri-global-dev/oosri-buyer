import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdCheck, MdShoppingBag, MdListAlt } from 'react-icons/md';
import { ConfirmationContainer } from './orderConfirmation.styles';

const OrderConfirmation = () => {
    const router = useRouter();
    const { payment_intent } = router.query;

    return (
        <ConfirmationContainer>
            <div className="success-icon-wrapper">
                <MdCheck size={40} color="white" />
            </div>

            <h1 className="title">Payment Successful!</h1>
            <p className="description">
                Thank you for your purchase. Your order has been placed successfully and is now being processed.
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
                        Go to Orders
                    </a>
                </Link>
            </div>
        </ConfirmationContainer>
    );
};

export default OrderConfirmation;
