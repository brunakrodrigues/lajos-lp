/* global React */
// LC Monogram — geometric, continuous, flowing.
// Built on a 64×64 grid. The L is a hollow corner bracket; the C is an inverted
// hollow bracket that interlocks with it. Together they read as a system / flow.
// Stroke width = 14 (≈22% of grid), corner radius = 10, gap = 4.

const LCMark = ({
  size = 96,
  variant = "gradient", // gradient | mono-dark | mono-light | accent
  glow = false,
  animated = false,
  id = "lc",
}) => {
  const gradId = `${id}-grad`;
  const accentId = `${id}-accent`;
  const shadowId = `${id}-shadow`;

  // Color resolution
  let fillA, fillB;
  if (variant === "gradient") {
    fillA = `url(#${gradId})`;
    fillB = `url(#${gradId})`;
  } else if (variant === "mono-dark") {
    fillA = "#2B2B2E";
    fillB = "#2B2B2E";
  } else if (variant === "mono-light") {
    fillA = "#FFFFFF";
    fillB = "#FFFFFF";
  } else if (variant === "accent") {
    fillA = "#58C3B5";
    fillB = "#8BD5F0";
  }

  // Geometry — 64×64 viewBox.
  // L  : outer 4,4 → 60,60. We draw an L-shape (vertical bar + horizontal foot)
  //      as a bracket open to the upper-right.
  // C  : a bracket open to the left, interlocking.
  // Both are rendered as rounded rects + cutouts using even-odd fills.

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible", display: "block" }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#58C3B5" />
          <stop offset="100%" stopColor="#8BD5F0" />
        </linearGradient>
        <linearGradient id={accentId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#55F28C" />
          <stop offset="100%" stopColor="#58C3B5" />
        </linearGradient>
        <filter id={shadowId} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" />
          <feOffset dy="1.5" result="off" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.28" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={glow ? `url(#${shadowId})` : undefined}>
        {/* L bracket — open to upper-right.
            Outer rounded square 4,4 → 60,60 with a rectangular cutout in the
            top-right that creates the L shape. */}
        <path
          d="
            M 14 4
            L 60 4
            Q 60 4 60 4
            L 60 18
            L 28 18
            Q 18 18 18 28
            L 18 60
            L 4 60
            L 4 14
            Q 4 4 14 4
            Z
          "
          fill={fillA}
        />

        {/* C bracket — interlocking, open to the left.
            Mirrored / rotated counterpart that hugs the L. */}
        <path
          d="
            M 60 60
            L 24 60
            Q 24 60 24 60
            L 24 46
            L 46 46
            Q 46 46 46 46
            L 46 24
            L 60 24
            L 60 50
            Q 60 60 60 60
            Z
          "
          fill={fillB}
          opacity={variant === "gradient" ? 0.55 : 0.7}
        />

        {/* Accent dot — the "node" / system signal. */}
        <circle
          cx="53"
          cy="11"
          r="3.2"
          fill={
            variant === "mono-dark"
              ? "#2B2B2E"
              : variant === "mono-light"
              ? "#FFFFFF"
              : "#55F28C"
          }
        >
          {animated && (
            <animate
              attributeName="opacity"
              values="1;0.45;1"
              dur="2.4s"
              repeatCount="indefinite"
            />
          )}
        </circle>
      </g>
    </svg>
  );
};

window.LCMark = LCMark;
