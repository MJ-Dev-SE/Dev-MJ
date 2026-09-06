import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  staggerContainer,
  staggerItem,
  revealViewport,
  cardHover,
} from "./motion";

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
    subtitle: "Hanin.tv — Korean community platform",
    timeline: "2026",
    description:
      "Built and shipped hanin.tv, a live directory for the Korean community in the Philippines. Korean nationals use it to find local businesses, services, and people, sorted into categories.",
    highlights: [
      "Shipped a React + TypeScript front end to production",
      "Wired the pages to a database-driven backend, category by category",
      "Kept the directory readable on the phones most visitors arrive with",
    ],
  },
  {
    title: "React Developer — personal project",
    subtitle: "EASYJOBAISTATUS",
    timeline: "2026",
    description:
      "A job-application tracker that answers one question: where does each application actually stand? Progress views, alerts, and timeline summaries in one dashboard.",
    highlights: [
      "Status dashboard covering every application in one view",
      "AI fit analysis that flags the gaps between a résumé and a posting",
      "Follow-up prompts so nothing goes quiet for two weeks",
    ],
  },
  {
    title: "Mobile Developer — thesis",
    subtitle: "ShopFur — augmented reality shopping",
    timeline: "Jan 2025 – Dec 2025",
    description:
      "A React Native shopping app with Unity AR built in, so shoppers could place furniture in their own room before buying it.",
    highlights: [
      "Integrated a Unity AR scene into a React Native app",
      "Built the product preview flow end to end",
      "Stabilised the AR session so placement survived a lost tracking frame",
    ],
  },
];

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Experience"
        title="What I've shipped"
        // lead="Three projects, from a live production site to an AR thesis build."
      />

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-12 space-y-4"
      >
        {experience.map((entry) => (
          <motion.li
            key={entry.subtitle}
            variants={staggerItem}
            {...cardHover}
            className="rounded-2xl border border-beige-200 bg-beige-50 p-6 shadow-sm transition-shadow duration-200 hover:border-clay-300 hover:shadow-md md:p-7"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-semibold tracking-tight text-stone-900">
                {entry.title}
              </h3>
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
                {entry.timeline}
              </span>
            </div>

            <p className="mt-1 text-sm font-semibold text-clay-700">
              {entry.subtitle}
            </p>

            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {entry.description}
            </p>

            <ul className="mt-4 space-y-2 border-t border-beige-200 pt-4">
              {entry.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2.5 text-sm text-stone-600"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay-500"
                    aria-hidden="true"
                  />
                  {highlight}
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
