import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  onFinish: () => void;
}

const HOLD_MS = 1600;
const REDUCED_HOLD_MS = 300;

/**
 * Brand splash: the same "MJ" monogram used by the navbar and the favicon,
 * the full name underneath, and a thin bar that fills once. No bouncing
 * letters or blinking dots — it should read as a wordmark, not a spinner.
 */
export default function LoadingScreen({ onFinish }: LoadingScreenProps) {
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const timer = setTimeout(onFinish, reduceMotion ? REDUCED_HOLD_MS : HOLD_MS);
    return () => clearTimeout(timer);
  }, [onFinish, reduceMotion]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] grid place-items-center bg-beige-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="grid h-16 w-16 place-items-center rounded-2xl bg-clay-700 text-xl font-semibold tracking-tight text-azure">
          MJ
        </span>

        <p className="mt-5 text-sm font-medium tracking-tight text-stone-800">
          Mark Jerohm Castro
        </p>
        <p className="mt-1 text-[10px] uppercase tracking-[0.35em] text-clay-600">
          Portfolio
        </p>

        <div
          className="mt-6 h-px w-32 overflow-hidden bg-beige-200"
          role="progressbar"
          aria-label="Loading portfolio"
        >
          <motion.div
            className="h-full bg-clay-600"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: reduceMotion ? 0 : HOLD_MS / 1000,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "left" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
