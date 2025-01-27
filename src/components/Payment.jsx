import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./../CheckoutForm";

const stripePromise = loadStripe("pk_test_51QlSetEobgDWWk8Y6aGifabB58QXoqxRlt5PL42BoqiAja8Kh5Ut7sz1Z4qR2mCnOcEvmm3Zo6bSR5XvZuiOiBQX00fQIQLmLZ");

const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch the client secret from the backend
    fetch("http://localhost:3001/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 100005, currency: "INR" }), 
    })
      .then((res) => res.json())
      .then((data) => {
      
        
        setClientSecret(data.clientSecret)
    })
      .catch((error) => console.error("Error fetching client secret:", error));
  }, []);

  const options = { clientSecret };

  return (
    <div>
      <h1>Stripe UPI & Card Payment 
      </h1>
      {clientSecret ? (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading payment options...</p>
      )}
    </div>
  );
};

export default Payment;
