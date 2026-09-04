/**
 * The ProfileCard back: how a project actually moves, drawn as a real
 * flowchart rather than a numbered list.
 *
 * The list version had six steps in a straight line, which is not how any of
 * it works — planning and building both loop until a condition is met. So the
 * same six ideas are re-expressed here in flowchart terms: Constraints and
 * "definition of done" become the two decision diamonds, and Test becomes the
 * No-branch that sends Build back around.
 *
 * LAYOUT: everything is centred on x=150 in a 300-wide viewBox, and the two
 * No-loops deliberately go out opposite sides (first left, second right). Both
 * on the same side would drag the drawing's visual centre off-axis and make it
 * look misaligned inside the card. If you add a loop, alternate its side and
 * keep the outermost gutters equidistant from x=150 (currently 14 and 286).
 *
 * The whole chart is always on screen at ~28% opacity; advancing `revealed`
 * lights each node and draws each connector, so the sequence reads as one
 * continuous trace. All of it is CSS transitions on `data-on` (see the `.fc-*`
 * rules in index.css) — no per-frame JS.
 */

// Draw order. Connectors are steps too, so the line always arrives before the
// node it points at lights up.
const SEQUENCE = [
  "n-brief",
  "l-brief-plan",
  "n-plan",
  "l-plan-d1",
  "n-d1",
  "l-d1-no",
  "l-d1-yes",
  "n-build",
  "l-build-d2",
  "n-d2",
  "l-d2-no",
  "l-d2-yes",
  "n-ship",
] as const;

type StepKey = (typeof SEQUENCE)[number];

const ORDER = new Map<StepKey, number>(SEQUENCE.map((key, i) => [key, i]));

export const FLOW_STEP_COUNT = SEQUENCE.length;

type Connector = {
  key: StepKey;
  d: string;
  head: string;
  len: number;
  branch?: boolean;
  label?: { text: string; x: number; y: number };
};

const CONNECTORS: Connector[] = [
  {
    key: "l-brief-plan",
    d: "M150,24 L150,34",
    head: "M146,34 L150,40 L154,34 Z",
    len: 16,
  },
  {
    key: "l-plan-d1",
    d: "M150,78 L150,88",
    head: "M146,88 L150,94 L154,88 Z",
    len: 16,
  },
  // "No" — scope isn't settled yet, so loop out LEFT and re-plan.
  {
    key: "l-d1-no",
    d: "M58,124 L28,124 Q14,124 14,110 L14,73 Q14,59 28,59 L56,59",
    head: "M56,55.5 L62,59 L56,62.5 Z",
    len: 180,
    branch: true,
    label: { text: "No", x: 36, y: 118 },
  },
  {
    key: "l-d1-yes",
    d: "M150,154 L150,164",
    head: "M146,164 L150,170 L154,164 Z",
    len: 16,
    label: { text: "Yes", x: 161, y: 163 },
  },
  {
    key: "l-build-d2",
    d: "M150,208 L150,218",
    head: "M146,218 L150,224 L154,218 Z",
    len: 16,
  },
  // "No" — doesn't meet the bar yet, so loop out RIGHT and keep building.
  {
    key: "l-d2-no",
    d: "M242,254 L272,254 Q286,254 286,240 L286,203 Q286,189 272,189 L244,189",
    head: "M244,185.5 L238,189 L244,192.5 Z",
    len: 180,
    branch: true,
    label: { text: "No", x: 264, y: 248 },
  },
  {
    key: "l-d2-yes",
    d: "M150,284 L150,294",
    head: "M146,294 L150,300 L154,294 Z",
    len: 16,
    label: { text: "Yes", x: 161, y: 293 },
  },
];

