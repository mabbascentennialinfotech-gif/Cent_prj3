import React, { useState, useEffect } from "react";
import "../css/login.css";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
//console.log("DB OBJECT:", db);

export default function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const type = searchParams.get("type");

  const isDemo = type === "demo";
  const isRegister = type === "register";
  const isLogin = type === "login";

  const [name, setName] = useState("");
  const [resetMode, setResetMode] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  // forget password
  const forgotPassword = async () => {
    if (!form.email) {
      setErrorMsg("Please enter your email address first.");
      return;
    }

    try {
      setErrorMsg("");
      setSuccessMsg("");

      await sendPasswordResetEmail(auth, form.email);

      setSuccessMsg("Password reset link has been sent to your email.");
    } catch (error) {
      setErrorMsg(getFirebaseError(error));
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        navigate("/portfolio");
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white/70">Loading...</p>
        </div>
      </div>
    );
  }

  // validaton errors
  const getFirebaseError = (error) => {
    switch (error.code) {
      case "auth/invalid-email":
        return "Please enter a valid email address.";

      case "auth/user-not-found":
        return "No account found with this email.";

      case "auth/wrong-password":
        return "Incorrect password. Please try again.";

      case "auth/invalid-credential":
        return "Email or password is incorrect.";

      case "auth/email-already-in-use":
        return "An account already exists with this email.";

      case "auth/weak-password":
        return "Password must be at least 6 characters long.";

      case "auth/missing-password":
        return "Please enter your password.";

      case "auth/missing-email":
        return "Please enter your email address.";

      case "auth/popup-closed-by-user":
        return "Google sign-in was cancelled.";

      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";

      case "auth/too-many-requests":
        return "Too many attempts. Please try again later.";

      default:
        return "Something went wrong. Please try again.";
    }
  };
  // EMAIL REGISTER
  const registerUser = async () => {
    try {
      setErrorMsg("");
      setSuccessMsg("");

      const result = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password,
      );

      setSuccessMsg("Account created successfully!");
      const user = result.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        provider: "email",
        plan: "trial",
        trialStartedAt: Date.now(),
        trialEndsAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
      });

      navigate("/portfolio");
    } catch (error) {
      setErrorMsg(getFirebaseError(error));
    }
  };

  // GOOGLE LOGIN
  const googleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("USER:", user);

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,

          provider: "google",

          plan: "trial",
          createdAt: Date.now(),
          trialEndsAt: Date.now() + 3 * 24 * 60 * 60 * 1000,
        },
        { merge: true },
      );
      console.log("WRITE SUCCESS");
      navigate("/portfolio");
    } catch (error) {
      console.error(error);
      setErrorMsg(getFirebaseError(error));
    }
  };
  const loginUser = async () => {
    try {
      setErrorMsg("");
      setSuccessMsg("");

      await signInWithEmailAndPassword(auth, form.email, form.password);

      setSuccessMsg("Login successful!");

      navigate("/portfolio");
    } catch (error) {
      setErrorMsg(getFirebaseError(error));
    }
  };

  if (type !== "register" && type !== "login" && type !== "demo") {
    navigate("/");
    return null;
  }

  const handleStart = () => {
    const demoUser = {
      name: name || "Demo User",
      type: "demo",
      createdAt: Date.now(),
    };

    localStorage.setItem("demoUser", JSON.stringify(demoUser));

    navigate("/demo");
  };

  return (
    <div className="min-h-screen px-4 py-8 flex items-center justify-center bg-black text-white">
      {isDemo && (
        <div className="w-full max-w-[400px] mx-4 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10">
          <h1 className="text-3xl font-bold mb-3">Start Demo</h1>

          <p className="text-white/50 mb-6">
            Preview the portfolio dashboard instantly.
          </p>

          <input
            placeholder="Enter demo name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-black/40 border border-white/10 mb-6"
          />

          <button
            onClick={handleStart}
            className="w-full py-3 rounded-xl bg-blue-500 font-semibold"
          >
            Start Demo
          </button>
        </div>
      )}
      {(isRegister || isLogin) && (
        <div className="w-full max-w-[420px] mx-4 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            {isRegister ? "Start Free Trial" : "Welcome Back"}
          </h1>

          <p className="text-white/50 text-sm sm:text-base mb-8">
            {isRegister
              ? "3-Day Trial • Watermarked Version"
              : "Login to your portfolio dashboard"}
          </p>
          {errorMsg && (
            <div className="mb-4 p-4 rounded-xl border border-red-500/30 bg-red-500/10">
              <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-4 rounded-xl border border-green-500/30 bg-green-500/10">
              <p className="text-green-400 text-sm font-medium">{successMsg}</p>
            </div>
          )}

          {/* USERNAME */}
          {/* <input
          type="text"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({
              ...form,
              username: e.target.value,
            })
          }
          className="w-full p-3 rounded-xl bg-black/30 border border-white/10 mb-4"
        /> */}

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full p-3 sm:p-4 rounded-xl bg-black/30 border border-white/10 mb-4 text-sm sm:text-base"
          />

          {/* PASSWORD */}
          {!resetMode && (
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="w-full p-3 rounded-xl bg-black/30 border border-white/10 mb-6"
            />
          )}
          {isLogin && (
            <div className="flex justify-end mb-6">
              <button
                type="button"
                onClick={() => {
                  setResetMode(true);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="text-sm text-purple-400 hover:text-purple-300"
              >
                Forgot Password?
              </button>
            </div>
          )}

          {/* REGISTER */}
          {/* ACTION BUTTONS */}
          {isLogin && resetMode ? (
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <button
                onClick={forgotPassword}
                className="flex-1 py-3 rounded-xl bg-purple-500 font-semibold"
              >
                Send Reset Link
              </button>

              <button
                onClick={() => {
                  setResetMode(false);
                  setErrorMsg("");
                  setSuccessMsg("");
                }}
                className="flex-1 py-3 rounded-xl bg-white/10 border border-white/10 font-semibold"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              {isRegister ? (
                <>
                  <button
                    onClick={registerUser}
                    className="flex-1 py-3 rounded-xl bg-purple-500 font-semibold"
                  >
                    Start Free Trial
                  </button>

                  <button
                    onClick={() => {
                      setErrorMsg("");
                      setSuccessMsg("");
                      navigate("/login?type=login");
                    }}
                    className="flex-1 py-3 rounded-xl bg-white/10 border border-white/10 font-semibold"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={loginUser}
                    className="flex-1 py-3 rounded-xl bg-purple-500 font-semibold"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setErrorMsg("");
                      setSuccessMsg("");
                      navigate("/login?type=register");
                    }}
                    className="flex-1 py-3 rounded-xl bg-white/10 border border-white/10 font-semibold"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          )}

          {/* DIVIDER */}
          <div className="text-center text-white/40 mb-5">OR</div>

          {/* GOOGLE */}
          <button
            onClick={googleLogin}
            className="w-full py-3 rounded-xl bg-white text-black font-semibold"
          >
            {isRegister ? "Signup with Google" : "Login with Google"}
          </button>
        </div>
      )}
    </div>
  );
}
