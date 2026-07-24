import { useState } from "react";

const process = [
  { label: "Planning", desc: "scope, timeline & milestones" },
  { label: "Considerations", desc: "constraints & trade-offs" },
  { label: "Clear Goal", desc: 'define what "done" means' },
  { label: "Implementation", desc: "build in focused iterations" },
  { label: "Testing", desc: "verify & catch regressions" },
  { label: "Deployment", desc: "ship, then monitor" },
];

export default function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [portraitLoaded, setPortraitLoaded] = useState(true);

  const toggleFlip = () => setIsFlipped((flipped) => !flipped);

  return (
    <div
      className="flip-card mx-auto w-full max-w-sm aspect-[4/5]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={isFlipped}
        aria-label="Profile card — hover or press to reveal my project process"
        onClick={toggleFlip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleFlip();
          }
        }}
        className={`flip-card-inner cursor-pointer outline-none ${isFlipped ? "is-flipped" : ""}`}
      >
        {/* Front — the full portrait in a beige mat frame, no text overlay */}
        <div className="flip-card-front overflow-hidden rounded-3xl border border-beige-300 bg-gradient-to-br from-beige-100 via-beige-50 to-beige-200 p-3 shadow-[0_20px_45px_rgba(107,86,56,0.18)]">
          {portraitLoaded ? (
            <img
              src="/portrait.jpg"
              alt="Mark Jerohm Castro"
              className="h-full w-full rounded-2xl object-cover object-top"
              onError={() => setPortraitLoaded(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-beige-100">
              <span className="text-5xl font-extrabold text-clay-700">MJ</span>
            </div>
          )}
        </div>

        {/* Back — how I approach every project, planning → deployment */}
        <div className="flip-card-back flex flex-col overflow-hidden rounded-3xl border border-beige-900/40 bg-gradient-to-br from-beige-800 via-beige-900 to-beige-800 p-6 shadow-[0_20px_45px_rgba(74,59,39,0.35)]">
          <div className="mb-3">
            <p className="text-[10px] uppercase tracking-[0.3em] text-azure">
              My Process
            </p>
            <h3 className="mt-1 text-base font-bold text-beige-50">
              How I treat every project
            </h3>
          </div>

          <ol className="flex flex-1 flex-col justify-between gap-1.5">
            {process.map((step, index) => (
              <li
                key={step.label}
                className="flex items-center gap-3 rounded-lg bg-beige-50/[0.04] px-2 py-1.5"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-azure text-xs font-bold text-clay-900 shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold leading-tight text-beige-50">
                    {step.label}
                  </p>
                  <p className="truncate text-[11px] leading-tight text-beige-300">
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}
