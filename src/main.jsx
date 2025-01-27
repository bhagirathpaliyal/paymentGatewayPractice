import React from 'react';
import ReactDOM from 'react-dom/client';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './index.css';
import App from './App';

const stripePromise = loadStripe('pk_test_51QlSetEobgDWWk8Y6aGifabB58QXoqxRlt5PL42BoqiAja8Kh5Ut7sz1Z4qR2mCnOcEvmm3Zo6bSR5XvZuiOiBQX00fQIQLmLZ'); // Get from your Stripe account

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
);
