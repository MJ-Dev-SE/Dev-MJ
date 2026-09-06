import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  staggerContainer,
  staggerItem,
  revealViewport,
  cardHover,
  buttonPress,
} from "./motion";

// Cards describe what a project *does*, never what it is built with — the
// stack already has its own section, so repeating it here just crowds the copy.
type Project = {
  title: string;
  description: string;
  projectStatus: "Live" | "In progress" | "Maintained" | "Planning";
  timeline: string;
  highlights: string[];
  link?: string;
  ctaLabel?: string;
  links?: { label: string; url: string }[];
  // Shown in place of a CTA when there is deliberately nothing to link to.
  note?: string;
  /**
   * A standing notice rendered on the card itself. For work that reports on
   * real people or public money, this is the line that keeps the entry from
   * reading as an accusation — so it is given its own readable block rather
   * than being tucked into `note`, which renders faint and small.
   */
  disclaimer?: string;
};

const projects: Project[] = [
  {
    title: "Hanin.tv",
    description:
      "A live directory for the Korean community in the Philippines — local businesses, services, and people, grouped into categories you can actually browse.",
    projectStatus: "Live",
    timeline: "2026",
    highlights: [
      "Category-based directory, built for browsing not searching",
      "Reads cleanly on the phones most visitors arrive with",
      "Running in production today",
    ],
    link: "https://www.hanin.tv/",
    ctaLabel: "Visit Hanin.tv",
  },
  // Swapped out for Budget Watch PH below. Kept so it can go back up quickly.
  // {
  //   title: "EASYJOBAISTATUS",
  //   description:
  //     "A job-application tracker that keeps every opportunity, its status, and the next follow-up in one place — with AI reading the gap between your résumé and the posting.",
  //   projectStatus: "Live",
  //   timeline: "2026",
  //   highlights: [
  //     "One dashboard for every application's status",
  //     "Fit analysis that names the missing skills",
  //     "Automated follow-up and company research",
  //   ],
  //   link: "https://easyjobastatus.vercel.app/",
  //   ctaLabel: "Open the tracker",
  // },
  {
    // Wording here is deliberately careful. The app reports on public spending,
    // so the copy describes what it *shows* and where the data came from, and
    // never asserts wrongdoing by anyone. Flags are described as computed
    // signals for review. The `disclaimer` below mirrors the app's own
    // presumption-of-innocence notice and must stay on the card.
    title: "Budget Watch PH",
    description:
      "One place to follow where the 2026 national budget goes and which projects it funds. Every figure keeps the published article it came from, and each project's status is worked out from those reported dates rather than asserted.",
    projectStatus: "Live",
    timeline: "2026",
    highlights: [
      "Status is computed from the record — allotted but nothing built reads as no progress, not as a verdict",
      "Procurement patterns worth a second look are surfaced for review, not labelled as wrongdoing",
      "Every project and person carries its sources and an as-of date, so any figure can be traced back",
    ],
    disclaimer:
      "A civic-education demo built from public reporting — not an official or legal record. Being named, charged, or investigated is not a finding of guilt; these matters are ongoing and everyone is presumed innocent.",
    link: "https://publicity-knows.vercel.app/",
    ctaLabel: "Open Budget Watch PH",
  },
  {
    title: "Basketball Playbook System",
    description:
      "A dashboard for cataloguing plays, player roles, and tempo, so a coach can plan a set — and adjust it — without redrawing the whole board.",
    projectStatus: "Planning",
    timeline: "2026",
    highlights: [
      "Play sequencing interface",
      "Reusable player-role templates",
      "Tempo tracking across a possession",
    ],
  },
];

const statusStyles: Record<Project["projectStatus"], string> = {
  Live: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "In progress": "border-clay-200 bg-clay-50 text-clay-700",
  Maintained: "border-beige-300 bg-beige-100 text-beige-800",
  Planning: "border-beige-300 bg-beige-100 text-stone-500",
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      {...cardHover}
      className="flex h-full flex-col rounded-2xl border border-beige-200 bg-beige-50 p-6 shadow-sm transition-shadow duration-200 hover:border-clay-300 hover:shadow-md"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${statusStyles[project.projectStatus]}`}
        >
          {project.projectStatus}
        </span>
        <span className="text-xs text-stone-400">{project.timeline}</span>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-stone-900">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-stone-600">
        {project.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {project.highlights.map((highlight) => (
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

      {project.disclaimer && (
        <p className="mt-5 flex items-start gap-2 rounded-lg border border-beige-300 bg-beige-100/70 px-3 py-2.5 text-[11px] leading-relaxed text-stone-500">
          <svg
            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-clay-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          {project.disclaimer}
        </p>
      )}

      <div className="mt-auto pt-5">
        {project.link && (
          <motion.a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            {...buttonPress}
            className="inline-flex rounded-lg bg-clay-700 px-4 py-2 text-sm font-semibold text-azure transition-colors hover:bg-clay-800"
          >
            {project.ctaLabel || "View live"}
          </motion.a>
        )}

        {project.links && (
          <div className="flex flex-wrap gap-2">
            {project.links.map((item) => (
              <motion.a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                {...buttonPress}
                className="inline-flex rounded-lg border border-beige-300 px-4 py-2 text-sm font-semibold text-stone-700 transition-colors hover:border-clay-400 hover:text-clay-700"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        )}

        {!project.link && !project.links && (
          <span className="text-xs text-stone-400">
            {project.note ?? "Link goes up once it's ready"}
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    // max-w-4xl to match ExperienceSection, which uses the same stacked
    // layout — a full 5xl line length is too wide to read comfortably.
    <section
      id="projects"
      className="mx-auto max-w-4xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        lead="Two live builds on the web — a community directory and a civic-education budget tracker — plus a playbook tool in planning. The mobile work gets its own section below."
      />

      {/* One card per row, like ExperienceSection.
          These three cards carry very different amounts of copy — Budget Watch
          PH has longer highlights and a disclaimer block — and every
          side-by-side layout handled that badly: a grid stretched the short
          card to match its neighbour and left it half empty, `items-start` left
          a hole beneath it, and CSS columns just moved the hole (balancing to
          one card beside two). Stacking sidesteps the whole problem: each card
          is its own height, nothing stretches, and there is no gap to fill.
          Full width also means less wrapping, so every card gets shorter. */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-12 space-y-4"
      >
        {projects.map((project) => (
          <motion.div key={project.title} variants={staggerItem}>
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
