import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function PaymentStatus() {
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    
    // Retrieve the ride data from local storage
    const currentRide = JSON.parse(localStorage.getItem("currentRide"));

    const status = query.get('status'); 
    const transactionId = query.get('transaction_id');
    
    const isSuccess = status === 'success';
    const message = isSuccess 
        ? "Payment Successful! Thank you for your ride." 
        : "Payment Failed. Please try again.";
    
    const icon = isSuccess ? "/check-circle-fill.png" : "/close-circle-fill.png"; 
    const color = isSuccess ? 'bg-green-600' : 'bg-red-600'; 
    
    const [countdown, setCountdown] = useState(6);
    

    useEffect(() => {
        const targetPath = isSuccess ? '/home' : '/riding';

        if(isSuccess && transactionId && currentRide?.id){
            const body ={ transactionId, ride: currentRide }
            
            const confirmPayment = async () => {
                try {
                    await axios.post(`${import.meta.env.VITE_BASE_URL}/api/payments/payment-confirm`,body, {
                        withCredentials : true,
                    });
                    console.log("Payment confirmation API call successful. 'ride-ended' event triggered.");
                } catch (error) {
                    console.error("Error confirming payment:", error);
                }
            };
            confirmPayment();
        }

        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // navigate to target path after countdown
                    navigate(targetPath, { replace: true }); 
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup function for the interval timer
        return () => clearInterval(timer);
    }, [navigate, isSuccess, transactionId, currentRide?.id]); 

    const linkTo = isSuccess ? '/home' : '/riding';
    const linkText = isSuccess ? 'Go Home' : 'Continue to payment';


    return (
        <div className="h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className={`w-full max-w-md p-8 rounded-xl shadow-2xl text-center text-white ${color}`}>
                <img 
                    src={isSuccess ? `https://www.clipartmax.com/png/middle/270-2707415_confirm-icon-payment-success.png` : `https://tse1.mm.bing.net/th/id/OIP.nWcTGSoGs7NwwO5U3eInYAHaHa?pid=Api&P=0&h=180`} 
                    alt={isSuccess ? "success Icon" : "Failure Icon"} 
                    className="w-16 h-16 mx-auto mb-6"
                />
                <h1 className="text-3xl font-extrabold mb-3">{isSuccess ? 'Payment Complete!' : 'Payment Failed'}</h1>
                
                {/* Display Transaction ID only on success */}
                {isSuccess && transactionId && (
                    <div className="text-sm p-3 mb-4 bg-green bg-opacity-20 rounded-lg border border-white border-opacity-30">
                        <p className="font-semibold mb-1">Transaction ID: </p>
                        <span className="font-mono text-xs break-all opacity-50">{transactionId}</span>
                    </div>
                )}

                <p className="text-lg mb-6 font-medium">{message}</p>
                
                <p className="text-sm font-light mb-4">
                    Redirecting in <span className="font-bold">{countdown}</span> seconds...
                </p>
                <Link 
                    to={linkTo}
                    className="mt-4 inline-block px-6 py-2 bg-white text-gray-800 font-bold rounded-full shadow-md hover:bg-gray-100 transition duration-150"
                >
                    {linkText}
                </Link>
            </div>
        </div>
    );
}

export default PaymentStatus;
