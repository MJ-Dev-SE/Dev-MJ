import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { buttonPress } from "./motion";

/**
 * Mobile work, presented on a phone, Instagram-story style. Swipe (touch), tap
 * the left/right edge (pointer), or use the arrows. Press and hold anywhere on
 * the screen to freeze it, exactly like a story. Copy stays feature-first —
 * the stack lives in the Skills section.
 *
 * An app can carry **several screenshots**, and each one is its own snap; the
 * copy beside the phone follows whichever app the current snap belongs to. An
 * app with no screenshots still gets one snap, the typographic card.
 */

type MobileApp = {
  name: string;
  tagline: string;
  blurb: string;
  status: "Live" | "In progress" | "Planning";
  meta: string;
  highlights: string[];
  icon: "bolt" | "list" | "rate" | "cycle" | "hand" | "map";
  /**
   * Screenshots shown full-bleed inside the phone, one snap each. Drop the
   * files in `public/mobile/` and point here with absolute paths, e.g.
   * ["/mobile/energyc-1.jpg", "/mobile/energyc-2.jpg"]. Portrait shots read
   * best — the phone screen is 9:17. Leave the list off (or let a file 404)
   * and that snap falls back to the typographic card below.
   */
  images?: string[];
  /** Where the build can be downloaded — a Google Drive link is fine. */
  link?: string;
  linkLabel?: string;
  /** Shown instead of a button while there is nothing to link to. */
  note?: string;
};

const apps: MobileApp[] = [
  {
    name: "EnergyC",
    tagline: "",
    blurb:
      "Property managers split one electricity bill across every tenant — without a spreadsheet and a calculator at the end of the month.",
    status: "Live",
    meta: "2026 · Android",
    highlights: [
      "The day's rate is fetched and checked automatically, so a bill never runs on last month's figure",
      "Reading, bill, payment, receipt — the whole cycle recorded in order",
      "Sized for a thumb, because readings get taken standing at the meter",
    ],
    icon: "bolt",
    // Dashboard first — it shows the rate guard refusing to finalize a bill,
    // which is the whole point of the app. Sign-in second.
    images: ["/mobile/Energyc-dashboard.jpg", "/mobile/Energyc-signin.jpg"],
    link: "https://drive.google.com/file/d/17Qv8l4r-bSOshV9vm_6DOG_m_oTcx2oR/view?usp=sharing",
    linkLabel: "Get the app on Google Drive",
    note: "Distributed as an APK — the download link goes up here.",
  },
  {
    name: "88 Resort",
    tagline: "",
    blurb:
      "A guest arrives and works out the place for themselves — which pools are there, what the rooms are like, where to eat, what it all costs — instead of queuing at the front desk to ask.",
    status: "In progress",
    meta: "2026 · Android",
    highlights: [
      "Pools, rooms, dining and services in one place, so the desk stops being the only source",
      "Rates and running promos come from what the resort itself updates, so nothing goes stale",
      "Reservations start in the app instead of a phone call",
    ],
    icon: "map",
    // Home screen first — it carries the promo banner and the Explore row, so
    // it says what the app is. The onboarding welcome follows.
    images: ["/mobile/88resort-home.jpg", "/mobile/88resort-welcome.jpg"],
    note: "Still in development — the build link goes up here.",
  },
];

// One snap = one screen inside the phone. An app with several screenshots
// contributes one per shot; an app with none still gets its typographic card.
type Snap = {
  key: string;
  app: MobileApp;
  image?: string;
  /** 1-based position within its own app, for labelling ("screen 2 of 3"). */
  frame: number;
  frames: number;
};

const snaps: Snap[] = apps.flatMap((app) =>
  app.images?.length
    ? app.images.map((image, i) => ({
        key: `${app.name}-${i}`,
        app,
        image,
        frame: i + 1,
        frames: app.images!.length,
      }))
    : [{ key: app.name, app, frame: 1, frames: 1 }],
);

