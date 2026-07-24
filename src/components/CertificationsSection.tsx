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
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "I also completed a lesson focused on the different Claude products and workflows, where I learned when and how to use tools such as Claude Code, Claude for Slack, Excel, PowerPoint, and Chrome. The lesson enhanced my understanding of Claude Desktop modes — Chat, Cowork, and Code — including their specific use cases, features, and workflow advantages. Additionally, I gained knowledge about artifacts, how to share or publish them, and how to troubleshoot common issues related to their usage.",
    filePath: "/certifications/CLAUDE-101.pdf",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "I completed the Claude Code 101 course, where I learned how AI coding agents work and how they differ from traditional chat-based AI tools. I gained hands-on experience in setting up and using Claude Code across different environments, managing workflows, handling context efficiently, and creating custom subagents, hooks, and integrations through MCP servers. This course also improved my understanding of AI-assisted development and how to apply it effectively in real-world software engineering workflows.",
    filePath: "/certifications/claude-code-101.pdf",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "Focused on Claude Code in Action, this certification highlights how Claude hooks and code agents help identify what to avoid in a codebase, tackle harder engineering tasks, extend workflows with custom integrations, and improve overall system security through safer, context-aware automation.",
    filePath: "/certifications/CLAUDE-CODE-IN-ACTION.pdf",
  },
  {
    title: "AI Fluency: AI Capabilities & Limitations",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "This certification covers diagnosing AI failures, using AI for productivity rather than passive consumption, and understanding prompt design by positioning major instructions effectively to get reliable, actionable results.",
    filePath: "/certifications/AI-FLUENCY-CAPABILITIES-LIMITATIONS.pdf",
  },
];

type CertificationType = "fundamental" | "ai";

export default function CertificationsSection() {
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
        className="rounded-xl border border-beige-200 bg-beige-50 p-6 shadow-sm transition-colors hover:border-clay-300"
      >
        <h4 className="text-xl font-semibold text-stone-800 mb-2">
          {certification.title}
        </h4>
        <p className="text-beige-700 mb-1">Issuer: {certification.issuer}</p>
        <p className="text-clay-600 mb-1">Date: {certification.date}</p>
        <p className="text-stone-600 mb-4">{certification.brief}</p>
        <div className="flex flex-wrap gap-3">
          {filePath && (
            <>
              <div
                className="px-4 py-2 rounded-md border border-clay-400/60 text-clay-700 text-sm select-none cursor-default hover:bg-clay-50 transition-colors"
                onMouseEnter={() => setPreviewCertification(certification)}
              >
                Hover to Preview
              </div>
              <button
                className="px-4 py-2 rounded-md bg-clay-700 hover:bg-clay-800 text-azure font-medium transition-all duration-200 transform hover:scale-105"
                onClick={() => openCertification(filePath)}
              >
                Open Certificate
              </button>
            </>
          )}
          {link && (
            <button
              className="px-4 py-2 rounded-md bg-clay-700 hover:bg-clay-800 text-azure font-medium transition-all duration-200 transform hover:scale-105"
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
    <section
      id="certifications"
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <div className="relative overflow-hidden rounded-3xl border border-beige-200 bg-white/60 p-8 shadow-sm md:p-10">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-clay-600 mb-3">
            Professional Credentials
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-stone-800 mb-4">
            Certifications
          </h2>
          <p className="text-stone-600 text-lg max-w-3xl mx-auto">
            Showcasing my commitment to continuous learning and professional
            development in web development and AI technologies.
          </p>
          <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-clay-500" />
        </div>

        {/* Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveTab("fundamental")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-out ${
              activeTab === "fundamental"
                ? "bg-clay-700 text-azure shadow-lg scale-100"
                : "border border-beige-300 text-stone-600 hover:border-clay-400 hover:text-clay-700 bg-beige-50/60 scale-95"
            }`}
          >
            Fundamental Certifications
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ease-out ${
              activeTab === "ai"
                ? "bg-clay-700 text-azure shadow-lg scale-100"
                : "border border-beige-300 text-stone-600 hover:border-clay-400 hover:text-clay-700 bg-beige-50/60 scale-95"
            }`}
          >
            AI Certifications
          </button>
        </div>

        {/* Fundamental Certifications Tab */}
        {activeTab === "fundamental" && (
          <div className="animate-fadeIn transition-opacity duration-500">
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
          <div className="animate-fadeIn transition-opacity duration-500">
            {aiCertifications.length === 0 ? (
              <div className="rounded-xl border border-beige-200 bg-beige-50 p-12 text-center">
                <p className="text-clay-700 text-lg">Coming soon...</p>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-sm p-4 transition-opacity duration-300"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setPreviewCertification(null);
              }
            }}
          >
            <div
              onMouseLeave={() => setPreviewCertification(null)}
              className="w-full max-w-4xl h-[80vh] rounded-xl border border-beige-400 bg-beige-50 overflow-hidden shadow-2xl transition-all duration-300 ease-out scale-100 opacity-100"
            >
              <div className="px-4 py-3 border-b border-beige-300 text-sm text-beige-700 bg-white/60">
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
