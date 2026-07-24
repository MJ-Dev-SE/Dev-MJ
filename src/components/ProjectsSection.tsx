import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useInView,
} from "framer-motion";
import ProjectCard from "./ProjectCard";
import { staggerContainer, staggerItem, revealViewport } from "./motion";

// --- Carousel geometry (tune these to taste) ------------------------------
// The cards sit on the surface of a vertical 3D cylinder. PERSPECTIVE controls
// how strong the 3D depth feels; RADIUS controls how far the side cards recede.
const PERSPECTIVE = 1800;
const RADIUS = 360;
const SPIN_SPEED = 16; // degrees per second for the idle auto-rotate
const START_DELAY = 2000; // ms before auto-rotate kicks in

type Project = {
  title: string;
  description: string;
  tech: string[];
  projectStatus: string;
  timeline: string;
  highlights: string[];
  cover: string; // tailwind gradient classes for the card's header band
  link?: string;
  ctaLabel?: string;
  links?: { label: string; url: string }[];
};

const projects: Project[] = [
  {
    title: "Inventory Management System",
    description:
      "Streamlines officer data intake by letting users upload datasets per PPO and station while preserving audit trails.",
    tech: ["React", "Supabase", "TypeScript"],
    projectStatus: "Done | Internship",
    timeline: "MARCH 2026",
    highlights: [
      "Automated PPO visibility",
      "Role-aware dashboards",
      "Supabase edge functions",
    ],
    cover: "from-clay-600 to-clay-800",
    link: "https://pnp-github-io-zrx7.vercel.app/",
    ctaLabel: "Visit inventory",
  },
  {
    title: "EASYJOBAISTATUS",
    description:
      "AI-powered job application tracker and career assistant that centralizes opportunities, analyzes skill fit, and generates personalized follow-up strategies.",
    tech: ["React 19", "TypeScript", "Supabase", "Tailwind CSS", "Google Gemini"],
    projectStatus: "In Progress",
    timeline: "2026",
    highlights: [
      "Application status dashboard",
      "AI Fit Analyzer for skill gap detection",
      "Automated follow-up and company research",
    ],
    cover: "from-beige-800 to-beige-900",
    link: "https://easyjobastatus.vercel.app/login",
    ctaLabel: "View EASYJOBAISTATUS",
  },
  {
    title: "Augmented Reality Walkthrough",
    description:
      "Two companion mobile apps that work together to place AR-ready furniture, complete with contextual tagging.",
    tech: ["React Native", "Unity", "ARCore"],
    projectStatus: "Maintenance",
    timeline: "2025 release",
    highlights: [
      "Live Unity integration",
      "Offline-first asset sync",
      "Video guided experience",
    ],
    cover: "from-clay-600 to-clay-800",
    links: [
      {
        label: "App 1 Install Link",
        url: "https://drive.google.com/file/d/1FoN_FoodLzIv6a19hDYl_QG_9AsGIYMX/view?usp=drive_link",
      },
      {
        label: "App 2 Install Link",
        url: "https://drive.google.com/file/d/1_uE9bPImyokTVMsd6j-ycoUD0GupBVJ_/view?usp=sharing",
      },
    ],
  },
  {
    title: "UI THINK",
    description:
      "A 2026 release UI guide that explains major UI terminology, sample patterns, when to apply or avoid them, and how standards-based documentation pairs with Gemini AI review.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Gemini AI"],
    projectStatus: "Released",
    timeline: "2026",
    highlights: [
      "Terminology reference for UI design systems",
      "Good vs bad UI usage with real examples",
      "Documentation-first standards approach",
      "AI-assisted guidance through Gemini",
    ],
    cover: "from-clay-700 to-beige-900",
    link: "https://ui-think.vercel.app/",
    ctaLabel: "View UI THINK",
  },
  {
    title: "Basketball Playbook System",
    description:
      "Web-based dashboard that catalogs plays, player roles, and rhythm for faster planning and rehearsals.",
    tech: ["React", "Tailwind", "Firebase"],
    projectStatus: "In Progress",
    timeline: "Planning",
    highlights: [
      "Play sequencing interface",
      "Player role templates",
      "Tempo tracking",
    ],
    cover: "from-clay-600 to-beige-800",
  },
];

