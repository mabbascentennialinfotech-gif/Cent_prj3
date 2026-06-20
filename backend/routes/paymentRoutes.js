import express from "express";
import {
  createOrder,
  verifyPayment,
  createStripeSession,
  createPaypalOrder,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);
router.post("/create-stripe-session", createStripeSession);
router.post("/create-paypal-order", createPaypalOrder);

export default router;
