import PublicLayout from "../layouts/PublicLayout";
import "../css/feature.css";
import { useNavigate } from "react-router-dom";
import {
  Globe,
  Sparkles,
  FileText,
  Rocket,
  Smartphone,
  LayoutDashboard,
} from "lucide-react";

export default function Features() {
  const navigate = useNavigate();

  const features = [
    {
      title: "Custom Domain",
      desc: "Use your own domain name for professional branding.",
      icon: <Globe size={32} />,
    },
    {
      title: "Modern Templates",
      desc: "Beautiful recruiter-focused portfolio designs.",
      icon: <Sparkles size={32} />,
    },
    {
      title: "Resume Upload",
      desc: "Upload your resume and allow recruiters to download it.",
      icon: <FileText size={32} />,
    },
    {
      title: "Fast Hosting",
      desc: "Optimized hosting with excellent performance.",
      icon: <Rocket size={32} />,
    },
    {
      title: "Mobile Responsive",
      desc: "Looks perfect on desktop, tablet and mobile.",
      icon: <Smartphone size={32} />,
    },
    {
      title: "Easy Dashboard",
      desc: "Manage your profile, projects and skills easily.",
      icon: <LayoutDashboard size={32} />,
    },
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-28 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-black text-center mb-6">
            Powerful Features
          </h1>

          <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
            Everything you need to build a modern professional portfolio
            website.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white/[0.05] border border-white/10 rounded-[24px] p-8"
              >
                <div className="mb-5">{item.icon}</div>

                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button
              onClick={() => navigate("/pricing")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500"
            >
              View Pricing
            </button>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
