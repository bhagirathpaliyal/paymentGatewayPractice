import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Payment from './components/Payment';
import PaymentSuccess from './components/PaymentSuccess';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Payment />} />
                    <Route path="/payment-success" element={<PaymentSuccess />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
