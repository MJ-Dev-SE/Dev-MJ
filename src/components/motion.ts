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

// One-shot "expand from center" entrance played once after the loading
// screen finishes. Mount-triggered (no exit side), so no AnimatePresence
// is needed for this one.
export const pageEntrance: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

// Viewport config so reveals only fire once, slightly before fully in view.
export const revealViewport = { once: true, amount: 0.15 } as const;

// "Reverse spiral" scroll reveal: each section unwinds into place (rotates
// counter-clockwise from a shrunken, tilted state up to rest) as it enters the
// viewport. Used by <ScrollReveal> on every Home section; replays each scroll.
export const spiralReveal: Variants = {
  hidden: { opacity: 0, scale: 0.75, rotate: -45 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

// Viewport config for the spiral reveal — re-fires every time a section
// re-enters view (both scroll directions), not just once.
export const spiralViewport = { once: false, amount: 0.2 } as const;
