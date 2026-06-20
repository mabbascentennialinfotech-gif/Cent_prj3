import PublicLayout from "../layouts/PublicLayout";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../css/support.css";

export default function Support() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.Tawk_API) {
      window.Tawk_API.hideWidget();
    }
  }, []);

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
    }
  };

  return (
    <PublicLayout>
      <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-28 py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              Support Center
            </h1>

            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Need assistance? Our support team is here to help. Choose the
              support option that works best for you.
            </p>
          </div>

          {/* Support Options */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Email */}
            <div className="bg-white/[0.05] border border-white/10 rounded-[24px] p-8 text-center">
              <div className="text-5xl mb-5">📧</div>

              <h2 className="text-2xl font-bold mb-3">Email Support</h2>

              <p className="text-white/60 mb-6">
                Contact our support team directly via email.
              </p>

              <a
                href="mailto:support@centennialinfotech.com"
                className="inline-block px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-600 transition"
              >
                support@centennialinfotech.com
              </a>
            </div>

            {/* Live Chat */}
            <div className="bg-white/[0.05] border border-white/10 rounded-[24px] p-8 text-center">
              <div className="text-5xl mb-5">💬</div>

              <h2 className="text-2xl font-bold mb-3">Live Chat</h2>

              <p className="text-white/60 mb-6">
                Chat with our team in real time for quick assistance.
              </p>

              <button
                onClick={openChat}
                className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition"
              >
                Start Live Chat
              </button>
            </div>

            {/* Ticket */}
            <div className="bg-white/[0.05] border border-white/10 rounded-[24px] p-8 text-center">
              <div className="text-5xl mb-5">🎫</div>

              <h2 className="text-2xl font-bold mb-3">Create a Ticket</h2>

              <p className="text-white/60 mb-6">
                Submit a support request and we'll get back to you.
              </p>

              <button
                onClick={() => navigate("/ticket")}
                className="px-6 py-3 rounded-xl bg-purple-500 hover:bg-purple-600 transition"
              >
                Create Ticket
              </button>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-14 bg-white/[0.05] border border-white/10 rounded-[24px] p-8">
            <h3 className="text-2xl font-bold mb-4">Response Times</h3>

            <div className="space-y-3 text-white/70">
              <p>📧 Email Support: Within 24 hours</p>

              <p>💬 Live Chat: Usually within a few minutes</p>

              <p>🎫 Support Tickets: Within 1 business day</p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
