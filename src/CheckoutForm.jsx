import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';


function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const cardElement = elements.getElement(CardElement);

        try {
            const response = await fetch('http://localhost:3001/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 1000 }), // Amount in cents (e.g., $10.00)
            });

            const { clientSecret } = await response.json();

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                },
            });

            if (error) {
                setErrorMessage(error.message);
            } else if (paymentIntent.status === 'succeeded') {
                setPaymentSuccess(true);
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="checkout-container">
            <div className="checkout-form">
                <h1 className="title">Payment Checkout</h1>
                <form onSubmit={handleSubmit} className="form">
                    <div className="card-element-container">
                        <CardElement
                            options={{
                                style: {
                                    base: {
                                        fontSize: '16px',
                                        color: '#32325d',
                                        '::placeholder': { color: '#a0aec0' },
                                    },
                                    invalid: { color: '#fa755a' },
                                },
                            }}
                        />
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {paymentSuccess && (
                        <p className="success-message">
                            Payment Successful! Thank you for your purchase.
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={!stripe || processing}
                        className={`submit-button ${processing ? 'disabled' : ''}`}
                    >
                        {processing ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CheckoutForm;
