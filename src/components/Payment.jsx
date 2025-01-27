import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
    const [amount, setAmount] = useState(5000); // amount in cents (e.g., $50.00)
    const [clientSecret, setClientSecret] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); // Add state for error message
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // Fetch the clientSecret from the backend
    const fetchClientSecret = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/create-payment-intent', { amount });
            setClientSecret(data.clientSecret);
        } catch (err) {
            console.error('Error fetching client secret:', err);
            setErrorMessage('Failed to initialize payment. Please try again later.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });

        if (error) {
            // Handle and display errors
            console.log('[Error]', error);
            setErrorMessage(error.message); // Set error message state
        } else {
            if (paymentIntent.status === 'succeeded') {
                console.log('Payment successful!');
                navigate('/payment-success'); // Navigate on success
            }
        }
    };

    useEffect(() => {
        fetchClientSecret();
    }, [amount]);

    return (
        <div className="payment-container">
            <h2>Payment</h2>
            <form onSubmit={handleSubmit} className="payment-form">
                <CardElement />
                <button type="submit" disabled={!stripe} className="btn-pay">Pay Now</button>
            </form>
            {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Show error message if exists */}
        </div>
    );
};

export default Payment;