const COUNT = projects.length;
const STEP = 360 / COUNT;

function SectionHeading() {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-clay-600">
        Featured Systems
      </p>
      <h2 className="mt-3 text-3xl font-bold text-stone-800 md:text-4xl">
        Portfolio of live work
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-lg text-stone-600">
        These prototypes span inventory tooling, augmented reality, AI-powered
        career management, and a planned basketball playbook system that ties
        plays, roles, and rhythm together.
      </p>
      <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-clay-500" />
    </div>
  );
}

function CardFace({ project }: { project: Project }) {
  return (
    <article className="flex h-[440px] w-[300px] flex-col overflow-hidden rounded-3xl border border-beige-200 bg-beige-50 shadow-[0_24px_50px_rgba(107,86,56,0.25)] sm:w-[340px]">
      <div
        className={`relative flex h-28 items-end bg-gradient-to-br ${project.cover} p-5`}
      >
        <span className="rounded-full bg-beige-50 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-clay-800">
          {project.projectStatus}
        </span>
        <span className="absolute right-5 top-4 text-[0.6rem] uppercase tracking-[0.3em] text-beige-100">
          {project.timeline}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold text-stone-800">{project.title}</h3>
        <p
          className="mt-2 overflow-hidden text-sm leading-relaxed text-stone-600"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
          }}
        >
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 4).map((item) => (
            <span
              key={item}
              className="rounded-full border border-beige-300 bg-white px-2.5 py-1 text-[0.65rem] text-beige-800"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-clay-700 px-4 py-2 text-sm font-semibold text-azure transition-colors hover:bg-clay-800"
            >
              {project.ctaLabel || "View live"}
            </a>
          )}
          {project.links && (
            <div className="flex flex-wrap gap-2">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-clay-400 px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-clay-700 transition-colors hover:bg-clay-700 hover:text-azure"
                >
                  {l.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectGrid() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
    >
      {projects.map((project) => (
        <motion.div key={project.title} variants={staggerItem}>
          <ProjectCard
            title={project.title}
            description={project.description}
            tech={project.tech}
            projectStatus={project.projectStatus}
            timeline={project.timeline}
            highlights={project.highlights}
            link={project.link}
            ctaLabel={project.ctaLabel}
            links={project.links}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function ProjectsSection() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const [started, setStarted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const rotateY = useMotionValue(0);

  // Kick off the idle spin ~2s after the carousel scrolls into view.
  useEffect(() => {
    if (!inView || started) return;
    const timer = setTimeout(() => setStarted(true), START_DELAY);
    return () => clearTimeout(timer);
  }, [inView, started]);

  // Continuous auto-rotate: runs while in view and not paused by hover.
  // It is independent of scroll, so scrolling the page never stops it.
  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (started && inView && !hovered) {
        rotateY.set(rotateY.get() - SPIN_SPEED * dt);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion, started, inView, hovered, rotateY]);

  useMotionValueEvent(rotateY, "change", (value) => {
    const idx = ((Math.round(-value / STEP) % COUNT) + COUNT) % COUNT;
    setActiveIndex(idx);
  });

  // Reduced-motion / accessibility fallback: a plain, readable grid.
  if (reduceMotion) {
    return (
      <section
        id="projects"
        className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:py-28"
      >
        <SectionHeading />
        <ProjectGrid />
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="mx-auto max-w-7xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading />

      <div
        className="mt-10 flex justify-center"
        style={{ perspective: PERSPECTIVE }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative flex h-[480px] w-full items-center justify-center">
          <motion.div
            className="relative h-[440px] w-[300px] sm:w-[340px]"
            style={{ rotateY, transformStyle: "preserve-3d" }}
          >
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="absolute inset-0 flex items-center justify-center [backface-visibility:hidden]"
                style={{
                  transform: `rotateY(${index * STEP}deg) translateZ(${RADIUS}px)`,
                }}
              >
                <CardFace project={project} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {projects.map((project, index) => (
          <span
            key={project.title}
            className={`h-2 rounded-full transition-all duration-300 ${
              activeIndex === index ? "w-8 bg-clay-600" : "w-2 bg-beige-400"
            }`}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs uppercase tracking-[0.3em] text-stone-500">
        Auto-rotating · hover to pause
      </p>
    </section>
  );
}
