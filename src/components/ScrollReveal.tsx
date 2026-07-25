import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { spiralReveal, spiralViewport } from "./motion";

/**
 * Wraps a section in the "reverse spiral" scroll-reveal (see `spiralReveal` in
 * motion.ts). It re-fires every time the section re-enters the viewport, so the
 * effect plays on every scroll. Under `prefers-reduced-motion` it renders the
 * children plainly with no transform.
 */
export default function ScrollReveal({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      variants={spiralReveal}
      initial="hidden"
      whileInView="show"
      viewport={spiralViewport}
      style={{ transformOrigin: "center", willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}
