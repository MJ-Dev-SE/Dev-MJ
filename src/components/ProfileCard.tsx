import { Fragment, useEffect, useState, MouseEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import GlitchPortrait from "./GlitchPortrait";

const process = [
  { label: "Planning", desc: "scope, timeline & milestones" },
  { label: "Considerations", desc: "constraints & trade-offs" },
  { label: "Clear Goal", desc: 'define what "done" means' },
  { label: "Implementation", desc: "build in focused iterations" },
  { label: "Testing", desc: "verify & catch regressions" },
  { label: "Deployment", desc: "ship, then monitor" },
];

// Sequence timing (ms). A step "activates", then the connector below it
// "flows" an orb down to the next step, then that step activates — and so on.
const STEP_ACTIVE_MS = 820;
const CONN_FLOW_MS = 540;

// Faint floating particles — kept at 5–10% opacity via CSS.
const particles = [
  { left: "12%", dur: 11, delay: 0 },
  { left: "28%", dur: 14, delay: 3 },
  { left: "44%", dur: 9, delay: 1.5 },
  { left: "58%", dur: 13, delay: 5 },
  { left: "71%", dur: 10, delay: 2.2 },
  { left: "86%", dur: 15, delay: 4 },
  { left: "20%", dur: 12, delay: 6.5 },
  { left: "64%", dur: 12, delay: 0.8 },
];

type StepStatus = "pending" | "active" | "done";
type ConnState = "pending" | "flowing" | "done";

export default function ProfileCard() {
  const reduceMotion = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);

  // Workflow-engine state, driven by the flip: revealing the back "boots" it.
  const [activeStep, setActiveStep] = useState(-1);
  const [flowConn, setFlowConn] = useState<number | null>(null);
  const [completed, setCompleted] = useState(false);

  const toggleFlip = () => setIsFlipped((flipped) => !flipped);

  // Run (or reset) the sequential workflow animation whenever the card flips.
  useEffect(() => {
    if (!isFlipped) {
      setActiveStep(-1);
      setFlowConn(null);
      setCompleted(false);
      return;
    }

    if (reduceMotion) {
      // No motion: present every phase as already completed.
      setActiveStep(process.length - 1);
      setFlowConn(null);
      setCompleted(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = 0;
    process.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveStep(i), t));
      t += STEP_ACTIVE_MS;
      if (i < process.length - 1) {
        timers.push(setTimeout(() => setFlowConn(i), t));
        t += CONN_FLOW_MS;
      }
    });
    timers.push(setTimeout(() => setCompleted(true), t));

    return () => timers.forEach(clearTimeout);
  }, [isFlipped, reduceMotion]);

  const stepStatus = (i: number): StepStatus =>
    activeStep > i ? "done" : activeStep === i ? "active" : "pending";

  const connState = (i: number): ConnState =>
    activeStep > i ? "done" : flowConn === i ? "flowing" : "pending";

  // Cursor spotlight that stays within the hovered row.
  const onRowMove = (event: MouseEvent<HTMLLIElement>) => {
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--pf-mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--pf-my", `${event.clientY - rect.top}px`);
  };

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
        {/* Front — cinematic glitch portrait, full-bleed */}
        <div className="flip-card-front overflow-hidden rounded-3xl border border-beige-900/40 shadow-[0_20px_45px_rgba(5,7,14,0.4)]">
          <GlitchPortrait src="/portrait.jpg" />
        </div>

        {/* Back — an AI "workflow engine" running planning → deployment */}
        <div className="flip-card-back pf-back flex flex-col overflow-hidden rounded-3xl border border-beige-900/40 bg-gradient-to-br from-beige-800 via-beige-900 to-beige-800 p-5 shadow-[0_20px_45px_rgba(74,59,39,0.35)]">
          {/* Contained ambient layers (clipped by the card's rounded overflow) */}
          <div className="pf-ambient" aria-hidden="true" />
          <div className="pf-glass" aria-hidden="true" />
          <div className="pf-particles" aria-hidden="true">
            {particles.map((p, i) => (
              <i
                key={i}
                style={{
                  left: p.left,
                  animationDuration: `${p.dur}s`,
                  animationDelay: `${p.delay}s`,
                }}
              />
            ))}
          </div>

          <motion.div
            className="relative z-10 flex h-full flex-col"
            initial={false}
            animate={
              isFlipped
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 20, scale: 0.97 }
            }
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="mb-2">
              <p className="text-[10px] uppercase tracking-[0.3em] text-azure">
                My Process
              </p>
              <h3 className="mt-1 text-base font-bold text-beige-50">
                How I treat every project
              </h3>
            </div>

            <ol
              className={`pf-rail relative flex flex-1 flex-col ${completed ? "is-complete" : ""}`}
            >
              {completed && !reduceMotion && (
                <span className="pf-idle-pulse" aria-hidden="true" />
              )}

              {process.map((step, index) => {
                const status = stepStatus(index);
                const revealed = status !== "pending";
                return (
                  <Fragment key={step.label}>
                    <motion.li
                      data-status={status}
                      onMouseMove={onRowMove}
                      className="pf-row relative flex items-center gap-3 rounded-lg border border-transparent px-2 py-1.5"
                      initial={false}
                      whileHover={{ y: -5 }}
                      animate={{
                        opacity: status === "pending" ? 0.45 : 1,
                        backgroundColor:
                          status === "active"
                            ? "rgba(127,220,255,0.10)"
                            : status === "done"
                              ? "rgba(253,251,247,0.06)"
                              : "rgba(253,251,247,0.03)",
                        borderColor:
                          status === "active"
                            ? "rgba(127,220,255,0.40)"
                            : status === "done"
                              ? "rgba(127,220,255,0.15)"
                              : "rgba(127,220,255,0)",
                        boxShadow:
                          status === "active"
                            ? "0 6px 18px rgba(127,220,255,0.15)"
                            : "0 0 0 rgba(0,0,0,0)",
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <span className="pf-spotlight" aria-hidden="true" />
                      <span className="pf-scan" aria-hidden="true" />

                      <span className="pf-badge-wrap grid h-7 w-7 shrink-0 place-items-center">
                        <motion.span
                          className="pf-badge grid h-7 w-7 place-items-center rounded-lg bg-azure text-xs font-bold text-clay-900"
                          initial={false}
                          animate={{
                            scale: status === "active" ? [0.7, 1.05, 1] : 1,
                            boxShadow:
                              status === "pending"
                                ? "0 4px 10px rgba(0,0,0,0.4)"
                                : "0 0 0 1px rgba(127,220,255,0.5), 0 0 14px rgba(127,220,255,0.45)",
                          }}
                          transition={{ duration: 0.45, ease: "easeOut" }}
                        >
                          {index + 1}
                        </motion.span>
                      </span>

                      <div className="relative z-10 min-w-0">
                        <motion.p
                          className="text-sm font-semibold leading-tight text-beige-50"
                          initial={false}
                          animate={{
                            opacity: revealed ? 1 : 0.5,
                            y: revealed ? 0 : 10,
                          }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        >
                          {step.label}
                        </motion.p>
                        <motion.p
                          className="truncate text-[11px] leading-tight text-beige-300"
                          initial={false}
                          animate={{ opacity: revealed ? 1 : 0.4 }}
                          transition={{
                            duration: 0.35,
                            delay: revealed ? 0.12 : 0,
                            ease: "easeOut",
                          }}
                        >
                          {step.desc}
                        </motion.p>
                      </div>
                    </motion.li>

                    {index < process.length - 1 && (
                      <li
                        aria-hidden="true"
                        className="pf-connector"
                        data-state={connState(index)}
                      >
                        <span className="pf-connector-line" />
                        <motion.span
                          className="pf-orb"
                          initial={false}
                          animate={
                            connState(index) === "flowing"
                              ? { top: ["0%", "100%"], opacity: [0, 1, 1, 0] }
                              : { top: "0%", opacity: 0 }
                          }
                          transition={{ duration: 0.54, ease: "easeInOut" }}
                        />
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ol>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
