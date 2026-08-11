import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Portrait from "./Portrait";

// How I actually run a project, in the order it happens. Deliberately not a
// skills list — that would just repeat SkillsSection.
const process = [
  { label: "Plan", desc: "Scope, milestones, and a timeline that holds." },
  { label: "Constraints", desc: "Budget, devices, and data limits up front." },
  { label: "Definition of done", desc: "Agree on what finished actually means." },
  { label: "Build", desc: "Ship in small, reviewable iterations." },
  { label: "Test", desc: "Check the happy path and the edge cases." },
  { label: "Deploy", desc: "Release, then watch it in production." },
];

// Flipping the card "runs" the process: each step lights up in turn and the
// rail fills down behind them. Fast enough to finish well inside a hover.
const LEAD_IN_MS = 160;
const STEP_MS = 230;

export default function ProfileCard() {
  const reduceMotion = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);
  const [revealed, setRevealed] = useState(-1);

  const toggleFlip = () => setIsFlipped((flipped) => !flipped);

  useEffect(() => {
    if (!isFlipped) {
      setRevealed(-1);
      return;
    }

    if (reduceMotion) {
      // No motion: show the whole sequence already finished.
      setRevealed(process.length - 1);
      return;
    }

    const timers = process.map((_, index) =>
      setTimeout(() => setRevealed(index), LEAD_IN_MS + index * STEP_MS),
    );
    return () => timers.forEach(clearTimeout);
  }, [isFlipped, reduceMotion]);

  const railProgress = (revealed + 1) / process.length;

  return (
    <div
      className="flip-card mx-auto aspect-[4/5] w-full max-w-sm"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label="Profile card — hover or press to see how I approach a project"
        onClick={toggleFlip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleFlip();
          }
        }}
        onFocus={() => setIsFlipped(true)}
        onBlur={() => setIsFlipped(false)}
        className={`flip-card-inner cursor-pointer rounded-3xl outline-none ring-clay-400 ring-offset-2 ring-offset-beige-50 focus-visible:ring-2 ${
          isFlipped ? "is-flipped" : ""
        }`}
      >
        {/* Front — the photo, unfiltered */}
        <div className="flip-card-front overflow-hidden rounded-3xl border border-beige-200 bg-beige-100 shadow-sm">
          <Portrait src="/portrait.jpg" alt="Mark Jerohm Castro" />

          <div
            className="hint-bob pointer-events-none absolute inset-x-0 bottom-4 flex justify-center"
            aria-hidden="true"
          >
            <span className="rounded-full border border-beige-200 bg-beige-50/90 px-3 py-1.5 text-[11px] font-medium text-stone-600 shadow-sm backdrop-blur-sm">
              Hover or click to see how I work
            </span>
          </div>
        </div>

        {/* Back — the same six steps every project goes through, played in order */}
        <div className="flip-card-back flex flex-col overflow-hidden rounded-3xl border border-beige-200 bg-beige-50 p-6 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-clay-600">
            How I work
          </p>
          <h3 className="mt-2 text-lg font-semibold tracking-tight text-stone-900">
            Every project, same six steps
          </h3>

          {/* The sequence is driven by state + CSS transitions rather than a
              JS animation loop: it stays smooth, costs nothing per frame, and
              the step state is visible in the DOM. */}
          <ol className="relative mt-5 flex flex-1 flex-col justify-between">
            {/* Rail behind the badges: a track that fills as steps light up. */}
            <span
              className="absolute bottom-2 left-[11px] top-2 w-px bg-beige-200"
              aria-hidden="true"
            />
            <span
              className="absolute bottom-2 left-[11px] top-2 w-px origin-top bg-clay-400 transition-transform duration-300 ease-out"
              style={{ transform: `scaleY(${railProgress})` }}
              aria-hidden="true"
            />

            {process.map((step, index) => {
              const isOn = revealed >= index;
              return (
                <li
                  key={step.label}
                  data-on={isOn}
                  className="relative flex items-start gap-3"
                >
                  <span
                    className={`z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full text-[11px] font-semibold transition-all duration-300 ease-out ${
                      isOn
                        ? "scale-100 bg-clay-700 text-azure"
                        : "scale-90 bg-beige-100 text-stone-400"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div
                    className={`min-w-0 transition-all duration-300 ease-out ${
                      isOn
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-1.5 opacity-40"
                    }`}
                  >
                    <p className="text-sm font-semibold leading-tight text-stone-800">
                      {step.label}
                    </p>
                    <p className="mt-0.5 text-xs leading-snug text-stone-500">
                      {step.desc}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
