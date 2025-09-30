import stripe from "../lib/stripe.js";
import { db } from "../index.js"; 
import {sendMessageToSocketId} from "../socket.js";




const createCheckoutSession = async (req, res) => {
 
    const { amount, currency , transport ,rideId } = req.body;  

    try { 
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency: currency,
                    product_data: { name: 'Ride Payment', metadata: { transport_type: transport } }, 
                    unit_amount: amount * 100,
                },
                quantity: 1,
            }],
            mode: "payment",
            metadata: {
                ride_id: rideId, 
            },
            // FIX 2: Added session_id parameter back to success_url for client confirmation
            success_url: `${process.env.CLIENT_URL}/payment-status?status=success&transaction_id={CHECKOUT_SESSION_ID}`, 
            cancel_url: `${process.env.CLIENT_URL}/payment-status?status=failed`,   
        });
        res.json({id : session.id});
    } catch (error) {
        console.error("Stripe Session Creation Error:", error);
        res.status(500).json({ error: "Failed to create Stripe checkout session." });
    }
}

const paymentConfirm = async (req, res) => {
    
    const {transactionId,ride} = req.body;
    if(!transactionId || !ride || !ride.id){
        return res.status(400).json({ error: "Missing or invalid transactionId or ride information." });
    }
    
    try{
        const session = await stripe.checkout.sessions.retrieve(transactionId);   


        const rideResult  = await db.query("update rides set paymentid=$1, orderid=$2 ,status = $3 where id=$4 returning *", [session.payment_intent, session.id,'completed' ,ride.id]);
        
        const paidRide = rideResult.rows[0];
        
        
        res.status(200).json({ message: "Payment confirmed and ride updated.", ride: paidRide });

        sendMessageToSocketId(ride.captaininfo.socketid, {
            event: 'ride-ended',
            data: paidRide
        });

        sendMessageToSocketId(ride.userid.socketid, {
            event: 'ride-ended',
            data: paidRide
        });

    }catch(err){
        console.log(err);
        res.status(500).json({ error: "Payment confirmation failed." });
    }
};

export { createCheckoutSession, paymentConfirm };