import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  // VERIFY OTP
  const verifyOtp = async () => {
    try {
      await window.confirmationResult.confirm(otp);

      navigate("/app");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="w-[400px] p-8 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-3xl font-bold mb-6">Verify OTP</h1>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 mb-5"
        />

        <button
          onClick={verifyOtp}
          className="w-full py-3 rounded-xl bg-green-500"
        >
          Verify & Continue
        </button>
      </div>
    </div>
  );
}
