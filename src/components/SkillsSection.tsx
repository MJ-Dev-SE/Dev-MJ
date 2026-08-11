import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  staggerContainer,
  staggerItem,
  revealViewport,
  cardHover,
} from "./motion";

const ICON = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

type TechStackGroup = {
  title: string;
  note: string;
  items: { name: string; icon: string }[];
};

// Grouped by what the tools are actually for, not by vendor.
const techStackGroups: TechStackGroup[] = [
  {
    title: "Languages",
    note: "What I write day to day",
    items: [
      { name: "TypeScript", icon: `${ICON}/typescript/typescript-original.svg` },
      { name: "JavaScript", icon: `${ICON}/javascript/javascript-original.svg` },
      { name: "HTML5", icon: `${ICON}/html5/html5-original.svg` },
      { name: "CSS3", icon: `${ICON}/css3/css3-original.svg` },
      { name: "PHP", icon: `${ICON}/php/php-original.svg` },
    ],
  },
  {
    title: "Interfaces",
    note: "Web and mobile front ends",
    items: [
      { name: "React", icon: `${ICON}/react/react-original.svg` },
      { name: "React Native", icon: `${ICON}/react/react-original.svg` },
      { name: "Tailwind CSS", icon: `${ICON}/tailwindcss/tailwindcss-original.svg` },
      { name: "Bootstrap", icon: `${ICON}/bootstrap/bootstrap-original.svg` },
    ],
  },
  {
    title: "Data & backend",
    note: "Where the state lives",
    items: [
      { name: "Laravel", icon: `${ICON}/laravel/laravel-original.svg` },
      { name: "MySQL", icon: `${ICON}/mysql/mysql-original.svg` },
      { name: "Supabase", icon: `${ICON}/supabase/supabase-original.svg` },
      { name: "Firebase", icon: `${ICON}/firebase/firebase-plain.svg` },
    ],
  },
  {
    title: "Tooling",
    note: "How the work gets shipped",
    items: [
      { name: "Git", icon: `${ICON}/git/git-original.svg` },
      { name: "Node.js", icon: `${ICON}/nodejs/nodejs-original.svg` },
      { name: "VS Code", icon: `${ICON}/vscode/vscode-original.svg` },
    ],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Stack"
        title="Skills & tools"
        lead="Everything below is something I've shipped with, not just read about."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-12 grid gap-4 sm:grid-cols-2"
      >
        {techStackGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={staggerItem}
            {...cardHover}
            className="rounded-2xl border border-beige-200 bg-beige-50 p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
          >
            <h3 className="text-base font-semibold text-stone-900">
              {group.title}
            </h3>
            <p className="mt-1 text-xs text-stone-500">{group.note}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <motion.li
                  key={`${group.title}-${item.name}`}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="flex items-center gap-2 rounded-lg border border-beige-200 bg-white/70 px-3 py-1.5 transition-colors duration-200 hover:border-clay-300 hover:bg-white"
                >
                  <img
                    src={item.icon}
                    alt=""
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                    loading="lazy"
                  />
                  <span className="text-xs font-medium text-stone-700">
                    {item.name}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
