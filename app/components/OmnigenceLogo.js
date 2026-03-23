"use client";

/**
 * Omnigence logo mark (Figma: D6cexhnQMGQwHbb7DJHt8Z · node 297:119 / group 297:108).
 * Flat blue geometry — aligned with the updated site color system.
 */
const MARK = "#2B5BC8";

export default function OmnigenceLogo({ size = 40, className = "", title = "Omnigence", decorative = false }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
    >
      {!decorative && <title>{title}</title>}
      <g transform="translate(40 40)">
        {/* Seven spokes at 12, 1:30, 3, 4:30, 6, 7:30, 9 — 10:30 is the L-piece below */}
        {[0, 45, 90, 135, 180, 225, 270].map((deg) => (
          <rect
            key={deg}
            x={-3.25}
            y={-31}
            width={6.5}
            height={21}
            fill={MARK}
            transform={`rotate(${deg})`}
          />
        ))}
        {/* L corner (Figma: square minus bottom-right quadrant, NW of hub) */}
        <path
          fill={MARK}
          d="M -28 -28 L -10 -28 L -10 -19 L -19 -19 L -19 -10 L -28 -10 Z"
        />
      </g>
    </svg>
  );
}
