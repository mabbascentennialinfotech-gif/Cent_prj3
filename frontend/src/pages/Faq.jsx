import PublicLayout from "../layouts/PublicLayout";
import "../css/faq.css";
export default function FAQ() {
  const faqs = [
    {
      q: "How long does it take to build my portfolio?",
      a: "Your portfolio is available immediately after setup.",
    },
    {
      q: "Can I use my own domain?",
      a: "Yes, you can connect your own custom domain.",
    },
    {
      q: "Is hosting included?",
      a: "Yes, hosting is included in all plans.",
    },
    {
      q: "Will it work on mobile devices?",
      a: "Yes, every portfolio is fully responsive.",
    },
    {
      q: "Can I update my content later?",
      a: "Yes, you can update projects, skills and resume anytime.",
    },
    {
      q: "Do you provide support?",
      a: "Yes, email support and live chat are available.",
    },
  ];

  return (
    <PublicLayout>
      <div className="min-h-screen bg-black text-white px-6 md:px-16 lg:px-28 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-black text-center mb-6">
            Frequently Asked Questions
          </h1>

          <p className="text-white/70 text-center mb-16">
            Find answers to common questions.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white/[0.05] border border-white/10 rounded-[24px] p-8"
              >
                <h3 className="text-xl font-bold mb-3">{faq.q}</h3>

                <p className="text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
