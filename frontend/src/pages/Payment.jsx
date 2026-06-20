import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Payment() {
  const user = auth.currentUser;
  const navigate = useNavigate();
  const { planId } = useParams();

  const plans = {
    basic: {
      name: "Basic Plan",
      price: "$19",
    },

    professional: {
      name: "Professional Plan",
      price: "$35",
    },

    business: {
      name: "Business Plan",
      price: "$49",
    },
  };

  const plan = plans[planId];

  if (!plan) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Invalid Payment Request
      </div>
    );
  }

  const handlePayment = async () => {
    try {
      // 1. CREATE ORDER FROM BACKEND
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: parseInt(plan.price.replace("$", "")),
          }),
        },
      );

      const order = await res.json();

      console.log("ORDER:", order);

      // 2. RAZORPAY OPTIONS
      const options = {
        key: "YOUR_RAZORPAY_KEY_ID", // public key only
        amount: order.amount,
        currency: order.currency,
        name: "Portfolio Upgrade",
        description: plan.name,
        order_id: order.id,

        handler: async function (response) {
          console.log("PAYMENT SUCCESS:", response);

          // OPTIONAL: verify payment with backend
          await fetch(
            `${import.meta.env.VITE_API_URL}/api/payment/verify-payment`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            },
          );

          // SAVE PREMIUM USER
          localStorage.setItem(
            "premiumUser",
            JSON.stringify({
              plan: plan.name,
              paymentId: response.razorpay_payment_id,
            }),
          );

          // REDIRECT
          navigate("/success");
        },

        prefill: {
          name: user?.displayName || "Guest",
          email: user?.email || "",
        },

        theme: {
          color: "#6366f1",
        },
      };

      // 3. OPEN PAYMENT WINDOW
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-28 py-20 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white/[0.05] border border-white/10 rounded-[32px] p-10">
        <h1 className="text-5xl font-black">Payment</h1>

        <p className="text-white/60 mt-4">Complete your purchase securely.</p>

        {/* ORDER SUMMARY */}
        <div className="mt-10 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex justify-between mb-5">
            <span className="text-white/60">Selected Plan</span>

            <span className="font-semibold">{plan.name}</span>
          </div>

          <div className="flex justify-between mb-5">
            <span className="text-white/60">Billing Type</span>

            <span>One Time</span>
          </div>

          <div className="border-t border-white/10 pt-5 flex justify-between text-3xl font-bold">
            <span>Total</span>

            <span>{plan.price}</span>
          </div>
        </div>

        {/* PAYMENT OPTIONS */}
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-5">Payment Methods</h2>

          <div className="space-y-4">
            <div className="border border-white/10 rounded-2xl p-5 bg-white/[0.03] hover:bg-white/[0.06] transition cursor-pointer">
              💳 Credit / Debit Card
            </div>

            <div className="border border-white/10 rounded-2xl p-5 bg-white/[0.03] hover:bg-white/[0.06] transition cursor-pointer">
              🇮🇳 UPI / Razorpay
            </div>

            <div className="border border-white/10 rounded-2xl p-5 bg-white/[0.03] hover:bg-white/[0.06] transition cursor-pointer">
              🌍 PayPal
            </div>
          </div>
        </div>

        {/* PAY BUTTON */}
        <button
          onClick={handlePayment}
          className="w-full mt-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Pay {plan.price}
        </button>

        {/* TRUST */}
        <div className="mt-8 text-center text-white/50 text-sm leading-relaxed">
          Secure encrypted payment • Privacy protected • Refund support
          available
        </div>

        {/* LEGAL */}
        <div className="flex justify-center gap-5 mt-6 text-sm text-white/50">
          <button
            onClick={() => navigate("/privacy-policy")}
            className="hover:text-white"
          >
            Privacy Policy
          </button>

          <button
            onClick={() => navigate("/refund-policy")}
            className="hover:text-white"
          >
            Refund Policy
          </button>

          <button
            onClick={() => navigate("/terms")}
            className="hover:text-white"
          >
            Terms & Conditions
          </button>
        </div>
      </div>
    </div>
  );
}
