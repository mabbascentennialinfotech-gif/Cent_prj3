import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Stripe from "stripe";

import { generateInvoicePDF } from "../services/pdfService.js";
import { sendPaymentEmail } from "../services/emailService.js";
console.log(process.env.STRIPE_SECRET_KEY);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
import * as paypal from "@paypal/paypal-server-sdk";
import paypalClient from "../config/paypal.js";

// ===============================
// CREATE ORDER
// ===============================
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({ success: true, order });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// VERIFY PAYMENT
// ===============================
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userId,
      email,
      planId,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const paymentData = {
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      planId,
      amount,
      email,
      status: "paid",
      createdAt: new Date(),
    };

    console.log("PAYMENT SUCCESS:", paymentData);

    const pdfPath = await generateInvoicePDF(paymentData);

    await sendPaymentEmail({
      to: email,
      subject: "Payment Successful - Invoice Attached",
      pdfPath,
      paymentId: razorpay_payment_id,
    });

    return res.json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      invoice: pdfPath,
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ error: error.message });
  }
};
export const createStripeSession = async (req, res) => {
  try {
    const { planId, customer } = req.body;

    let amount = 1900;
    let planName = "Basic Plan";

    if (planId === "professional") {
      amount = 3500;
      planName = "Professional Plan";
    }

    if (planId === "business") {
      amount = 4900;
      planName = "Business Plan";
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      customer_email: customer.email,

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amount,
            product_data: {
              name: planName,
            },
          },
        },
      ],

      success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.CLIENT_URL}/checkout/${planId}`,
    });

    res.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Session Error:", error);

    return res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack,
    });
  }
};
export const createPaypalOrder = async (req, res) => {
  try {
    const { planId } = req.body;

    let amount = "19.00";

    if (planId === "professional") amount = "35.00";
    if (planId === "business") amount = "49.00";

    const ordersController = new paypal.OrdersController(paypalClient);

    const response = await ordersController.createOrder({
      body: {
        intent: "CAPTURE",
        purchaseUnits: [
          {
            amount: {
              currencyCode: "USD",
              value: amount,
            },
          },
        ],
        applicationContext: {
          returnUrl: `${process.env.CLIENT_URL}/success`,
          cancelUrl: `${process.env.CLIENT_URL}/checkout/${planId}`,
          userAction: "PAY_NOW",
        },
      },
    });

    console.log("PAYPAL RESPONSE:", response);

    const approvalLink = response.result.links.find(
      (link) => link.rel === "approve",
    );

    res.json({
      success: true,
      approvalUrl: approvalLink.href,
    });
  } catch (error) {
    console.error("PAYPAL ERROR:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
