import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StripeContainer from "./components/Payment"; 
import PaymentSuccess from "./components/PaymentSuccess";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StripeContainer />} />
        <Route path="/payment-successful" element={<PaymentSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
