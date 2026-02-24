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
  const openCertification = (target: string) => {
    window.open(target, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
          Certifications
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Open each certification quickly and follow a consistent verification
          flow.
        </p>
      </div>

      <div className="mb-10 rounded-xl border border-slate-800 bg-slate-900/70 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Helper Flow</h3>
        <ol className="list-decimal list-inside text-gray-300 space-y-2 mb-6">
          <li>Put downloaded certificate files in public/certifications.</li>
          <li>Set each card filePath as /certifications/your-file-name.pdf.</li>
          <li>
            Use Open Certificate for local files and Proceed to Link
            Certification for online cert links.
          </li>
        </ol>
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
                  <button
                    className="px-4 py-2 rounded-md bg-slate-100 text-slate-900 hover:bg-white transition-colors font-medium"
                    onClick={() => openCertification(filePath)}
                  >
                    Open Certificate
                  </button>
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
    </section>
  );
}
