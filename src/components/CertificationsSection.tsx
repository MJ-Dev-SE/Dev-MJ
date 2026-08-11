import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  staggerContainer,
  staggerItem,
  cardHover,
  buttonPress,
} from "./motion";

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
    issuer: "SimpliLearn",
    date: "2024",
    brief:
      "Git workflow from the ground up — commits, branching, merging, and collaborating without stepping on someone else's work.",
    filePath: "/certifications/GIT-TRAINING.pdf",
  },
  {
    title: "Introduction to jQuery",
    issuer: "SimpliLearn",
    date: "2024",
    brief:
      "DOM manipulation and event-driven UI behaviour — the groundwork behind how modern frameworks handle the same problems.",
    filePath: "/certifications/JQUERY.pdf",
  },
  {
    title: "JavaScript for Beginners",
    issuer: "SimpliLearn",
    date: "2024",
    brief:
      "Core JavaScript: variables, functions, scope, and control flow.",
    filePath: "/certifications/JSBEGINNERS.pdf",
  },
  {
    title: "JavaScript Projects",
    issuer: "Great Learning Academy",
    date: "2024",
    brief:
      "Applying the fundamentals in small, self-contained builds rather than isolated exercises.",
    filePath: "/certifications/GreatLearning.pdf",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "2026",
    brief:
      "Responsive layout, accessibility basics, and modern CSS — the certification behind how every page here is built.",
    link: "https://freecodecamp.org/certification/mark-jerohm-castro/responsive-web-design",
  },
];

const aiCertifications: Certification[] = [
  {
    title: "Security, Compliance & Governance for AI Solutions",
    issuer: "Amazon Web Services",
    date: "2026",
    brief:
      "How to put an AI system into production responsibly: securing it, meeting compliance requirements, and governing what it's allowed to do.",
    filePath: "/certifications/AWS-UPSKILL.pdf",
  },
  {
    title: "Get Started with Databricks for Generative AI",
    issuer: "Databricks",
    date: "2026",
    brief:
      "The Databricks platform and its tooling for building and deploying generative AI workflows.",
    filePath: "/certifications/databricks.pdf",
  },
  {
    title: "Introduction to Responsible AI",
    issuer: "Google Cloud",
    date: "2026",
    brief:
      "Responsible AI principles and the ethical questions worth asking before a model ships.",
    filePath: "/certifications/google.pdf",
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "The Claude product family and when each one fits — Claude Code, the Desktop modes (Chat, Cowork, Code), and the Slack, Excel, PowerPoint, and Chrome integrations — plus creating, sharing, and troubleshooting artifacts.",
    filePath: "/certifications/CLAUDE-101.pdf",
  },
  {
    title: "Claude Code 101",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "How coding agents differ from chat-based AI: setting up Claude Code across environments, managing context, and extending it with subagents, hooks, and MCP servers.",
    filePath: "/certifications/claude-code-101.pdf",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "Applying Claude Code to harder engineering work — hooks that guard a codebase, custom integrations that extend a workflow, and automation that stays context-aware.",
    filePath: "/certifications/CLAUDE-CODE-IN-ACTION.pdf",
  },
  {
    title: "AI Fluency: Capabilities & Limitations",
    issuer: "Anthropic",
    date: "2026",
    brief:
      "Diagnosing why an AI answer went wrong, using AI to produce rather than to consume, and placing the instructions that matter where the model will actually act on them.",
    filePath: "/certifications/AI-FLUENCY-CAPABILITIES-LIMITATIONS.pdf",
  },
];

type CertificationType = "fundamental" | "ai";

const tabs: { id: CertificationType; label: string; items: Certification[] }[] = [
  { id: "fundamental", label: "Fundamentals", items: fundamentalCertifications },
  { id: "ai", label: "AI & cloud", items: aiCertifications },
];

