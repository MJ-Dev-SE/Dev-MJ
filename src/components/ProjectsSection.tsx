import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  staggerContainer,
  staggerItem,
  revealViewport,
  cardHover,
  buttonPress,
} from "./motion";

type Project = {
  title: string;
  description: string;
  tech: string[];
  projectStatus: "Live" | "In progress" | "Maintained" | "Planning";
  timeline: string;
  highlights: string[];
  link?: string;
  ctaLabel?: string;
  links?: { label: string; url: string }[];
};

const projects: Project[] = [
  {
    title: "Hanin.tv",
    description:
      "A live directory for the Korean community in the Philippines — local businesses, services, and people, grouped into categories you can actually browse.",
    tech: ["React", "TypeScript", "Database"],
    projectStatus: "Live",
    timeline: "2026",
    highlights: [
      "Category-based directory, built for browsing not searching",
      "React + TypeScript front end on a database-driven backend",
      "Running in production today",
    ],
    link: "https://www.hanin.tv/",
    ctaLabel: "Visit Hanin.tv",
  },
  {
    title: "EASYJOBAISTATUS",
    description:
      "A job-application tracker that keeps every opportunity, its status, and the next follow-up in one place — with AI reading the gap between your résumé and the posting.",
    tech: ["React 19", "TypeScript", "Supabase", "Tailwind CSS", "Gemini"],
    projectStatus: "In progress",
    timeline: "2026",
    highlights: [
      "One dashboard for every application's status",
      "Fit analysis that names the missing skills",
      "Automated follow-up and company research",
    ],
  },
  {
    title: "Augmented Reality Walkthrough",
    description:
      "Two companion mobile apps that place AR-ready furniture in a real room, with contextual tagging and a guided video walkthrough.",
    tech: ["React Native", "Unity", "ARCore"],
    projectStatus: "Maintained",
    timeline: "2025",
    highlights: [
      "Live Unity scene embedded in React Native",
      "Offline-first asset sync",
      "Guided video walkthrough for first-time users",
    ],
    links: [
      {
        label: "App 1",
        url: "https://drive.google.com/file/d/1FoN_FoodLzIv6a19hDYl_QG_9AsGIYMX/view?usp=drive_link",
      },
      {
        label: "App 2",
        url: "https://drive.google.com/file/d/1_uE9bPImyokTVMsd6j-ycoUD0GupBVJ_/view?usp=sharing",
      },
    ],
  },
  {
    title: "Basketball Playbook System",
    description:
      "A dashboard for cataloguing plays, player roles, and tempo, so a coach can plan a set — and adjust it — without redrawing the whole board.",
    tech: ["React", "Tailwind CSS", "Firebase"],
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

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {project.tech.map((item) => (
          <li
            key={item}
            className="rounded-md border border-beige-200 bg-white/70 px-2 py-1 text-[11px] text-stone-600"
          >
            {item}
          </li>
        ))}
      </ul>

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
            Link goes up once it's ready
          </span>
        )}
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Projects"
        title="Selected work"
        lead="A live community platform, an AI-assisted job tracker, an AR shopping build, and a playbook tool in planning."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-12 grid gap-4 md:grid-cols-2"
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
