import { useState } from "react";

type Certification = {
  title: string;
  issuer: string;
  date: string;
  brief: string;
  filePath?: string;
  link?: string;
};

const certifications: Certification[] = [
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

export default function Certifications() {
  const [previewCertification, setPreviewCertification] =
    useState<Certification | null>(null);

  const openCertification = (target: string) => {
    window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
          Certifications
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((certification) => {
          const filePath = certification.filePath;
          const link = certification.link;

          return (
            <article
              key={`${certification.title}-${certification.date}`}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6"
            >
              <h4 className="text-xl font-semibold text-white mb-2">
                {certification.title}
              </h4>
              <p className="text-gray-400 mb-1">
                Issuer: {certification.issuer}
              </p>
              <p className="text-gray-400 mb-1">Date: {certification.date}</p>
              <p className="text-gray-300 mb-4">{certification.brief}</p>
              <div className="flex flex-wrap gap-3">
                {filePath && (
                  <>
                    <div
                      className="px-4 py-2 rounded-md border border-sky-400/50 text-sky-300 text-sm select-none cursor-default"
                      onMouseEnter={() => setPreviewCertification(certification)}
                    >
                      Hover to Preview
                    </div>
                  <button
                    className="px-4 py-2 rounded-md bg-slate-100 text-slate-900 hover:bg-white transition-colors font-medium"
                    onClick={() => openCertification(filePath)}
                  >
                    Open Certificate
                  </button>
                  </>
                )}
                {link && (
                  <button
                    className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors font-medium"
                    onClick={() => openCertification(link)}
                  >
                    Proceed to Link Certification
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

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
            className="w-full max-w-4xl h-[80vh] rounded-xl border border-slate-700 bg-slate-950/95 overflow-hidden shadow-2xl transition-all duration-300 ease-out scale-100 opacity-100"
          >
            <div className="px-4 py-3 border-b border-slate-800 text-sm text-slate-200">
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
    </section>
  );
}
