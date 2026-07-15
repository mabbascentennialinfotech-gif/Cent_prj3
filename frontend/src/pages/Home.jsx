import { useState, useEffect } from "react";
import "../css/home.css";
import {
  User,
  Briefcase,
  Link,
  ShieldCheck,
  Sparkles,
  Globe,
  FileText,
  Rocket,
  Smartphone,
  LayoutDashboard,
  Star,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";
export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasSubdomain, setHasSubdomain] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userMenu, setUserMenu] = useState(false);

  const navigate = useNavigate();
  const firstName = userData?.name?.split(" ")[0] || "";
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsPremium(false);
        setUserData(null);
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();

          setUserData(data);
          setIsPremium(data.premium === true);
        }
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {show && (
        <div className="fixed bottom-8 right-0 z-50">
          <button
            onClick={() => {
              document
                .getElementById("fixed")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-500 px-5 py-3 rounded-l-full font-semibold shadow-2xl hover:scale-105 transition-all"
          >
            Go to <br /> top
          </button>
        </div>
      )}
      {/* BACKGROUND GLOW */}
      <div
        className="absolute top-0 left-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] bg-blue-500/20 rounded-full blur-[120px]"
        id="fixed"
      ></div>

      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] bg-purple-500/20 rounded-full blur-[120px]"></div>

      {/* NAVBAR */}
      <div className="sticky-nav w-full bg-black/95 backdrop-blur-xl border-b border-white/10 md:bg-black/95 md:backdrop-blur-xl md:border-b md:border-white/10">
        <nav className="max-w-[1400px] mx-auto flex items-center justify-between px-4 md:px-10 lg:px-20 py-3 gap-4">
          <div className="flex-shrink-0">
            <h1 className="text-[18px] sm:text-2xl md:text-3xl font-black tracking-tight whitespace-nowrap">
              Centennial
              <span className=" bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Portfolio
              </span>
            </h1>

            <p className="text-xs text-white/60 mt-1 tracking-[3px] uppercase">
              Build Your Digital Identity
            </p>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center gap-6 text-white/80 nav-links">
            <button
              onClick={() =>
                document
                  .getElementById("hero")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:text-white transition-colors"
            >
              Get Started
            </button>

            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>

            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>

            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
            {auth.currentUser && (
              <a
                href="/retrieve-domain"
                className="hover:text-white transition-colors"
              >
                My Domains
              </a>
            )}
          </div>

          <div className="flex items-center gap-3 nav-right flex-shrink-0">
            {(!userData || userData.premium !== true) && (
              <button
                onClick={() => navigate("/pricing")}
                className="hidden md:block go-premium-btn bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-2 md:px-6 md:py-3 rounded-xl md:rounded-2xl text-sm  md:text-base font-semibold transition-all shadow-2xl md:block "
              >
                Go Premium
              </button>
            )}

            {/* Show avatar for any logged-in user */}
            {userData && (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="flex items-center gap-1 md:gap-2"
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    {userData.name?.charAt(0).toUpperCase()}
                  </div>

                  <span className="hidden md:block text-white">
                    {firstName}
                  </span>
                </button>

                {userMenu && (
                  <div className="absolute -right-20 mt-3 w-50 bg-black border border-white/10 rounded-xl shadow-xl p-3 z-50">
                    <div className="mb-3 border-b border-white/10 pb-3">
                      <p className="text-white font-semibold break-words">
                        {userData?.name}
                      </p>

                      <p className="text-white/50 text-sm break-words">
                        {userData?.email}
                      </p>
                    </div>

                    <button
                      onClick={() => navigate("/retrieve-domain")}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                    >
                      My Domains
                    </button>

                    <button
                      onClick={async () => {
                        await signOut(auth);
                        setUserMenu(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-red-400 hover:bg-white/10"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Show Go Premium only if NOT premium */}
            <div className="flex items-center gap-2">
              {(!userData || userData.premium !== true) && (
                <button
                  onClick={() => navigate("/pricing")}
                  className="md:hidden bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-2 rounded-lg text-sm font-semibold"
                >
                  Go Premium
                </button>
              )}

              <button
                className="block md:hidden"
                onClick={() => setMobileMenu(!mobileMenu)}
              >
                {mobileMenu ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu - Sticky below navbar */}
        {mobileMenu && (
          <div className="md:hidden bg-black/95 backdrop-blur-xl -mt-1 border-0">
            <div className="flex flex-row flex-wrap items-stretch p-0 gap-0">
              <button
                onClick={() => {
                  document
                    .getElementById("hero")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex-1 min-w-[70px] text-center text-sm text-white hover:text-blue-400 px-2 py-3 rounded-lg hover:bg-white/10"
              >
                Get Started
              </button>

              <a
                href="#features"
                className="flex-1 min-w-[70px] text-center text-sm text-white/80 hover:text-white px-2 py-3 rounded-lg hover:bg-white/10"
              >
                Features
              </a>

              <a
                href="#pricing"
                className="flex-1 min-w-[70px] text-center text-sm text-white/80 hover:text-white px-2 py-3 rounded-lg hover:bg-white/10"
              >
                Pricing
              </a>

              <a
                href="#faq"
                className="flex-1 min-w-[70px] text-center text-sm text-white/80 hover:text-white px-2 py-3 rounded-lg hover:bg-white/10"
              >
                FAQ
              </a>
            </div>
          </div>
        )}
      </div>

      {/* HERO SECTION */}
      <section className="home-main-content relative z-10 px-6 md:px-16 lg:px-28">
        <div className="max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          {/* LEFT */}
          <div className="flex flex-col justify-center lg:min-h-[650px]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-tight tracking-tight">
              Get Your
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                Dream Portfolio
              </span>
              <span className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-5">
                Starting Less Than a Burger 🍔
              </span>
            </h1>

            <p
              id="hero"
              className="mt-10 text-xl text-white/80 leading-relaxed max-w-2xl"
            >
              Create a stunning portfolio website with modern recruiter-focused
              design and powerful personal branding.
            </p>

            {/* TRUST STRIP (NEW ADDITION) */}
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-white/80">
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                ⚡ No Hidden Charges
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                💰 No VAT / GST
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                🚀 3-Day Free Trial
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                🌐 Free Hosting
              </span>
              <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">
                🛠 24/7 Support
              </span>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <button
                onClick={() => navigate("/login?type=register")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 px-10 py-5 rounded-2xl font-semibold"
              >
                Create My Portfolio
              </button>
              <button
                onClick={() => navigate("/login?type=login")}
                className="px-10 py-5 rounded-2xl border border-white/15 bg-white/[0.06]"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/login?type=demo")}
                className="px-10 py-5 rounded-2xl border border-white/15 bg-white/[0.06]"
              >
                View Demo
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-xl">
              <div>
                <h2 className="text-4xl font-black">500+</h2>
                <p className="text-white/70">Portfolios</p>
              </div>
              <div>
                <h2 className="text-4xl font-black">99.9%</h2>
                <p className="text-white/70">Uptime</p>
              </div>
              <div>
                <h2 className="text-4xl font-black">24/7</h2>
                <p className="text-white/70">Support</p>
              </div>
            </div>
          </div>

          {/* RIGHT (UNCHANGED YOUR DESIGN) */}
          <div className="relative flex items-center justify-center h-full">
            <div className="w-full max-w-xl bg-white/[0.06] border border-white/15 backdrop-blur-2xl rounded-[24px] md:rounded-[32px] p-4 sm:p-6 md:p-8 shadow-2xl">
              {/* HEADER */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-3xl font-black">Emma Johnson</h3>

                  <p className="text-white/70 mt-2">Senior UI/UX Designer</p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-white/60">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Available for work
                  </div>
                </div>

                <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                  <User size={34} />
                </div>
              </div>

              {/* ABOUT */}
              <div className="bg-black/30 rounded-3xl p-6 border border-white/5">
                <h4 className="font-semibold text-xl">About</h4>

                <p className="text-white/70 mt-4 leading-relaxed">
                  I design modern, user-centric digital experiences focused on
                  usability, performance and conversion.
                </p>
              </div>

              {/* SKILLS */}
              <div className="bg-black/30 rounded-3xl p-6 border border-white/5 mt-5">
                <h4 className="font-semibold text-xl">Skills</h4>

                <div className="flex flex-wrap gap-2 mt-4">
                  {["UI Design", "UX Research", "User Testing"].map(
                    (skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/10 text-white/80"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-5 mt-6">
                <div className="bg-black/30 rounded-3xl p-6 border border-white/5">
                  <h4 className="text-white/70">Projects</h4>
                  <p className="text-4xl font-black mt-3">48+</p>
                  <p className="text-white/50 text-sm mt-1">
                    Completed successfully
                  </p>
                </div>

                <div className="bg-black/30 rounded-3xl p-6 border border-white/5">
                  <h4 className="text-white/70">Experience</h4>
                  <p className="text-4xl font-black mt-3">5+ Yrs</p>
                  <p className="text-white/50 text-sm mt-1">
                    Industry experience
                  </p>
                </div>
              </div>

              {/* EXPERIENCE HIGHLIGHT */}
              <div className="bg-black/30 rounded-3xl p-6 border border-white/5 mt-5">
                <h4 className="font-semibold text-xl">Experience</h4>

                <ul className="mt-4 space-y-3 text-white/70 text-sm">
                  <li>• Designed SaaS dashboards for startup clients</li>
                  <li>• Improved user conversion rates by 35%</li>
                  <li>• Built scalable design systems for web & mobile</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SECTION */}
      <section className="relative z-10 px-6 md:px-16 lg:px-28 py-10">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-black leading-tight">
            Why You Need a Portfolio Website
          </h2>

          <p className="text-white/70 text-xl mt-8 max-w-3xl mx-auto leading-relaxed">
            A professional portfolio helps recruiters and clients trust you
            faster, discover your work easily and remember your personal brand.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-16 lg:mt-24">
            {[
              "Look More Professional",
              "Share One Simple Link",
              "Increase Recruiter Trust",
              "Stand Out From Competition",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/[0.06] border border-white/15 rounded-3xl p-10 backdrop-blur-lg hover:-translate-y-2 transition-transform"
              >
                <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 mb-8 mx-auto flex items-center justify-center">
                  {index === 0 && <Briefcase size={28} />}
                  {index === 1 && <Link size={28} />}
                  {index === 2 && <ShieldCheck size={28} />}
                  {index === 3 && <Sparkles size={28} />}
                </div>

                <h3 className="text-xl font-bold leading-relaxed">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        className="scroll-mt-24 relative z-10 px-6 md:px-16 lg:px-28 py-10 "
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-5xl md:text-6xl font-black">
              Powerful Features
            </h2>

            <p className="text-white/70 mt-8 text-xl max-w-2xl mx-auto">
              Everything needed to build a recruiter-focused online portfolio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Custom Domain",
                desc: "Use your own domain name for better branding.",
              },
              {
                title: "Modern Templates",
                desc: "Beautiful responsive designs optimized for hiring.",
              },
              {
                title: "Resume Upload",
                desc: "Upload resume PDF with recruiter download access.",
              },
              {
                title: "Fast Hosting",
                desc: "Optimized servers with excellent loading speed.",
              },
              {
                title: "Mobile Responsive",
                desc: "Perfect look across desktop, tablet and mobile.",
              },
              {
                title: "Easy Dashboard",
                desc: "Manage skills, projects and bio in one place.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/[0.06] border border-white/15 rounded-3xl p-10 hover:-translate-y-2 transition-transform backdrop-blur-lg"
              >
                <div className="h-16 w-16 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-500 mb-8 flex items-center justify-center">
                  {index === 0 && <Globe size={28} />}
                  {index === 1 && <Sparkles size={28} />}
                  {index === 2 && <FileText size={28} />}
                  {index === 3 && <Rocket size={28} />}
                  {index === 4 && <Smartphone size={28} />}
                  {index === 5 && <LayoutDashboard size={28} />}
                </div>

                <h3 className="text-3xl font-black">{item.title}</h3>

                <p className="text-white/70 mt-5 leading-relaxed text-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* PRICING */}
      <section
        id="pricing"
        className="scroll-mt-24 relative z-10 px-6 md:px-16 lg:px-28 py-8 border-t border-white/[0.03]"
      >
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black">Simple Pricing</h2>

            <p className="text-white/70 text-xl mt-6 max-w-2xl mx-auto">
              Affordable portfolio websites designed to help you stand out.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* BASIC */}
            <div className="bg-white/[0.06] border border-white/10 rounded-[32px] p-10 backdrop-blur-xl">
              <h3 className="text-3xl font-black">Basic</h3>

              <div className="flex items-end gap-2 mt-8">
                <span className="text-6xl font-black">$19</span>

                <span className="text-white/70 mb-2">one time</span>
              </div>

              <div className="space-y-5 mt-10 text-white/80">
                <p>✔ Responsive Portfolio</p>
                <p>✔ Free Hosting</p>
                <p>✔ Resume Upload</p>
                <p>✔ Contact Section</p>
                <p>✔ Mobile Friendly</p>
              </div>

              <button
                onClick={() => navigate("/plan/basic")}
                className="w-full mt-10 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition-transform"
              >
                Get Started
              </button>
            </div>

            {/* PRO */}
            <div className="relative rounded-[32px] p-[1px] bg-gradient-to-br from-blue-500 to-purple-600">
              <div className="bg-black rounded-[32px] p-10 h-full">
                <div className="inline-flex px-4 py-2 rounded-full bg-white text-black font-semibold mb-6">
                  Most Popular
                </div>

                <h3 className="text-3xl font-black">Professional</h3>

                <div className="flex items-end gap-2 mt-8">
                  <span className="text-6xl font-black">$35</span>

                  <span className="text-white/70 mb-2">one time</span>
                </div>

                <div className="space-y-5 mt-10 text-white/80">
                  <p>✔ Custom Domain</p>
                  <p>✔ Premium Design</p>
                  <p>✔ SEO Optimization</p>
                  <p>✔ Unlimited Projects</p>
                  <p>✔ Priority Support</p>
                </div>

                <button
                  onClick={() => navigate("/support")}
                  className="w-full mt-10 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 font-semibold hover:opacity-90 transition-opacity"
                >
                  Contact Support
                </button>
              </div>
            </div>

            {/* BUSINESS */}
            <div className="bg-white/[0.06] border border-white/10 rounded-[32px] p-10 backdrop-blur-xl">
              <h3 className="text-3xl font-black">Business</h3>

              <div className="flex items-end gap-2 mt-8">
                <span className="text-6xl font-black">$49</span>

                <span className="text-white/70 mb-2">one time</span>
              </div>

              <div className="space-y-5 mt-10 text-white/80">
                <p>✔ Advanced Portfolio</p>
                <p>✔ Admin Dashboard</p>
                <p>✔ Blog Support</p>
                <p>✔ Analytics</p>
                <p>✔ Premium Hosting</p>
              </div>

              <button
                onClick={() => navigate("/support")}
                className="w-full mt-10 py-4 rounded-2xl bg-white text-black font-semibold hover:scale-[1.02] transition-transform"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* FAQ SECTION */}
      <section
        id="faq"
        className="scroll-mt-24 relative z-10 px-6 md:px-16 lg:px-28 py-8 border-t border-white/[0.03]"
      >
        <div className="max-w-5xl mx-auto">
          {/* HEADING */}
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              Frequently Asked Questions
            </h2>

            <p className="text-white/70 text-xl mt-6 leading-relaxed">
              Everything you need to know before getting started.
            </p>
          </div>

          {/* FAQ ITEMS */}
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to build my portfolio?",
                answer:
                  "Your portfolio website is instantly ready to launch with modern design, hosting and mobile responsiveness included.",
              },

              {
                question: "Can I use my own custom domain?",
                answer:
                  "Yes. You can connect your personal custom domain anytime for professional branding.",
              },

              {
                question: "Will my portfolio work on mobile devices?",
                answer:
                  "Absolutely. Every portfolio is fully responsive across desktop, tablet and mobile.",
              },

              {
                question: "Can I update projects and skills later?",
                answer:
                  "Yes. You can easily add or edit projects, skills, resume and other information anytime.",
              },

              {
                question: "Is hosting included?",
                answer:
                  "Yes. Hosting is included in all plans so your website stays online smoothly.",
              },

              {
                question: "Do recruiters really prefer portfolio websites?",
                answer:
                  "Yes. A professional portfolio creates stronger first impressions and increases trust with recruiters and clients.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white/[0.06] border border-white/10 rounded-[28px] p-8 backdrop-blur-xl hover:border-white/20 transition-all"
              >
                <h3 className="text-2xl font-bold">{item.question}</h3>

                <p className="text-white/70 mt-5 leading-relaxed text-lg">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
