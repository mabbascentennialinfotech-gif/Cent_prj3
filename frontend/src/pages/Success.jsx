import "../css/success.css";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();
  const premiumUser = JSON.parse(localStorage.getItem("premiumUser")) || {};

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 py-8">
      <div className="w-full max-w-2xl bg-white/[0.05] border border-white/10 rounded-2xl sm:rounded-[32px] p-6 sm:p-8 md:p-10 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6">
          Payment Successful 🎉
        </h1>

        <p className="text-white/60 mb-8 sm:mb-10 text-sm sm:text-base">
          Your premium portfolio access is now active.
        </p>

        <div className="bg-black/40 rounded-2xl p-4 sm:p-6 text-left space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-white/50">Plan</span>

            <span className="font-medium break-words">
              {premiumUser.plan || "N/A"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-white/50">Payment ID</span>

            <span className="break-all text-sm sm:text-base">
              {premiumUser.paymentId || "N/A"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
            <span className="text-white/50">Status</span>

            <span className="text-green-400 font-medium">Active</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/portfolio")}
          className="w-full mt-8 sm:mt-10 py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold text-sm sm:text-base hover:opacity-90 transition"
        >
          Go To Dashboard
        </button>
      </div>
    </div>
  );
}
