import { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const hidePremiumButton =
    location.pathname.startsWith("/pricing") ||
    location.pathname.startsWith("/checkout") ||
    location.pathname.startsWith("/plan/basic");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsPremium(false);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setIsPremium(userSnap.data().premium === true);
        }
      } catch (error) {
        console.error(error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-28 py-6 border-b border-white/10">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <h1 className="text-2xl sm:text-3xl font-black">
            Centennial
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Portfolio
            </span>
          </h1>
        </div>
        {!hidePremiumButton && !loading && !isPremium && (
          <button
            onClick={() => navigate("/pricing")}
            className="lg:hidden bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-2 rounded-xl text-sm font-semibold"
          >
            Upgrade
          </button>
        )}

        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>

        <div className="hidden lg:flex items-center gap-5">
          <button
            onClick={() => navigate("/")}
            className="text-white/70 hover:text-white"
          >
            Home
          </button>

          <button
            onClick={() => navigate("/login?type=demo")}
            className="text-white/70 hover:text-white"
          >
            Try Demo
          </button>

          <button
            onClick={() => navigate("/login?type=register")}
            className="text-white/70 hover:text-white"
          >
            Use Trial
          </button>

          <button
            onClick={() => navigate("/features")}
            className="text-white/70 hover:text-white"
          >
            Features
          </button>

          <button
            onClick={() => navigate("/faq")}
            className="text-white/70 hover:text-white"
          >
            FAQ
          </button>

          <button
            onClick={() => navigate("/support")}
            className="text-white/70 hover:text-white"
          >
            Support
          </button>
          {!hidePremiumButton && !loading && !isPremium && (
            <button
              onClick={() => navigate("/pricing")}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 px-5 py-2 rounded-xl font-semibold"
            >
              Go Premium
            </button>
          )}
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden flex flex-col gap-4 px-6 py-6 border-b border-white/10 bg-black">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/login?type=demo")}>Try Demo</button>
          <button onClick={() => navigate("/login?type=register")}>
            Use Trial
          </button>
          <button onClick={() => navigate("/features")}>Feature</button>
          <button onClick={() => navigate("/faq")}>FAQ</button>
          <button onClick={() => navigate("/support")}>Support</button>
        </div>
      )}
    </>
  );
}
