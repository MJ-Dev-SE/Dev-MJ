import HomeIntro from "../components/HomeIntro";
import AboutSection from "../components/AboutSection";
import SkillsSection from "../components/SkillsSection";
import ExperienceSection from "../components/ExperienceSection";
import ProjectsSection from "../components/ProjectsSection";
import CertificationsSection from "../components/CertificationsSection";
import ContactSection from "../components/ContactSection";
import ScrollReveal from "../components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal>
        <HomeIntro />
      </ScrollReveal>
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal>
        <SkillsSection />
      </ScrollReveal>
      <ScrollReveal>
        <ExperienceSection />
      </ScrollReveal>
      <ScrollReveal>
        <ProjectsSection />
      </ScrollReveal>
      <ScrollReveal>
        <CertificationsSection />
      </ScrollReveal>
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>
    </>
  );
}
