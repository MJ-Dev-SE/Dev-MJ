import { useEffect, useMemo, useRef, useState } from "react";
import ProfileCard from "./ProfileCard";

export default function HomeIntro() {
  const roles = useMemo(
    () => [
      "React Developer",
      "Mobile Developer",
      "Web Designer",
      "Front-End Developer",
      "Full-Stack Developer",
    ],
    [],
  );
  const [typedRole, setTypedRole] = useState("");
  const roleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const roleIndexRef = useRef(0);
  const roleCharIndexRef = useRef(0);
  const isRoleTypingRef = useRef(true);

  useEffect(() => {
    roleTimerRef.current = setInterval(() => {
      const currentRole = roles[roleIndexRef.current];

      if (isRoleTypingRef.current) {
        if (roleCharIndexRef.current < currentRole.length) {
          roleCharIndexRef.current += 1;
          setTypedRole(currentRole.slice(0, roleCharIndexRef.current));
        } else {
          isRoleTypingRef.current = false;
        }
      } else if (roleCharIndexRef.current > 0) {
        roleCharIndexRef.current -= 1;
        setTypedRole(currentRole.slice(0, roleCharIndexRef.current));
      } else {
        isRoleTypingRef.current = true;
        roleIndexRef.current = (roleIndexRef.current + 1) % roles.length;
      }
    }, 90);

    return () => {
      if (roleTimerRef.current) clearInterval(roleTimerRef.current);
    };
  }, [roles]);

  const scrollToId = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[90vh] scroll-mt-24 items-center px-6 py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-10 -top-16 h-72 w-72 rounded-full bg-beige-300/40 blur-[140px]" />
        <div className="absolute -bottom-10 left-4 h-64 w-64 rounded-full bg-beige-400/30 blur-[120px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl gap-14 lg:grid-cols-[1.2fr,0.8fr] lg:items-center">
        <div className="space-y-8 text-center lg:text-left">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-clay-600">
              Portfolio
            </p>
            <h1 className="mt-4 break-words text-4xl font-bold text-stone-800 sm:text-5xl md:text-6xl">
              Mark Jerohm Castro
            </h1>
            <p className="mt-3 min-h-[40px] text-xl text-beige-700 sm:text-2xl">
              {typedRole}
              <span className="animate-pulse">|</span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-600 lg:justify-start">
            <a
              href="tel:+639937564973"
              className="transition-colors hover:text-beige-700"
            >
              0993 756 4973
            </a>
            <a
              href="mailto:markjerohm@gmail.com"
              className="transition-colors hover:text-beige-700"
            >
              markjerohm@gmail.com
            </a>
            <a
              href="/resume.pdf"
              download="Mark-Jerohm-Castro-CV.pdf"
              className="font-semibold text-beige-700 transition-colors hover:text-beige-800"
            >
              Download CV
            </a>
            <a
              href="https://www.linkedin.com/in/mark-jerohm-castro-68b3b03b7"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-beige-700 transition-colors hover:text-beige-800"
            >
              LinkedIn
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <button
              type="button"
              onClick={() => scrollToId("projects")}
              className="rounded-lg bg-clay-700 px-6 py-3 font-semibold text-azure shadow-sm transition-colors hover:bg-clay-800"
            >
              View Projects
            </button>
            <button
              type="button"
              onClick={() => scrollToId("contact")}
              className="rounded-lg border border-clay-300 px-6 py-3 font-semibold text-stone-700 transition-colors hover:border-clay-600 hover:text-clay-700"
            >
              Contact Me
            </button>
          </div>

          <div className="mx-auto max-w-xl rounded-2xl border-l-4 border-clay-400 bg-beige-50/80 px-6 py-4 text-left text-sm leading-relaxed text-stone-600 shadow-sm lg:mx-0">
            <p className="font-semibold text-stone-800">Current focus</p>
            <p>
              Refining a basketball playbook tool—mapping plays, player
              roles, and tempo so adjustments stay quick and repeatable.
            </p>
          </div>
        </div>

        <ProfileCard />
      </div>
    </section>
  );
}
