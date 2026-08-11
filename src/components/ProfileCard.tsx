import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import Portrait from "./Portrait";
import ProcessFlowchart, { FLOW_STEP_COUNT } from "./ProcessFlowchart";

// Flipping the card "runs" the flowchart: connectors draw and nodes light in
// order. The step interval is deliberately shorter than the CSS transitions in
// `.fc-*` (620–700ms), so each element is still easing in when the next one
// starts — that overlap is what makes it read as a flow instead of a stutter.
// Total run is ~4s; slow enough to follow, short enough to finish in a hover.
const LEAD_IN_MS = 260;
const STEP_MS = 320;

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
      // No motion: show the whole chart already traced.
      setRevealed(FLOW_STEP_COUNT - 1);
      return;
    }

    const timers = Array.from({ length: FLOW_STEP_COUNT }, (_, index) =>
      setTimeout(() => setRevealed(index), LEAD_IN_MS + index * STEP_MS),
    );
    return () => timers.forEach(clearTimeout);
  }, [isFlipped, reduceMotion]);

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

        {/* Back — the process as a flowchart, traced when the card flips */}
        <div className="flip-card-back flex flex-col overflow-hidden rounded-3xl border border-beige-200 bg-beige-50 px-5 pb-4 pt-5 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-clay-600">
            How I work
          </p>
          <h3 className="mt-1.5 text-base font-semibold tracking-tight text-stone-900">
            How I consider every projects
          </h3>

          <ProcessFlowchart revealed={revealed} />
        </div>
      </div>
    </div>
  );
}
