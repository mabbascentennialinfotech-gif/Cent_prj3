import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");

    // show only if user hasn't chosen yet
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        analytics: true,
        ads: true,
        necessary: true,
        status: "accepted",
      }),
    );
    setShow(false);
  };

  const rejectAll = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        analytics: false,
        ads: false,
        necessary: true,
        status: "rejected",
      }),
    );
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white border-t border-white/10 p-5 z-50 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* TEXT */}
      <div className="text-sm text-white/80">
        We use cookies to improve your experience, analyze traffic, and support
        analytics. You can accept or reject non-essential cookies.
      </div>

      {/* BUTTONS */}
      <div className="flex gap-3">
        <button
          onClick={rejectAll}
          className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          Reject All
        </button>

        <button
          onClick={acceptAll}
          className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold"
        >
          Accept All
        </button>
      </div>
    </div>
  );
}
