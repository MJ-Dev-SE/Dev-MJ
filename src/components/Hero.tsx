import { useState, useEffect, useRef, useMemo } from "react";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const roles = useMemo(
    () => [
      "React Developer",
      "Mobile Developer",
      "Web Designer",
      "Front-End Developer",
      "Full-Stack Developer",
    ],
    [],
  );
  const [typedRole, setTypedRole] = useState("");
  const roleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const roleIndexRef = useRef(0);
  const roleCharIndexRef = useRef(0);
  const isRoleTypingRef = useRef(true);

  useEffect(() => {
    if (currentSlide === 0) {
      roleTimerRef.current = setInterval(() => {
        const currentRole = roles[roleIndexRef.current];

        if (isRoleTypingRef.current) {
          if (roleCharIndexRef.current < currentRole.length) {
            roleCharIndexRef.current += 1;
            setTypedRole(currentRole.slice(0, roleCharIndexRef.current));
          } else {
            isRoleTypingRef.current = false;
          }
        } else {
          if (roleCharIndexRef.current > 0) {
            roleCharIndexRef.current -= 1;
            setTypedRole(currentRole.slice(0, roleCharIndexRef.current));
          } else {
            isRoleTypingRef.current = true;
            roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
          }
        }
      }, 90);
    } else {
      if (roleTimerRef.current) {
        clearInterval(roleTimerRef.current);
        roleTimerRef.current = null;
      }
      setTypedRole("");
      roleCharIndexRef.current = 0;
      isRoleTypingRef.current = true;
    }

    return () => {
      if (roleTimerRef.current) {
        clearInterval(roleTimerRef.current);
      }
    };
  }, [currentSlide, roles]);

  const projects = [
    {
      title: "React | Personal Project",
      subtitle: "EASYJOBAISTATUS",
      timeline: "2026",
      description:
        "Built a status dashboard for job tracking and team updates. Designed clear progress views, alerts, and timeline summaries. Delivered visibility that accelerates decision-making and handoff.",
      highlights: [
        "Built a status dashboard for job tracking and team updates",
        "Designed clear progress views, alerts, and timeline summaries",
        "Delivered visibility that accelerates decision-making and handoff",
      ],
    },
    {
      title: "UI / UX Developer | Intern",
      subtitle: "PNP Inventory System",
      timeline: "Dec 2025 – March 2026",
      description:
        "Aligned system workflows with PNP operations and reporting. Implemented secure role-based access and audit tracking. Optimized inventory sync for faster police logistics updates.",
      highlights: [
        "Aligned system workflows with PNP operations and reporting",
        "Implemented secure role-based access and audit tracking",
        "Optimized inventory sync for faster police logistics updates",
      ],
    },
    {
      title: "Mobile App Dev - Thesis",
      subtitle: "ShopFur (Augmented Reality)",
      timeline: "January 2025 – December 2025",
      description:
        "Developed React Native features with Unity AR integration. Enabled immersive product previews and interactive shopping. Increased engagement through stable AR experience flows.",
      highlights: [
        "Developed React Native features with Unity AR integration",
        "Enabled immersive product previews and interactive shopping",
        "Increased engagement through stable AR experience flows",
      ],
    },
    {
      title: "UI THINK",
      subtitle: "UI Terminology & Standards Guide",
      timeline: "2026 release",
      description:
        "Maps major UI terminology and prerequisite design concepts. Shows sample patterns and when to use or avoid them. Connects standards-driven documentation with UI decisions. Adds Gemini AI guidance for smarter interface reviews.",
      highlights: [
        "Maps major UI terminology and prerequisite design concepts",
        "Shows sample patterns and when to use or avoid them",
        "Connects standards-driven documentation with UI decisions",
        "Adds Gemini AI guidance for smarter interface reviews",
      ],
    },
  ];

  const slides = [
    {
      id: 0,
      title: "Welcome",
      content: (
        <div className="space-y-6">
          <h1 className="text-6xl font-bold text-amber-100 min-h-[72px]">
            MARK JEROHM CASTRO
          </h1>
          <p className="text-2xl text-amber-200 min-h-[40px]">
            {typedRole}
            <span className="animate-pulse">|</span>
          </p>
          <div className="flex justify-center gap-8 text-gray-400 text-sm">
            <div>📞 0993 756 4973</div>
            <div>📧 markjerohm@gmail.com</div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      title: "Professional Summary",
      content: (
        <div className="space-y-6 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-100">Where I am now</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Crafting web and mobile experiences with React, TypeScript, and
            React Native. I focus on clean UI systems, performant front-end
            flows, and shipping features end-to-end—from API wiring to polished
            interactions. I enjoy rapid prototyping, then tightening the build
            with tests, accessibility, and sensible analytics.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "Experience",
      content: (
        <div className="space-y-8 max-w-5xl mx-auto text-left">
          <h2 className="text-4xl font-bold text-amber-100 text-center mb-8">
            Experience
          </h2>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-400/20 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-amber-200 mb-1">
                  {project.title}
                </h3>
                <p className="text-amber-100 font-semibold text-sm mb-1">
                  {project.subtitle}
                </p>
                <p className="text-amber-200/80 text-xs mb-3">
                  {project.timeline}
                </p>
                <p
                  className="text-gray-400 text-sm leading-relaxed mb-3 overflow-hidden"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {project.description}
                </p>
                <button
                  className="text-amber-300 text-xs uppercase tracking-wider hover:text-amber-100 transition-colors"
                  onClick={() => setSelectedProject(project)}
                >
                  See More →
                </button>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4">
      <div className="w-full max-w-6xl relative">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-10 w-72 h-72 bg-amber-500/40 blur-[140px]" />
          <div className="absolute -bottom-12 left-6 w-64 h-64 bg-rose-500/30 blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.18),_transparent_65%)]" />
        </div>
        {/* Carousel Container */}
        <div className="relative bg-gradient-to-br from-slate-950 via-amber-950/40 to-slate-950 rounded-3xl shadow-[0_12px_28px_rgba(2,6,23,0.55)] border border-slate-800/80 p-8 md:p-12 min-h-[560px] overflow-hidden">
          <div className="grid gap-10 lg:grid-cols-[1.25fr,0.75fr] items-center text-left">
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.4em] text-slate-400">
                <span>Active</span>
                <span>What I build</span>
              </div>
              <div>{slides[currentSlide].content}</div>
              {currentSlide === 0 && (
                <div className="text-sm leading-relaxed text-slate-200 border border-slate-800 bg-white/5 rounded-2xl px-6 py-4 backdrop-blur">
                  <p className="font-semibold text-white">Current focus</p>
                  <p className="text-slate-300">
                    Refining a basketball playbook tool—mapping plays, player
                    roles, and tempo so adjustments stay quick and repeatable.
                  </p>
                </div>
              )}
            </div>
            <div className="space-y-6">
              <div className="bg-white/5 border border-amber-400/30 rounded-2xl p-6 flex flex-col gap-4 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                  <span>Mode</span>
                  <span>Build · Ship</span>
                </div>
                <h3 className="text-2xl font-semibold text-white">
                  Web + Mobile Work
                </h3>
                <p className="text-sm text-slate-300">
                  I set up UI, connect APIs, and keep the flow smooth on both
                  web and mobile.
                </p>
                <div className="flex flex-wrap gap-2 text-[0.65rem] uppercase tracking-[0.25em] text-slate-200">
                  <span className="px-3 py-1 rounded-full border border-amber-500/40 bg-amber-500/10">
                    UI
                  </span>
                  <span className="px-3 py-1 rounded-full border border-amber-500/30 bg-slate-900/60">
                    API
                  </span>
                  {/* <span className="px-3 py-1 rounded-full border border-amber-500/30 bg-slate-900/60">
                    Ops
                  </span> */}
                </div>
              </div>
              {/* <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 space-y-3 text-sm text-slate-300 shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
                <h4 className="text-xs uppercase tracking-[0.35em] text-slate-500 flex items-center gap-2">
                  Status · Team Ready
                  <span className="h-px w-8 bg-gradient-to-r from-amber-400/70 to-transparent" />
                </h4>
                <p className="text-base text-white font-semibold">
                  How this helps
                </p>
                <p className="text-xs text-slate-400">
                  Less back-and-forth, quicker reviews, clearer updates for
                  leads and QA.
                </p>
                <div className="space-y-2">
                  <p className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                    <span>Design handoff</span>
                    <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-200 border border-emerald-500/30">
                      Live
                    </span>
                  </p>
                  <p className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                    <span>QA + checks</span>
                    <span className="px-2 py-1 rounded-full bg-sky-500/10 text-sky-200 border border-sky-500/30">
                      In review
                    </span>
                  </p>
                  <p className="flex items-center justify-between text-xs uppercase tracking-[0.2em]">
                    <span>User feedback</span>
                    <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-200 border border-amber-400/40">
                      Iterating
                    </span>
                  </p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all"
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 text-white p-3 rounded-full transition-all"
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all ${
                currentSlide === index
                  ? "w-12 bg-sky-400"
                  : "w-3 bg-slate-600 hover:bg-slate-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <a
            href="/projects"
            className="px-6 py-3 rounded-lg bg-amber-400 hover:bg-amber-500 text-black font-semibold transition-all"
          >
            View Projects
          </a>
          <a
            href="/contact"
            className="px-6 py-3 rounded-lg border border-slate-700 hover:border-amber-400 hover:text-amber-200 transition-all"
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-amber-200 mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-amber-100 font-semibold text-lg">
                  {selectedProject.subtitle}
                </p>
                <p className="text-amber-200/80 text-sm">
                  {selectedProject.timeline}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-slate-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-300 leading-relaxed">
                {selectedProject.description}
              </p>
              <div>
                <h4 className="text-amber-200 font-semibold mb-3">
                  Key Highlights:
                </h4>
                <ul className="space-y-2 text-gray-400">
                  {selectedProject.highlights.map(
                    (highlight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="h-2 w-2 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                        {highlight}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
