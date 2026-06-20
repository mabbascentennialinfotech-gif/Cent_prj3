import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

import CookieBanner from "./components/CookieBanner";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PlanDetails = lazy(() => import("./pages/PlanDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Payment = lazy(() => import("./pages/Payment"));
const Success = lazy(() => import("./pages/Success"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const RefundPolicy = lazy(() => import("./pages/RefundPolicy"));
const TermCondition = lazy(() => import("./pages/TermCondition"));
const Support = lazy(() => import("./pages/support"));
const LiveChat = lazy(() => import("./pages/livechat"));
const CreateTicket = lazy(() => import("./pages/CreateTicket"));
const Features = lazy(() => import("./pages/Features"));
const FAQ = lazy(() => import("./pages/Faq"));

function App() {
  return (
    <>
      <CookieBanner />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/demo" element={<Dashboard />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/plan/:planId" element={<PlanDetails />} />
          <Route path="/checkout/:planId" element={<Checkout />} />
          <Route path="/payment/:planId" element={<Payment />} />
          <Route path="/success" element={<Success />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/term-condition" element={<TermCondition />} />
          <Route path="/support" element={<Support />} />
          <Route path="/livechat" element={<LiveChat />} />
          <Route path="/ticket" element={<CreateTicket />} />
          <Route path="/features" element={<Features />} />
          <Route path="/faq" element={<FAQ />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
