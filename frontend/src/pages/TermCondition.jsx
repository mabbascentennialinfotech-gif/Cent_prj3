import PublicLayout from "../layouts/PublicLayout";
import React from "react";
import "../css/termcondition.css";

function TermCondition() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-28 py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-black mb-10">Terms & Conditions</h1>

          <div className="space-y-10 text-white/80 leading-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Acceptance of Terms
              </h2>

              <p>
                By using this platform, you agree to follow all terms and
                conditions mentioned here.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Services</h2>

              <p>
                We provide portfolio creation services, dashboard access,
                hosting, and premium plans.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Payments</h2>

              <p>
                Payments are securely processed using third-party gateways such
                as Razorpay.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}

export default TermCondition;
