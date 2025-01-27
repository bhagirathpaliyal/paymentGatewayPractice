import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
    const navigate = useNavigate();

    return (
        <div className="success-page">
            <h2>Payment Successful!</h2>
            <p>Your payment was successfully processed.</p>
            <button onClick={() => navigate('/')} className="btn-back">Back to Home</button>
        </div>
    );
};

export default PaymentSuccess;
