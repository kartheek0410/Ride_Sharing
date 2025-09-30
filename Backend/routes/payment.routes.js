import express from "express";
import { createCheckoutSession , paymentConfirm } from "../controllers/payment.controller.js"; 

const router = express.Router();

router.post("/create-checkout-session", createCheckoutSession); 
router.post("/payment-confirm", paymentConfirm);

export default router;