import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ExperienceEntry = {
  title: string;
  subtitle: string;
  timeline: string;
  description: string;
  highlights: string[];
};

const experience: ExperienceEntry[] = [
  {
    title: "React & TypeScript Developer",
    subtitle: "Hanin.tv (Korean Community Platform)",
    timeline: "2026",
    description:
      "Developed hanin.tv, a live web platform for the Korean community in the Philippines. It helps Korean nationals discover information about Koreans residing locally, organized across different categories. Built a React + TypeScript front end backed by a database.",
    highlights: [
      "Shipped a React + TypeScript front end for a live production site",
      "Backed content with a database-driven backend across categories",
      "Organized community information for Koreans residing in the Philippines",
    ],
  },
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
  // {
  //   title: "UI / UX Developer | Intern",
  //   subtitle: "PNP Inventory System",
  //   timeline: "Dec 2025 – March 2026",
  //   description:
  //     "Aligned system workflows with PNP operations and reporting. Implemented secure role-based access and audit tracking. Optimized inventory sync for faster police logistics updates.",
  //   highlights: [
  //     "Aligned system workflows with PNP operations and reporting",
  //     "Implemented secure role-based access and audit tracking",
  //     "Optimized inventory sync for faster police logistics updates",
  //   ],
  // },
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
  // {
  //   title: "UI THINK",
  //   subtitle: "UI Terminology & Standards Guide",
  //   timeline: "2026 release",
  //   description:
  //     "Maps major UI terminology and prerequisite design concepts. Shows sample patterns and when to use or avoid them. Connects standards-driven documentation with UI decisions. Adds Gemini AI guidance for smarter interface reviews.",
  //   highlights: [
  //     "Maps major UI terminology and prerequisite design concepts",
  //     "Shows sample patterns and when to use or avoid them",
  //     "Connects standards-driven documentation with UI decisions",
  //     "Adds Gemini AI guidance for smarter interface reviews",
  //   ],
  // },
];

export default function ExperienceSection() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<ExperienceEntry | null>(null);

  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selected]);

  return (
    <section
      id="experience"
      className="mx-auto max-w-6xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-clay-600">
          Where I've worked
        </p>
        <h2 className="mt-3 text-3xl font-bold text-stone-800 md:text-4xl">
          Experience
        </h2>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-clay-500" />
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {experience.map((entry) => (
          <div
            key={entry.subtitle}
            className="rounded-2xl border border-beige-200 bg-beige-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-clay-300 hover:shadow-md"
          >
            <h3 className="text-base font-bold text-stone-800">
              {entry.title}
            </h3>
            <p className="mt-1 text-sm font-semibold text-clay-700">
              {entry.subtitle}
            </p>
            <p className="mt-1 text-xs text-beige-600">{entry.timeline}</p>
            <p
              className="mt-3 overflow-hidden text-sm leading-relaxed text-stone-600"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {entry.description}
            </p>
            <button
              type="button"
              className="mt-3 text-xs font-semibold uppercase tracking-wider text-clay-600 transition-colors hover:text-clay-800"
              onClick={() => setSelected(entry)}
            >
              See more →
            </button>
          </div>
        ))}
      </div>

      {createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={(event) => {
                // Close only when the click lands on the overlay itself,
                // never when it bubbles up from inside the panel.
                if (event.target === event.currentTarget) setSelected(null);
              }}
              role="dialog"
              aria-modal="true"
              aria-label={`${selected.title} — ${selected.subtitle}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <motion.div
                className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-beige-300 bg-beige-50 p-8 shadow-2xl"
              initial={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, scale: 0.96 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 16, scale: 0.97 }
              }
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-bold text-stone-800">
                  {selected.title}
                </h3>
                <p className="text-lg font-semibold text-clay-700">
                  {selected.subtitle}
                </p>
                <p className="text-sm text-clay-600">{selected.timeline}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-2xl text-stone-400 hover:text-stone-700"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <p className="leading-relaxed text-stone-600">
              {selected.description}
            </p>
            <div className="mt-6">
              <h4 className="mb-3 font-semibold text-stone-800">
                Key Highlights:
              </h4>
              <ul className="space-y-2 text-stone-600">
                {selected.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}
