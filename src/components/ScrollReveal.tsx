import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { sectionReveal, revealViewport } from "./motion";

/**
 * Wraps a section in a short fade-up as it first enters the viewport (see
 * `sectionReveal` in motion.ts). Fires once per section — content that
 * re-animates every time you scroll past it is distracting to read.
 * Under `prefers-reduced-motion` it renders the children plainly.
 */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      variants={sectionReveal}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
    >
      {children}
    </motion.div>
  );
}
