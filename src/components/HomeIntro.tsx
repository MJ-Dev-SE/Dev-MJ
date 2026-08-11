import { motion, useReducedMotion } from "framer-motion";
import ProfileCard from "./ProfileCard";
import { introContainer, introItem, buttonPress } from "./motion";

const contactLinks = [
  { label: "markjerohm@gmail.com", href: "mailto:markjerohm@gmail.com" },
  { label: "0993 756 4973", href: "tel:+639937564973" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mark-jerohm-castro-68b3b03b7",
    external: true,
  },
];

const primaryButton =
  "rounded-lg bg-clay-700 px-5 py-2.5 text-sm font-semibold text-azure shadow-sm transition-colors hover:bg-clay-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2 focus-visible:ring-offset-beige-50";

const secondaryButton =
  "rounded-lg border border-beige-300 px-5 py-2.5 text-sm font-semibold text-stone-700 transition-colors hover:border-clay-400 hover:text-clay-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2 focus-visible:ring-offset-beige-50";

export default function HomeIntro() {
  const reduceMotion = useReducedMotion();

  const scrollToId = (target: string) => {
    document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="mx-auto flex min-h-[88vh] max-w-6xl scroll-mt-24 items-center px-6 py-24"
    >
      <div className="grid w-full gap-14 lg:grid-cols-[1.15fr,0.85fr] lg:items-center">
        <motion.div
          className="text-center lg:text-left"
          variants={reduceMotion ? undefined : introContainer}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "show"}
        >
          <motion.p
            variants={introItem}
            className="text-[11px] font-medium uppercase tracking-[0.35em] text-clay-600"
          >
            Web &amp; mobile developer
          </motion.p>

          <motion.h1
            variants={introItem}
            className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl md:text-6xl"
          >
            Mark Jerohm Castro
          </motion.h1>

          <motion.p
            variants={introItem}
            className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600 lg:mx-0"
          >
            I build web and mobile interfaces with React, TypeScript, and
            React Native — from a live community platform to an AR shopping
            app. My aim is always the same: something clear to use and simple
            enough that the next developer can pick it up.
          </motion.p>

          <motion.div
            variants={introItem}
            className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            <motion.button
              type="button"
              onClick={() => scrollToId("projects")}
              className={primaryButton}
              {...buttonPress}
            >
              View projects
            </motion.button>
            <motion.a
              href="/resume.pdf"
              download="Mark-Jerohm-Castro-CV.pdf"
              className={secondaryButton}
              {...buttonPress}
            >
              Download CV
            </motion.a>
            <motion.button
              type="button"
              onClick={() => scrollToId("contact")}
              className={secondaryButton}
              {...buttonPress}
            >
              Get in touch
            </motion.button>
          </motion.div>

          <motion.div
            variants={introItem}
            className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-stone-500 lg:justify-start"
          >
            {contactLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="relative transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-clay-500 after:transition-transform after:duration-200 hover:text-clay-700 hover:after:scale-x-100"
              >
                {item.label}
              </a>
            ))}
          </motion.div>

          <motion.div
            variants={introItem}
            className="mx-auto mt-10 max-w-xl rounded-2xl border border-beige-200 bg-beige-50 px-5 py-4 text-left shadow-sm transition-colors hover:border-clay-300 lg:mx-0"
          >
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-clay-600">
              <span
                className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500 motion-reduce:animate-none"
                aria-hidden="true"
              />
              Working on now
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              A basketball playbook tool — mapping plays, player roles, and
              tempo so a coach can adjust a set between possessions instead of
              between games.
            </p>
          </motion.div>
        </motion.div>

        <ProfileCard />
      </div>
    </section>
  );
}