function CertificationCard({
  certification,
  onPreview,
}: {
  certification: Certification;
  onPreview: (certification: Certification) => void;
}) {
  return (
    <motion.article
      {...cardHover}
      className="flex h-full flex-col rounded-2xl border border-beige-200 bg-beige-50 p-6 shadow-sm transition-shadow duration-200 hover:border-clay-300 hover:shadow-md"
    >
      <h3 className="text-base font-semibold tracking-tight text-stone-900">
        {certification.title}
      </h3>
      <p className="mt-1 text-xs text-stone-500">
        {certification.issuer} · {certification.date}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-stone-600">
        {certification.brief}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {certification.filePath && (
          <>
            <motion.button
              type="button"
              onClick={() => onPreview(certification)}
              {...buttonPress}
              className="rounded-lg bg-clay-700 px-4 py-2 text-sm font-semibold text-azure transition-colors hover:bg-clay-800"
            >
              Preview
            </motion.button>
            <motion.a
              href={certification.filePath}
              target="_blank"
              rel="noopener noreferrer"
              {...buttonPress}
              className="rounded-lg border border-beige-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-clay-400 hover:text-clay-700"
            >
              Open PDF
            </motion.a>
          </>
        )}
        {certification.link && (
          <motion.a
            href={certification.link}
            target="_blank"
            rel="noopener noreferrer"
            {...buttonPress}
            className="rounded-lg bg-clay-700 px-4 py-2 text-sm font-semibold text-azure transition-colors hover:bg-clay-800"
          >
            View certificate
          </motion.a>
        )}
      </div>
    </motion.article>
  );
}

export default function CertificationsSection() {
  const reduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<CertificationType>("fundamental");
  const [preview, setPreview] = useState<Certification | null>(null);

  // Close on Escape and lock body scroll while the preview is open.
  useEffect(() => {
    if (!preview) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPreview(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [preview]);

  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  return (
    <section
      id="certifications"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Credentials"
        title="Certifications"
        lead="Twelve certificates across web fundamentals, cloud, and AI tooling — each one tied to something I went on to use."
      />

      <div
        className="mt-10 flex justify-center gap-1 rounded-xl border border-beige-200 bg-beige-50 p-1 sm:mx-auto sm:w-fit"
        role="tablist"
        aria-label="Certification categories"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.id)}
              className="relative rounded-lg px-5 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400"
            >
              {/* The filled pill slides between tabs instead of blinking. */}
              {isActive && (
                <motion.span
                  layoutId="cert-tab-pill"
                  className="absolute inset-0 rounded-lg bg-clay-700"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 32 }
                  }
                />
              )}
              <span
                className={`relative ${isActive ? "text-azure" : "text-stone-600"}`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-70">
                  {tab.items.length}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Keyed on the tab so switching remounts the list and replays the
          stagger. Deliberately NOT wrapped in `AnimatePresence mode="wait"`:
          that makes the incoming panel wait on the outgoing one's exit
          animation, so the list is empty until an animation frame lands. */}
      <motion.div
        key={activeTab}
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="mt-8 grid gap-4 md:grid-cols-2"
      >
        {active.items.map((certification) => (
          <motion.div
            key={`${certification.title}-${certification.date}`}
            variants={staggerItem}
          >
            <CertificationCard
              certification={certification}
              onPreview={setPreview}
            />
          </motion.div>
        ))}
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {preview?.filePath && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-label={`${preview.title} preview`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setPreview(null);
              }}
            >
              <motion.div
                className="flex h-[82vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-beige-200 bg-beige-50 shadow-2xl"
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }
                }
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="flex items-center justify-between gap-4 border-b border-beige-200 px-5 py-3">
                  <p className="truncate text-sm font-medium text-stone-700">
                    {preview.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="rounded-md px-2 py-1 text-xl leading-none text-stone-400 transition-colors hover:text-stone-700"
                    aria-label="Close preview"
                  >
                    ×
                  </button>
                </div>
                <iframe
                  src={preview.filePath}
                  title={`${preview.title} preview`}
                  className="flex-1 border-0"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
