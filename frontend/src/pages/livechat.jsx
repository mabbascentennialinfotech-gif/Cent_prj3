import { useState, useEffect } from "react";
import "../css/livechat.css";
export default function LiveChat() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://embed.tawk.to/6a2915d68705f01c35099884/1jqo7qk7h";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Live Chat</h1>
        <p>Connecting you with support...</p>
      </div>
    </div>
  );
}
