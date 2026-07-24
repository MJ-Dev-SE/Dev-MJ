import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

interface LoadingScreenProps {
  onFinish: () => void;
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const dotVariants: Variants = {
  hidden: { opacity: 0.2 },
  show: (i: number) => ({
    opacity: [0.2, 1, 0.2],
    transition: {
      delay: 0.9 + i * 0.15,
      duration: 0.9,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }),
};

export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const timer = setTimeout(onFinish, reduceMotion ? 400 : 1900);
    return () => clearTimeout(timer);
  }, [onFinish, reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-beige-50"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        transition: { duration: 0.5, ease: "easeInOut" },
      }}
    >
      <div className="flex items-end gap-1 text-6xl font-extrabold tracking-tight text-beige-800 sm:text-7xl">
        {["M", "J"].map((letter, i) => (
          <motion.span
            key={letter}
            custom={i}
            variants={reduceMotion ? undefined : letterVariants}
            initial={reduceMotion ? undefined : "hidden"}
            animate={reduceMotion ? undefined : "show"}
          >
            {letter}
          </motion.span>
        ))}
        <span className="ml-1 flex items-end gap-1 pb-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              custom={i}
              variants={reduceMotion ? undefined : dotVariants}
              initial={reduceMotion ? undefined : "hidden"}
              animate={reduceMotion ? undefined : "show"}
              className="block h-2 w-2 rounded-full bg-beige-600"
            />
          ))}
        </span>
      </div>
    </motion.div>
  );
}
