import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdCheck, MdShoppingBag, MdListAlt } from 'react-icons/md';
import { ConfirmationContainer } from './orderConfirmation.styles';
import { useMainContext } from '@/context';

const OrderConfirmation = () => {
    const router = useRouter();
    const { payment_intent } = router.query;
    const { setBuyNowItem } = useMainContext();

    useEffect(() => {
        // Clear the buy-now checkout state now that payment is confirmed.
        // We use a short timeout because if we clear it synchronously, the
        // CheckoutPage (which is currently unmounting) might detect the state
        // change and trigger its "empty cart" redirect to /shop before it fully unmounts.
        if (setBuyNowItem) {
            const timer = setTimeout(() => {
                setBuyNowItem(null);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [setBuyNowItem]);

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
