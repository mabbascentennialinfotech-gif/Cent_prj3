import PublicLayout from "../layouts/PublicLayout";
import React from "react";
import "../css/privacypolicy.css";

export default function PrivacyPolicy() {
  return (
    <PublicLayout>
      <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-28 py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl font-black mb-10">Privacy Policy</h1>

          <div className="space-y-10 text-white/80 leading-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">
                1. Information We Collect
              </h2>

              <p>
                We may collect personal information such as your name, email
                address, payment details, and account activity when you use our
                platform or purchase a portfolio plan.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                2. How We Use Your Information
              </h2>

              <p>
                Your information is used to provide services, process payments,
                improve platform features, communicate updates, and provide
                customer support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Payment Security</h2>

              <p>
                Payments are processed securely through trusted third-party
                payment gateways such as Razorpay, Stripe, or PayPal. We do not
                store your full card or banking details on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Protection</h2>

              <p>
                We implement industry-standard security measures to protect your
                personal information from unauthorized access, disclosure, or
                misuse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                5. Cookies & Analytics
              </h2>

              <p>
                We may use cookies and analytics tools to improve user
                experience, monitor performance, and understand platform usage
                patterns.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                6. Third-Party Services
              </h2>

              <p>
                Our platform may integrate third-party services including
                Firebase, Razorpay, Google Login, analytics tools, and hosting
                providers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. User Rights</h2>

              <p>
                Users may request account deletion, data updates, or removal of
                personal information by contacting support.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">
                8. Changes To This Policy
              </h2>

              <p>
                We reserve the right to update this Privacy Policy at any time.
                Continued use of the platform constitutes acceptance of updated
                policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Contact</h2>

              <p>
                If you have questions regarding this Privacy Policy, you may
                contact our support team.
              </p>
            </section>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
