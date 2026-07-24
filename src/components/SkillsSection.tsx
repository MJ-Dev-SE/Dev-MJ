import { useState } from "react";

type TechStackGroup = {
  title: string;
  items: { name: string; icon: string }[];
};

const techStackGroups: TechStackGroup[] = [
  {
    title: "Web Technologies & Programming Languages",
    items: [
      {
        name: "HTML5",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      },
      {
        name: "CSS3",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      },
      {
        name: "JavaScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      },
      {
        name: "TypeScript",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        name: "PHP",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      },
    ],
  },
  {
    title: "Libraries & UI Frameworks",
    items: [
      {
        name: "React",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "React Native",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      },
      {
        name: "Bootstrap",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
      },
      {
        name: "Tailwind CSS",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        name: "Git",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      },
      {
        name: "VS Code",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      },
      {
        name: "Node.js",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      },
    ],
  },
  {
    title: "Database & Backend",
    items: [
      {
        name: "Laravel",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg",
      },
      {
        name: "MySQL",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      },
      {
        name: "Firebase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg",
      },
      {
        name: "Supabase",
        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg",
      },
    ],
  },
];

export default function SkillsSection() {
  const [activeGroup, setActiveGroup] = useState(0);
  const active = techStackGroups[activeGroup];

  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.4em] text-clay-600">
          Stack Snapshot
        </p>
        <h2 className="mt-3 text-3xl font-bold text-stone-800 md:text-4xl">
          Skills & Tools
        </h2>
        <div className="mx-auto mt-6 h-1 w-16 rounded-full bg-clay-500" />
      </div>

      <div className="mt-10 rounded-3xl border border-beige-200 bg-white/60 p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap justify-center gap-2">
          {techStackGroups.map((group, index) => (
            <button
              key={group.title}
              type="button"
              onClick={() => setActiveGroup(index)}
              className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                activeGroup === index
                  ? "border-clay-700 bg-clay-700 text-azure"
                  : "border-beige-300 text-stone-600 hover:border-clay-400 hover:text-clay-700"
              }`}
            >
              {group.title}
            </button>
          ))}
        </div>

        <div
          key={active.title}
          className="tech-stack-slide mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4"
        >
          {active.items.map((item) => (
            <div
              key={`${active.title}-${item.name}`}
              className="flex min-h-12 items-center gap-2 rounded-xl border border-beige-300 bg-beige-50 px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-clay-400 hover:shadow-sm"
            >
              <img
                src={item.icon}
                alt=""
                aria-hidden="true"
                className="h-6 w-6 shrink-0"
                loading="lazy"
              />
              <span className="text-xs font-medium text-stone-700">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
