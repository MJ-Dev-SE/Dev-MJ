import ProjectCard from "../components/ProjectCard";

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
            and a planned basketball playbook system that ties plays, roles,
            and rhythm together.
          </p>
          <div className="mx-auto mt-6 h-1 w-1/2 rounded-full bg-gradient-to-r from-amber-500/40 via-amber-400 to-slate-800"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard
            title="Inventory Management System"
            description="Streamlines officer data intake by letting users upload datasets per PPO and station while preserving audit trails."
            tech={["React", "Supabase", "TypeScript"]}
            projectStatus="Live"
            timeline="Q1 2026"
            highlights={[
              "Automated PPO visibility",
              "Role-aware dashboards",
              "Supabase edge functions",
            ]}
            link="https://pnp-github-io-zrx7.vercel.app/"
            ctaLabel="Visit inventory"
          />

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
        </div>
      </div>
    </section>
  );
}