export default function ProcessFlowchart({ revealed }: { revealed: number }) {
  const on = (key: StepKey) => revealed >= (ORDER.get(key) ?? 0);

  return (
    <svg
      viewBox="0 0 300 326"
      preserveAspectRatio="xMidYMid meet"
      className="mt-3 w-full flex-1"
      role="img"
      aria-labelledby="fc-title fc-desc"
    >
      <title id="fc-title">How a project moves, as a flowchart</title>
      <desc id="fc-desc">
        A brief leads to planning. If scope and constraints aren&apos;t agreed,
        it loops back to planning; once they are, building starts. If the work
        doesn&apos;t meet the definition of done, it loops back to building;
        once it does, it ships and is monitored.
      </desc>

      {/* Faint track: the shape of the whole process, visible from the start. */}
      {CONNECTORS.map((connector) => (
        <path
          key={`track-${connector.key}`}
          className="fc-track"
          d={connector.d}
          fill="none"
        />
      ))}

      {CONNECTORS.map((connector) => (
        <g
          key={connector.key}
          className="fc-link"
          data-on={on(connector.key)}
          style={{ ["--fc-len" as string]: connector.len }}
        >
          <path
            className={`fc-line${connector.branch ? " fc-line--branch" : ""}`}
            d={connector.d}
            fill="none"
          />
          <path
            className={`fc-head${connector.branch ? " fc-head--branch" : ""}`}
            d={connector.head}
          />
          {connector.label && (
            <text
              className="fc-branch-label"
              x={connector.label.x}
              y={connector.label.y}
              textAnchor="middle"
              fontSize="8"
            >
              {connector.label.text}
            </text>
          )}
        </g>
      ))}

      {/* Start */}
      <g className="fc-node" data-on={on("n-brief")}>
        <rect
          className="fc-shape fc-shape--terminator"
          x="98"
          y="2"
          width="104"
          height="22"
          rx="11"
        />
        <text
          className="fc-label fc-label--on-fill"
          x="150"
          y="13"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontWeight="600"
        >
          The brief
        </text>
      </g>

      {/* Plan */}
      <g className="fc-node" data-on={on("n-plan")}>
        <rect
          className="fc-shape"
          x="62"
          y="40"
          width="176"
          height="38"
          rx="9"
        />
        <text
          className="fc-label"
          x="150"
          y="55"
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="600"
        >
          Plan
        </text>
        <text
          className="fc-detail"
          x="150"
          y="69"
          textAnchor="middle"
          fontSize="9"
        >
          scope · milestones · timeline
        </text>
      </g>

      {/* Decision: constraints + what "done" means */}
      <g className="fc-node" data-on={on("n-d1")}>
        <path
          className="fc-shape fc-shape--decision"
          d="M150,94 L242,124 L150,154 L58,124 Z"
        />
        <text
          className="fc-label"
          x="150"
          y="121"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="600"
        >
          Scope &amp; constraints
        </text>
        <text
          className="fc-label"
          x="150"
          y="133"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="600"
        >
          agreed?
        </text>
      </g>

      {/* Build */}
      <g className="fc-node" data-on={on("n-build")}>
        <rect
          className="fc-shape"
          x="62"
          y="170"
          width="176"
          height="38"
          rx="9"
        />
        <text
          className="fc-label"
          x="150"
          y="185"
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="600"
        >
          Build
        </text>
        <text
          className="fc-detail"
          x="150"
          y="199"
          textAnchor="middle"
          fontSize="9"
        >
          small, reviewable steps
        </text>
      </g>

      {/* Decision: does it clear the bar we set? */}
      <g className="fc-node" data-on={on("n-d2")}>
        <path
          className="fc-shape fc-shape--decision"
          d="M150,224 L242,254 L150,284 L58,254 Z"
        />
        <text
          className="fc-label"
          x="150"
          y="251"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="600"
        >
          Meets definition
        </text>
        <text
          className="fc-label"
          x="150"
          y="263"
          textAnchor="middle"
          fontSize="9.5"
          fontWeight="600"
        >
          of done?
        </text>
      </g>

      {/* End */}
      <g className="fc-node" data-on={on("n-ship")}>
        <rect
          className="fc-shape fc-shape--terminator"
          x="98"
          y="300"
          width="104"
          height="22"
          rx="11"
        />
        <text
          className="fc-label fc-label--on-fill"
          x="150"
          y="311"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fontWeight="600"
        >
          Ship &amp; maintain
        </text>
      </g>
    </svg>
  );
}
