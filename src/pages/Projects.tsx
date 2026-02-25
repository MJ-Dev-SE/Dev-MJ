import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A showcase of my work spanning web development, mobile apps, and
          backend systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard
          title="Inventory Management System"
          description="This system reduces manual work and lengthy processes such as contacting for data. Users can simply upload their data to their specific PPO and station. Some of the data it contains are mock data used for testing purposes."
          tech={["React", "Supabase", "TypeScript"]}
          link="https://pnp-github-io-zrx7.vercel.app/"
        />

        <ProjectCard
          title="Augmented Reality System - Video Walkthrough"
          description="This project has two connected mobile apps that work at the same time. Use the links below to install both apps and explore the full AR furniture experience."
          tech={["React Native", "Unity", "ARCore"]}
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
      </div>
    </section>
  );
}
