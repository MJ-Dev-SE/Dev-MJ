import type { Variants } from "framer-motion";

// Shared scroll-reveal variants. Use `staggerContainer` on a grid/list wrapper
// and `staggerItem` on each child to get a cascading fade-up as it enters view.
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Whole-page transition used when switching routes.
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25, ease: "easeIn" } },
};

// Viewport config so reveals only fire once, slightly before fully in view.
export const revealViewport = { once: true, amount: 0.15 } as const;
