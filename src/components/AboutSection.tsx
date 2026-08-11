import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import {
  staggerContainer,
  staggerItem,
  revealViewport,
  cardHover,
} from "./motion";

const facts = [
  { label: "Based in", value: "Manila, Philippines" },
  { label: "Focus", value: "Web & mobile development" },
  { label: "Status", value: "Open to projects" },
];

const strengths = [
  {
    title: "Front end first",
    body: "React and TypeScript are where I spend most of my time — component structure, state that stays predictable, and layouts that hold up on a phone.",
  },
  {
    title: "Comfortable across the stack",
    body: "When a feature needs it I go past the UI: Laravel, MySQL, Supabase, and Firebase for the data side, React Native and Unity for mobile and AR.",
  },
  {
    title: "Built to be handed over",
    body: "I document as I go and keep the structure obvious, so the work survives after I've moved on to the next thing.",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="About"
        title="How I work"
        lead="I'm a developer from Manila who likes turning a vague brief into something concrete and shippable — then keeping it easy to change."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-12 grid gap-4 md:grid-cols-3"
      >
        {strengths.map((item) => (
          <motion.div
            key={item.title}
            variants={staggerItem}
            {...cardHover}
            className="rounded-2xl border border-beige-200 bg-beige-50 p-6 shadow-sm transition-shadow duration-200 hover:border-clay-300 hover:shadow-md"
          >
            <h3 className="text-base font-semibold text-stone-900">
              {item.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">
              {item.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.dl
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-4 grid gap-4 sm:grid-cols-3"
      >
        {facts.map((item) => (
          <motion.div
            key={item.label}
            variants={staggerItem}
            className="rounded-2xl border border-beige-200 bg-white/60 px-5 py-4 text-center transition-colors duration-200 hover:border-clay-300"
          >
            <dt className="text-[10px] font-medium uppercase tracking-[0.3em] text-clay-600">
              {item.label}
            </dt>
            <dd className="mt-1.5 text-sm font-semibold text-stone-800">
              {item.value}
            </dd>
          </motion.div>
        ))}
      </motion.dl>
    </section>
  );
}
