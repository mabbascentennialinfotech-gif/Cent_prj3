import PublicLayout from "../layouts/PublicLayout";
import React from "react";
import "../css/plandetail.css";
import { useNavigate, useParams } from "react-router-dom";

export default function PlanDetails() {
  const navigate = useNavigate();
  const { planId } = useParams();
  const [agreed, setAgreed] = React.useState(false);
  const plans = {
    basic: {
      name: "Basic Plan",
      price: "$19",
      description:
        "Perfect for students, beginners, and professionals who want a clean portfolio website.",
      features: [
        "Responsive Portfolio",
        "Free Hosting",
        "Resume Upload",
        "Contact Section",
        "Mobile Friendly",
      ],
    },

    professional: {
      name: "Professional Plan",
      price: "$35",
      description:
        "Advanced portfolio solution for freelancers and developers.",
      features: [
        "Custom Domain",
        "Premium Design",
        "SEO Optimization",
        "Unlimited Projects",
        "Priority Support",
      ],
    },

    business: {
      name: "Business Plan",
      price: "$49",
      description:
        "Best for agencies and businesses requiring premium features.",
      features: [
        "Admin Dashboard",
        "Analytics",
        "Blog Support",
        "Premium Hosting",
        "Business Support",
      ],
    },
  };

  const plan = plans[planId];

  if (!plan) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Plan not found
      </div>
    );
  }

  return (
    <PublicLayout>
      <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-28 py-20">
        <div className="max-w-4xl mx-auto">
          {/* BACK */}
          <button
            onClick={() => navigate("/pricing")}
            className="mb-8 text-white/60 hover:text-white"
          >
            ← Back to Pricing
          </button>

          {/* CARD */}
          <div className="bg-white/[0.05] border border-white/10 rounded-[32px] p-10">
            <h1 className="text-5xl font-black">{plan.name}</h1>

            <div className="flex items-end gap-3 mt-6">
              <span className="text-7xl font-black">{plan.price}</span>

              <span className="text-white/60 mb-3">one time</span>
            </div>

            <p className="text-white/70 text-lg mt-8 leading-relaxed">
              {plan.description}
            </p>

            {/* FEATURES */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>

              <div className="space-y-4">
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-white/80"
                  >
                    <span className="text-green-400">✔</span>

                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            {/* AGREEMENT */}
            <div className="mt-10 bg-white/[0.03] border border-white/10 rounded-2xl p-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="mt-1"
                />

                <p className="text-white/70 text-sm leading-relaxed">
                  I’m ready to proceed to checkout after clearly reading the{" "}
                  <span
                    onClick={() => navigate("/privacy-policy")}
                    className="text-blue-400 cursor-pointer hover:underline"
                  >
                    Privacy Policy
                  </span>
                  ,{" "}
                  <span
                    onClick={() => navigate("/refund-policy")}
                    className="text-blue-400 cursor-pointer hover:underline"
                  >
                    Refund Policy
                  </span>{" "}
                  and{" "}
                  <span
                    onClick={() => navigate("/term-condition")}
                    className="text-blue-400 cursor-pointer hover:underline"
                  >
                    Terms & Conditions
                  </span>
                  .
                </p>
              </label>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col md:flex-row gap-5 mt-10">
              <button
                disabled={!agreed}
                onClick={() => navigate(`/checkout/${planId}`)}
                className={`flex-1 py-4 rounded-2xl font-semibold text-lg transition ${
                  agreed
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90"
                    : "bg-white/10 text-white/40 cursor-not-allowed"
                }`}
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate("/login?type=demo")}
                className="flex-1 py-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
              >
                Try Demo First
              </button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
