import { useState } from "react";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  brief: string;
  filePath?: string;
  link?: string;
};

const fundamentalCertifications: Certification[] = [
  {
    title: "Git Training",
    issuer: "Krishna Kumar - SimpliLearn",
    date: "2024",
    brief:
      "Foundational Git workflow training covering commits, branching, and collaboration.",
    filePath: "/certifications/GIT-TRAINING.pdf",
  },
  {
    title: "Become a web Developer : Introduction to jQuery",
    issuer: "Krishna Kumar - SimpliLearn",
    date: "2024",
    brief:
      "Introductory jQuery course focused on DOM manipulation and interactive UI behavior.",
    filePath: "/certifications/JQUERY.pdf",
  },
  {
    title: "JavaScript for Beginners",
    issuer: "Krishna Kumar - SimpliLearn",
    date: "2024",
    brief:
      "Core JavaScript concepts including variables, functions, and control flow.",
    filePath: "/certifications/JSBEGINNERS.pdf",
  },
  {
    title: "JavaScript Projects",
    issuer: "Great Learning Academy",
    date: "2024",
    brief:
      "Basic JavaScript concepts like variables, functions, and control flow.",
    filePath: "/certifications/GreatLearning.pdf",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2026",
    brief:
      "Certificate covering responsive layout, accessibility basics, and modern CSS practices.",
    link: "https://freecodecamp.org/certification/mark-jerohm-castro/responsive-web-design",
  },
];

const aiCertifications: Certification[] = [
  {
    title: "AWS Upskill: Security, Compliance, and Governance for AI Solutions",
    issuer: "Amazon Web Services",
    date: "2026",
    brief:
      "Advanced training on security, compliance, and governance best practices for implementing AI solutions securely and responsibly.",
    filePath: "/certifications/AWS-UPSKILL.pdf",
  },
  {
    title: "Databricks: Get Started with Databricks for Generative AI",
    issuer: "Databricks",
    date: "2026",
    brief:
      "Introductory certification covering the Databricks platform and its integrated tools for building and deploying generative AI workflows.",
    filePath: "/certifications/databricks.pdf",
  },
  {
    title: "Google Cloud: Introduction to Responsible AI",
    issuer: "Google Cloud",
    date: "2026",
    brief:
      "Foundational certificate covering responsible AI principles, ethical considerations, and basic AI concepts in the Google Cloud ecosystem.",
    filePath: "/certifications/google.pdf",
  },
  {
    title: "Claude 101: Practical AI Integration",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "Comprehensive guide on leveraging Claude AI effectively in daily work and personal tasks, including best practices and real-world applications.",
    filePath: "/certifications/CLAUDE-101.pdf",
  },
];

type CertificationType = "fundamental" | "ai";

export default function Certifications() {
  const [previewCertification, setPreviewCertification] =
    useState<Certification | null>(null);
  const [activeTab, setActiveTab] = useState<CertificationType>("fundamental");

  const openCertification = (target: string) => {
    window.open(target, "_blank", "noopener,noreferrer");
  };

  const CertificationCard = ({
    certification,
  }: {
    certification: Certification;
  }) => {
    const filePath = certification.filePath;
    const link = certification.link;

    return (
      <article
        key={`${certification.title}-${certification.date}`}
        className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 hover:border-amber-400/30 transition-colors"
      >
        <h4 className="text-xl font-semibold text-white mb-2">
          {certification.title}
        </h4>
        <p className="text-amber-200 mb-1">Issuer: {certification.issuer}</p>
        <p className="text-amber-300 mb-1">Date: {certification.date}</p>
        <p className="text-slate-300 mb-4">{certification.brief}</p>
        <div className="flex flex-wrap gap-3">
          {filePath && (
            <>
              <div
                className="px-4 py-2 rounded-md border border-amber-400/50 text-amber-300 text-sm select-none cursor-default hover:bg-amber-400/10 transition-colors"
                onMouseEnter={() => setPreviewCertification(certification)}
              >
                Hover to Preview
              </div>
              <button
                className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-medium transition-all duration-200 transform hover:scale-105"
                onClick={() => openCertification(filePath)}
              >
                Open Certificate
              </button>
            </>
          )}
          {link && (
            <button
              className="px-4 py-2 rounded-md bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-medium transition-all duration-200 transform hover:scale-105"
              onClick={() => openCertification(link)}
            >
              Proceed to Link Certification
            </button>
          )}
        </div>
      </article>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 p-10 shadow-[0_30px_80px_rgba(2,6,23,0.9)]">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">
            Professional Credentials
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent mb-4">
            Certifications
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto">
            Showcasing my commitment to continuous learning and professional
            development in web development and AI technologies.
          </p>
          <div className="mx-auto mt-6 h-1 w-1/2 rounded-full bg-gradient-to-r from-amber-500/40 via-amber-400 to-slate-800"></div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("fundamental")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-out ${
              activeTab === "fundamental"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg scale-100"
                : "border border-slate-700 text-slate-300 hover:border-amber-400/50 hover:text-amber-200 bg-slate-900/40 scale-95"
            }`}
          >
            Fundamental Certifications
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-out ${
              activeTab === "ai"
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-lg scale-100"
                : "border border-slate-700 text-slate-300 hover:border-amber-400/50 hover:text-amber-200 bg-slate-900/40 scale-95"
            }`}
          >
            AI Certifications
          </button>
        </div>

        {/* Fundamental Certifications Tab */}
        {activeTab === "fundamental" && (
          <div className="mb-16 animate-fadeIn transition-opacity duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fundamentalCertifications.map((certification) => (
                <CertificationCard
                  key={`${certification.title}-${certification.date}`}
                  certification={certification}
                />
              ))}
            </div>
          </div>
        )}

        {/* AI Certifications Tab */}
        {activeTab === "ai" && (
          <div className="mb-16 animate-fadeIn transition-opacity duration-500">
            {aiCertifications.length === 0 ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-12 text-center">
                <p className="text-amber-300 text-lg">Coming soon...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {aiCertifications.map((certification) => (
                  <CertificationCard
                    key={`${certification.title}-${certification.date}`}
                    certification={certification}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {previewCertification?.filePath && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 transition-opacity duration-300"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setPreviewCertification(null);
              }
            }}
          >
            <div
              onMouseLeave={() => setPreviewCertification(null)}
              className="w-full max-w-4xl h-[80vh] rounded-xl border border-amber-400/30 bg-slate-950/95 overflow-hidden shadow-2xl transition-all duration-300 ease-out scale-100 opacity-100"
            >
              <div className="px-4 py-3 border-b border-amber-400/30 text-sm text-amber-200 bg-slate-900/50">
                Preview: {previewCertification.title}
              </div>
              <iframe
                src={previewCertification.filePath}
                title={`${previewCertification.title} Preview`}
                className="w-full h-[calc(80vh-49px)]"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
