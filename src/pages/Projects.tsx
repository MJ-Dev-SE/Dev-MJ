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
          description="A comprehensive system for tracking stocks, users, and logs with real-time updates and analytics dashboard."
          tech={["React", "Supabase", "TypeScript"]}
          link="https://pnp-github-io-zrx7.vercel.app/"
        />

        <ProjectCard
          title="Augmented Reality System Walkthrough"
          description="An immersive interactive walkthrough of an augmented reality system built for educational purposes."
          tech={["React Native", "Unity", "ARCore"]}
          link="https://yourportfolio.com"
        />

        <ProjectCard
          title="E-Commerce Platform"
          description="Full-stack e-commerce solution with user authentication, payment integration, and admin dashboard."
          tech={["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"]}
          link="https://github.com/yourusername/ecommerce-platform"
        />

        <ProjectCard
          title="Task Management App"
          description="A collaborative task management application with real-time updates and team collaboration features."
          tech={["React", "TypeScript", "Firebase", "NoSQL"]}
          link="https://github.com/yourusername/task-manager"
        />

        <ProjectCard
          title="API Gateway Service"
          description="Scalable API gateway built with Node.js for microservices architecture, including rate limiting and authentication."
          tech={["Node.js", "Express", "Redis", "JWT"]}
          link="https://github.com/yourusername/api-gateway"
        />

        <ProjectCard
          title="Database Migration Tool"
          description="Automated database migration and setup tool supporting multiple SQL and NoSQL databases with version control."
          tech={["Python", "SQL", "MongoDB", "PostgreSQL", "Git"]}
          link="https://github.com/yourusername/db-migration-tool"
        />

        <ProjectCard
          title="Portfolio Website"
          description="Modern responsive portfolio website built with React and TypeScript, featuring smooth animations and dark mode."
          tech={["React", "TypeScript", "Tailwind CSS", "Framer Motion"]}
          link="#"
        />

        <ProjectCard
          title="CI/CD Pipeline Setup"
          description="Complete DevOps setup with automated testing, deployment, and monitoring for full-stack applications."
          tech={["GitHub Actions", "Docker", "AWS", "Jenkins"]}
          link="https://github.com/yourusername/cicd-pipeline"
        />
      </div>
    </section>
  );
}
