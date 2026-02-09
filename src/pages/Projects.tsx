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
          description="This system reduces manual work and lengthy processes such as contacting for data. Users can simply upload their data to their specific PPO and station."
          tech={["React", "Supabase", "TypeScript"]}
          link="https://pnp-github-io-zrx7.vercel.app/"
        />

        <ProjectCard
          title="Augmented Reality System Walkthrough"
          description="This system allows users to express reasoning and solve problems by visualizing furniture in true-to-size in real space."
          tech={["React Native", "Unity", "ARCore"]}
          link="https://yourportfolio.com"
        />
      </div>
    </section>
  );
}
