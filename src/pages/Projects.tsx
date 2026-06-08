import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import {
  staggerContainer,
  staggerItem,
  revealViewport,
} from "../components/motion";

export default function Projects() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/70 p-10 shadow-[0_30px_80px_rgba(2,6,23,0.9)]">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.4em] uppercase text-amber-300 mb-3">
            Featured Systems
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-slate-200 to-amber-200 bg-clip-text text-transparent">
            Portfolio of live work
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto mt-4">
            These prototypes span inventory tooling, augmented reality,
            AI-powered career management, and a planned basketball playbook
            system that ties plays, roles, and rhythm together.
          </p>
          <div className="mx-auto mt-6 h-1 w-1/2 rounded-full bg-gradient-to-r from-amber-500/40 via-amber-400 to-slate-800"></div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={staggerItem}>
            <ProjectCard
              title="Inventory Management System"
              description="Streamlines officer data intake by letting users upload datasets per PPO and station while preserving audit trails."
              tech={["React", "Supabase", "TypeScript"]}
              projectStatus="Done | Internship"
              timeline="MARCH 2026"
              highlights={[
                "Automated PPO visibility",
                "Role-aware dashboards",
                "Supabase edge functions",
              ]}
              link="https://pnp-github-io-zrx7.vercel.app/"
              ctaLabel="Visit inventory"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <ProjectCard
              title="EASYJOBAISTATUS"
              description="AI-powered job application tracker and career assistant that centralizes opportunities, analyzes skill fit, and generates personalized follow-up strategies."
              tech={[
                "React 19",
                "TypeScript",
                "Supabase",
                "Tailwind CSS",
                "Google Gemini",
              ]}
              projectStatus="In Progress"
              timeline="2026"
              highlights={[
                "Application status dashboard",
                "AI Fit Analyzer for skill gap detection",
                "Automated follow-up and company research",
              ]}
              link="https://easyjobastatus.vercel.app/login"
              ctaLabel="View EASYJOBAISTATUS"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <ProjectCard
              title="Augmented Reality Walkthrough"
              description="Two companion mobile apps that work together to place AR-ready furniture, complete with contextual tagging."
              tech={["React Native", "Unity", "ARCore"]}
              projectStatus="Maintenance"
              timeline="2025 release"
              highlights={[
                "Live Unity integration",
                "Offline-first asset sync",
                "Video guided experience",
              ]}
              links={[
                {
                  label: "App 1 Install Link",
                  url: "https://drive.google.com/file/d/1FoN_FoodLzIv6a19hDYl_QG_9AsGIYMX/view?usp=drive_link",
                },
                {
                  label: "App 2 Install Link",
                  url: "https://drive.google.com/file/d/1_uE9bPImyokTVMsd6j-ycoUD0GupBVJ_/view?usp=sharing",
                },
              ]}
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <ProjectCard
              title="UI THINK"
              description="A 2026 release UI guide that explains major UI terminology, sample patterns, when to apply or avoid them, and how standards-based documentation pairs with Gemini AI review."
              tech={["React", "TypeScript", "Tailwind CSS", "Gemini AI"]}
              projectStatus="Released"
              timeline="2026"
              highlights={[
                "Terminology reference for UI design systems",
                "Good vs bad UI usage with real examples",
                "Documentation-first standards approach",
                "AI-assisted guidance through Gemini",
              ]}
              link="https://ui-think.vercel.app/"
              ctaLabel="View UI THINK"
            />
          </motion.div>
          <motion.div variants={staggerItem}>
            <ProjectCard
              title="Basketball Playbook System"
              description="Web-based dashboard that catalogs plays, player roles, and rhythm for faster planning and rehearsals."
              tech={["React", "Tailwind", "Firebase"]}
              projectStatus="In Progress"
              timeline="Planning"
              highlights={[
                "Play sequencing interface",
                "Player role templates",
                "Tempo tracking",
              ]}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
