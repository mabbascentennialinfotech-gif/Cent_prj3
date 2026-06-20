import PublicLayout from "../layouts/PublicLayout";

import React from "react";
import "../css/refundpolicy.css";

export default function RefundPolicy() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-28 py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-black mb-10">Refund Policy</h1>

          <div className="space-y-10 text-white/80 leading-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Digital Product Policy
              </h2>

              <p>
                Our portfolio services and premium plans are digital products.
                Once access has been granted, refunds may not be available
                except under special circumstances.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                2. Eligibility For Refund
              </h2>

              <p>Refund requests may be considered if:</p>

              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Payment was charged multiple times.</li>

                <li>The purchased service was not delivered.</li>

                <li>Technical issues prevented platform access.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                3. Non-Refundable Cases
              </h2>

              <p>Refunds will generally not be provided for:</p>

              <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Change of mind after purchase.</li>

                <li>Failure to use purchased features.</li>

                <li>Custom design or development work already completed.</li>

                <li>Violation of platform terms or abuse.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                4. Refund Request Timeline
              </h2>

              <p>
                Refund requests should be submitted within 7 days of the
                original purchase date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Processing Time</h2>

              <p>
                Approved refunds may take 5–10 business days depending on your
                payment provider or bank.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Contact Support</h2>

              <p>
                For refund-related requests, please contact our support team
                with your payment details and registered email address.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