const snapLabel = (snap: Snap) =>
  snap.frames > 1
    ? `Go to ${snap.app.name}, screen ${snap.frame} of ${snap.frames}`
    : `Go to ${snap.app.name}`;

// One full bar per snap. Long enough to actually read the card.
const SLIDE_MS = 6000;
// A press this long counts as a hold (pause), not a tap (advance).
const HOLD_MS = 220;

// The status chip is not always "available" — colour it by what it says, or a
// project still in development reads as shipped.
const statusStyles: Record<MobileApp["status"], string> = {
  Live: "border-emerald-200 bg-emerald-50 text-emerald-700",
  "In progress": "border-clay-200 bg-clay-50 text-clay-700",
  Planning: "border-beige-300 bg-beige-100 text-stone-500",
};

const iconPaths: Record<MobileApp["icon"], string> = {
  bolt: "M13 3L5 13h5l-1 8 8-10h-5l1-8z",
  list: "M4 6h16M4 12h16M4 18h10",
  rate: "M4 16l5-5 3 3 7-7M15 7h5v5",
  cycle: "M4 12a8 8 0 0113.7-5.7M20 12a8 8 0 01-13.7 5.7M17 3v4h-4M7 21v-4h4",
  hand: "M9 11V5.5a1.5 1.5 0 013 0V11m0-1.5a1.5 1.5 0 013 0V12m0-1a1.5 1.5 0 013 0v4a5 5 0 01-5 5h-2a5 5 0 01-5-5v-4l-1.2 1.2a1.5 1.5 0 002 2.2",
  map: "M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11zM12 12a2.5 2.5 0 100-5 2.5 2.5 0 000 5z",
};

function AppIcon({ icon }: { icon: MobileApp["icon"] }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={iconPaths[icon]} />
    </svg>
  );
}

