import { CSSProperties, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cinematic sci-fi glitch treatment for the portrait (ProfileCard front):
 * horizontal slice displacement + cyan/orange chromatic aberration + scan lines
 * + digital static + a bright backlit bloom (dark high-contrast grade), with a
 * minimal floating HUD overlay. All visuals live in the `.gp-*` CSS in
 * index.css; this component just wires the layers and the ticking readouts.
 *
 * NOTE: a true subject-only silhouette needs a background-removed PNG; on a flat
 * JPG this is approximated with the bloom + contrast grade.
 */
export default function GlitchPortrait({ src }: { src: string }) {
  const reduceMotion = useReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setFrame((f) => (f + 1) % 100000), 130);
    return () => clearInterval(id);
  }, [reduceMotion]);

  const style = { "--gp-src": `url(${src})` } as CSSProperties;

  // Ticking readouts for the (currently commented-out) HUD overlay below.
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const readoutA = (0xa1 + (frame % 94)).toString(16).toUpperCase().padStart(2, "0");
  const readoutB = String(1200 + ((frame * 7) % 8800)).padStart(4, "0");
  const readoutC = ((frame * 3) % 360).toString().padStart(3, "0");
  /* eslint-enable @typescript-eslint/no-unused-vars */

  return (
    <div
      className="glitch-portrait"
      style={style}
      role="img"
      aria-label="Mark Jerohm Castro"
    >
      <div className="gp-backlight" />
      <div className="gp-image" />
      <div className="gp-scanlines" />
      <div className="gp-static" />
      <div className="gp-vignette" />

      <svg
        className="gp-hud"
        viewBox="0 0 80 100"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* corner brackets */}
        {/* <g stroke="#7fdcff" strokeWidth="0.6" fill="none" opacity="0.7">
          <path d="M5 9 V5 H9" />
          <path d="M71 5 H75 V9" />
          <path d="M5 91 V95 H9" />
          <path d="M75 91 V95 H71" />
        </g> */}

        {/* thin dotted connector lines */}
        {/* <g
          stroke="#7fdcff"
          strokeWidth="0.4"
          strokeDasharray="0.8 1.6"
          opacity="0.55"
          fill="none"
        >
          <line x1="60" y1="18" x2="72" y2="18" />
          <line x1="66" y1="18" x2="66" y2="30" />
          <line x1="8" y1="70" x2="21" y2="70" />
        </g> */}

        {/* small readout tick bar */}
        {/* <rect x="60" y="24" width="12" height="0.8" fill="#7fdcff" opacity="0.5" /> */}

        {/* floating diamonds */}
        {/* <rect className="gp-diamond" x="58.5" y="16.5" width="3" height="3" fill="#a9dcf5" /> */}
        {/* <rect
          className="gp-diamond gp-diamond-2"
          x="18"
          y="68.8"
          width="2.4"
          height="2.4"
          fill="#ffb56b"
        /> */}
      </svg>

      <div className="gp-readouts">
        {/* <span style={{ top: "6%", left: "8%" }}>SYS//{readoutA}</span>
        <span style={{ top: "6%", right: "8%" }}>θ{readoutC}</span> */}
        {/* <span style={{ bottom: "6%", right: "8%" }}>{readoutB}·MHZ</span>
        <span style={{ bottom: "6%", left: "8%" }}>◇ LINK OK</span> */}
      </div>
    </div>
  );
}
