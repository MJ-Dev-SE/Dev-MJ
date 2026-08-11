import type { Variants } from "framer-motion";

// Easing used everywhere: a soft decelerate, nothing springy.
const EASE = [0.16, 1, 0.3, 1] as const;

// Shared scroll-reveal variants. Use `staggerContainer` on a grid/list wrapper
// and `staggerItem` on each child to get a cascading fade-up as it enters view.
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE },
  },
};

// Whole-page transition used when switching routes.
export const pageTransition: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

// One-shot entrance played once after the loading screen finishes. A plain
// fade-up — no scale/zoom, which read as a "camera move" and fought the
// minimalist direction.
export const pageEntrance: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

// Section scroll reveal: a short fade-up, and only the first time a section
// comes into view. (This replaced a "reverse spiral" rotate+scale reveal that
// replayed on every scroll — too busy, and the rotation pushed content past
// the viewport edge.)
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE },
  },
};

// Viewport config so reveals only fire once, slightly before fully in view.
export const revealViewport = { once: true, amount: 0.15 } as const;

// --- Interaction motion ----------------------------------------------------
// Short, consistent timings so hover/press feel the same everywhere. Anything
// the user triggers should answer immediately — under ~250ms — while scroll
// reveals can take longer.

/** Hover/press feedback for cards: a small lift, no scale. */
export const cardHover = {
  whileHover: { y: -3, transition: { duration: 0.2, ease: "easeOut" } },
} as const;

/** Hover/press feedback for buttons and links: lift on hover, sink on press. */
export const buttonPress = {
  whileHover: { y: -1 },
  whileTap: { y: 0, scale: 0.98 },
  transition: { duration: 0.15, ease: "easeOut" },
} as const;

/** Content swapping in place (tab panels, filtered lists). */
export const swapPanel: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.18, ease: "easeIn" } },
};

/** Hero: the intro lines arrive one after another rather than all at once. */
export const introContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};

export const introItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