/** One snap: a screenshot if this frame has one, the app's name card if not. */
function AppSnap({ snap, position }: { snap: Snap; position: number }) {
  const { app, image } = snap;
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(image) && !imageFailed;

  if (showImage) {
    return (
      <article className="relative flex w-full shrink-0 snap-center flex-col justify-end">
        <img
          src={image}
          alt={`${app.name} on a phone`}
          onError={() => setImageFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Scrim so the caption stays readable over any screenshot. */}
        <div
          className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-stone-900/85 via-stone-900/45 to-transparent"
          aria-hidden="true"
        />
        <div className="relative p-6 pb-7">
          <h4 className="text-xl font-semibold tracking-tight text-beige-50">
            {app.name}
          </h4>
          <p className="mt-1.5 text-sm leading-relaxed text-beige-200">
            {app.tagline}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`flex w-full shrink-0 snap-center flex-col justify-between bg-gradient-to-b p-6 pt-14 ${
        position % 2 === 0
          ? "from-beige-100 to-beige-50"
          : "from-clay-50 to-beige-50"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-clay-700 text-azure">
          <AppIcon icon={app.icon} />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-clay-600">
          {app.status}
        </span>
      </div>

      <div>
        <h4 className="text-2xl font-semibold leading-snug tracking-tight text-stone-900">
          {app.name}
        </h4>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          {app.tagline}
        </p>
        <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-stone-400">
          {app.meta}
        </p>
      </div>
    </article>
  );
}

export default function MobileSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // Autoplay is a nicety, not the way to drive the thing: the first deliberate
  // move (tap, arrow, segment) hands control over for good.
  const [autoplay, setAutoplay] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [held, setHeld] = useState(false);
  const reduceMotion = useReducedMotion();

  const multiple = snaps.length > 1;
  const paused = hovered || held;
  const running = autoplay && multiple && !reduceMotion;
  const advancing = running && !paused;
  // The copy beside the phone follows whichever app the current snap belongs
  // to, so several screenshots of one app keep showing that app's details.
  const app = (snaps[index] ?? snaps[0]).app;

  const goTo = useCallback(
    (next: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(snaps.length - 1, next));
      track.scrollTo({
        left: clamped * track.clientWidth,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      setIndex(clamped);
    },
    [reduceMotion],
  );

  const move = (next: number) => {
    setAutoplay(false);
    goTo(next);
  };

  // Time left on the current snap. Holding subtracts what has already elapsed
  // instead of restarting the countdown, so a pause resumes where it stopped
  // rather than snapping the bar back to zero.
  const remainingRef = useRef(SLIDE_MS);
  const startedRef = useRef(0);

  useEffect(() => {
    remainingRef.current = SLIDE_MS;
  }, [index]);

  useEffect(() => {
    if (!advancing || index === snaps.length - 1) return;
    startedRef.current = Date.now();
    const timer = setTimeout(() => goTo(index + 1), remainingRef.current);
    return () => {
      clearTimeout(timer);
      remainingRef.current = Math.max(
        0,
        remainingRef.current - (Date.now() - startedRef.current),
      );
    };
  }, [advancing, index, goTo]);

  // A smooth scroll fires dozens of scroll events on the way over, and acting
  // on each one made the active index (and the progress bar) stutter. Wait for
  // the scrolling to settle, then read where it landed — one clean update.
  const settleRef = useRef<number | undefined>(undefined);

  const handleScroll = () => {
    window.clearTimeout(settleRef.current);
    settleRef.current = window.setTimeout(() => {
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const landed = Math.round(track.scrollLeft / track.clientWidth);
      setIndex((current) => (current === landed ? current : landed));
    }, 110);
  };

  useEffect(() => () => window.clearTimeout(settleRef.current), []);

  // One pointer gesture on the phone means one of three things: a hold (pause),
  // a swipe (let the track scroll natively), or a tap on an edge (advance).
  //
  // Tap detection lives here, on the element wrapping the scroll track, rather
  // than in absolutely-positioned overlay buttons. Those buttons were siblings
  // of the track, not ancestors, so a touch landing on one had no horizontally
  // scrollable ancestor and the swipe was swallowed — which is why they were
  // `hidden md:block`, i.e. desktop-only, and why tapping did nothing on a
  // phone. Reading the gesture instead leaves native swiping untouched.
  const press = useRef({ x: 0, y: 0, at: 0, moved: false });

  const startHold = (event: ReactPointerEvent<HTMLDivElement>) => {
    press.current = {
      x: event.clientX,
      y: event.clientY,
      at: Date.now(),
      moved: false,
    };
    setHeld(true);
  };

  const endHold = () => setHeld(false);

  // The browser fires pointercancel the moment it takes the gesture over for
  // scrolling — the clearest possible signal that this was a swipe, not a tap.
  const cancelPress = () => {
    press.current.moved = true;
    endHold();
  };

  const TAP_SLOP = 10; // px of drift still counted as a tap, not a drag

  const endPress = (event: ReactPointerEvent<HTMLDivElement>) => {
    endHold();
    if (!multiple) return;

    const { x, y, at, moved } = press.current;
    const target = event.target as HTMLElement | null;

    // Let real controls (progress segments) handle their own clicks.
    if (target?.closest("button, a")) return;

    if (
      moved ||
      Date.now() - at > HOLD_MS ||
      Math.abs(event.clientX - x) > TAP_SLOP ||
      Math.abs(event.clientY - y) > TAP_SLOP
    ) {
      return;
    }

    // Which third of the screen was tapped decides the direction.
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    if (ratio < 0.33) move(index - 1);
    else if (ratio > 0.67) move(index + 1);
  };

  return (
    <section
      id="mobile"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-20 md:py-28"
    >
      <SectionHeading
        eyebrow="Mobile"
        title="Built for the phone"
        lead="One app per screen. Swipe through it the way you would a story — press and hold to stop on one."
      />

      <div className="mt-12 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:gap-14">
        <div className="order-2 md:order-1">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${statusStyles[app.status]}`}
            >
              {app.status}
            </span>
            <span className="text-xs text-stone-400">{app.meta}</span>
          </div>

          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-stone-900">
            {app.name}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-stone-600">
            {app.blurb}
          </p>

          <ul className="mt-5 space-y-2">
            {app.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2.5 text-sm text-stone-600"
              >
                <span
                  className="mt-2 h-1 w-1 shrink-0 rounded-full bg-clay-500"
                  aria-hidden="true"
                />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            {app.link ? (
              <motion.a
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                {...buttonPress}
                className="inline-flex items-center gap-2 rounded-lg bg-clay-700 px-4 py-2 text-sm font-semibold text-azure transition-colors hover:bg-clay-800"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                {app.linkLabel ?? "Download"}
              </motion.a>
            ) : (
              app.note && <p className="text-xs text-stone-400">{app.note}</p>
            )}
          </div>

          {multiple && (
            <div className="mt-6 flex items-center gap-3">
              <motion.button
                type="button"
                onClick={() => move(index - 1)}
                disabled={index === 0}
                {...buttonPress}
                className="grid h-10 w-10 place-items-center rounded-full border border-beige-300 text-stone-700 transition-colors hover:border-clay-400 hover:text-clay-700 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Previous app"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>

              <motion.button
                type="button"
                onClick={() => move(index + 1)}
                disabled={index === snaps.length - 1}
                {...buttonPress}
                className="grid h-10 w-10 place-items-center rounded-full border border-beige-300 text-stone-700 transition-colors hover:border-clay-400 hover:text-clay-700 disabled:pointer-events-none disabled:opacity-40"
                aria-label="Next screen"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>

              <span className="ml-1 text-xs tabular-nums text-stone-400">
                {index + 1} / {snaps.length}
              </span>
            </div>
          )}
        </div>

        {/* Phone */}
        <div
          className="order-1 mx-auto md:order-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            endHold();
          }}
          onFocusCapture={() => setHovered(true)}
          onBlurCapture={() => setHovered(false)}
        >
          <div
            className="relative w-[264px] rounded-[2.75rem] border-[10px] border-stone-800 bg-beige-50 shadow-xl shadow-beige-900/20 sm:w-[300px]"
            onPointerDown={startHold}
            onPointerUp={endPress}
            onPointerCancel={cancelPress}
          >
            {/* notch */}
            <div
              className="absolute left-1/2 top-0 z-30 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-stone-800"
              aria-hidden="true"
            />

            <div className="relative overflow-hidden rounded-[2rem]">
              {multiple && (
                <div className="absolute inset-x-3 top-7 z-30 flex gap-1.5">
                  {snaps.map((entry, i) => (
                    <button
                      key={entry.key}
                      type="button"
                      onClick={() => move(i)}
                      className="h-1 flex-1 overflow-hidden rounded-full bg-beige-300/80"
                      aria-label={snapLabel(entry)}
                      aria-current={i === index}
                    >
                      {/* Keyed on the index only, so a hold pauses the fill in
                          place instead of remounting and jumping it back. */}
                      <span
                        key={index}
                        className={`block h-full rounded-full bg-clay-600 ${
                          i < index
                            ? "w-full"
                            : i > index
                              ? "w-0"
                              : running
                                ? "snap-fill"
                                : "w-full"
                        }`}
                        style={
                          i === index && running
                            ? {
                                animationDuration: `${SLIDE_MS}ms`,
                                animationPlayState: paused
                                  ? "paused"
                                  : "running",
                              }
                            : undefined
                        }
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* No overlay tap zones: `endPress` above reads the gesture, so
                  tapping an edge works with a mouse and a finger alike, and a
                  swipe is still handled natively by the track below. */}
              <div
                ref={trackRef}
                onScroll={handleScroll}
                className="snap-track flex aspect-[9/17] snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
              >
                {snaps.map((entry, i) => (
                  <AppSnap key={entry.key} snap={entry} position={i} />
                ))}
              </div>
            </div>
          </div>

          {multiple && (
            <p className="mt-4 text-center text-xs text-stone-400">
              <span className="md:hidden">
                Swipe or tap the edges · hold to stop
              </span>
              <span className="hidden md:inline">
                Tap the edges · hold to stop
              </span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
