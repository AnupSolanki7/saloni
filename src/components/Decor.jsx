// Small hand-drawn style SVG ornaments used across the site.

export function Heart({ className = "", style, fill = "currentColor" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path
        fill={fill}
        d="M12 21s-7.6-4.7-9.7-9.4C.8 8.2 3 4.4 6.6 4.4c2.1 0 3.5 1.1 4.4 2.6.9-1.5 2.3-2.6 4.4-2.6 3.6 0 5.8 3.8 4.3 7.2C19.6 16.3 12 21 12 21z"
      />
    </svg>
  );
}

export function HeartOutline({ className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
      <path d="M12 20.5s-7.3-4.5-9.3-9C1.3 8.2 3.4 4.6 6.8 4.6c2 0 3.4 1.1 4.2 2.5.4-.6 1-1.3 1.6-1.7" />
      <path d="M15 4.7c.3 0 .5-.1.8-.1 3.4 0 5.4 3.6 4.1 6.9-2 4.5-7.9 9-7.9 9" />
    </svg>
  );
}

export function Sparkle({ className = "", style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden="true">
      <path fill="currentColor" d="M12 0c.9 7.6 3.9 10.8 12 12-8.1 1.2-11.1 4.4-12 12-.9-7.6-3.9-10.8-12-12 8.1-1.2 11.1-4.4 12-12z" />
    </svg>
  );
}

/** A eucalyptus-like sprig. */
export function Sprig({ className = "", style, color = "var(--color-sage)" }) {
  const leaves = [
    [30, 100, -38], [31, 86, 40], [29, 72, -42], [31, 59, 38], [30, 46, -36], [31, 34, 34], [30, 22, -30],
  ];
  return (
    <svg viewBox="0 0 60 120" className={className} style={style} aria-hidden="true">
      <path d="M31 118C27 92 34 58 30 8" stroke={color} strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {leaves.map(([x, y, r], i) => (
        <ellipse
          key={i}
          cx={x + (r < 0 ? -9 : 9)}
          cy={y}
          rx="9.5"
          ry="5.2"
          fill={color}
          opacity={0.55 + (i % 3) * 0.12}
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
      <ellipse cx="30" cy="8" rx="4" ry="6" fill={color} opacity="0.8" />
    </svg>
  );
}

/** A soft five-petal blossom. */
export function Blossom({ className = "", style, petal = "#f2c9c9", center = "#c0907f" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden="true">
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="20" cy="10.5" rx="7" ry="9.5" fill={petal} stroke="#d99ea3" strokeWidth="0.6" transform={`rotate(${a} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4.2" fill={center} />
      <circle cx="18.6" cy="18.8" r="1.2" fill="#f6e2d6" />
    </svg>
  );
}

/** A layered rose drawn from simple curves. */
export function Rose({ className = "", style, tone = "#e9b7b8", deep = "#c7848d" }) {
  return (
    <svg viewBox="0 0 60 60" className={className} style={style} aria-hidden="true">
      <circle cx="30" cy="30" r="26" fill={tone} />
      <path d="M8 32c4 14 18 22 32 16 8-3 12-10 12-18-6 8-14 12-24 11C18 40 12 37 8 32z" fill={deep} opacity="0.5" />
      <path d="M30 12c-9 0-15 7-15 15 0 7 6 12 13 12 6 0 11-4 11-10 0-5-4-8-8-8-3 0-6 2-6 6" fill="none" stroke={deep} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M21 46c5 3 13 3 19-1M44 18c3 4 4 9 3 14" fill="none" stroke={deep} strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

/** A corner bouquet: roses, blossoms and sprigs. */
export function CornerFloral({ className = "", style, flip = false }) {
  return (
    <div className={`pointer-events-none ${className}`} style={{ ...style, transform: `${style?.transform ?? ""} ${flip ? "scale(-1,-1)" : ""}` }} aria-hidden="true">
      <div className="relative h-full w-full">
        <Sprig className="absolute" style={{ left: "38%", top: "-6%", width: "26%", transform: "rotate(58deg)" }} />
        <Sprig className="absolute" style={{ left: "4%", top: "30%", width: "24%", transform: "rotate(-12deg)" }} />
        <Rose className="absolute" style={{ left: "6%", top: "4%", width: "40%" }} />
        <Rose className="absolute" style={{ left: "36%", top: "24%", width: "24%" }} tone="#f6dcd2" deep="#d4a091" />
        <Blossom className="absolute" style={{ left: "52%", top: "6%", width: "17%" }} />
        <Blossom className="absolute" style={{ left: "12%", top: "50%", width: "15%" }} petal="#fbe6df" />
        {[[64, 30], [70, 18], [26, 64], [58, 40]].map(([l, t], i) => (
          <span key={i} className="absolute rounded-full" style={{ left: `${l}%`, top: `${t}%`, width: 5, height: 5, background: "#f4d9d9", boxShadow: "0 0 0 1px #e2b5b8" }} />
        ))}
      </div>
    </div>
  );
}

/** Engagement ring line illustration. */
export function Ring({ className = "", style }) {
  return (
    <svg viewBox="0 0 80 80" className={className} style={style} aria-hidden="true" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="rg-band" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#e6c2b3" />
          <stop offset="0.5" stopColor="#b97f6c" />
          <stop offset="1" stopColor="#e3b9a6" />
        </linearGradient>
      </defs>
      <ellipse cx="40" cy="52" rx="20" ry="19" stroke="url(#rg-band)" strokeWidth="4" />
      <ellipse cx="40" cy="52" rx="16.5" ry="15.5" stroke="#f3dccf" strokeWidth="1" opacity="0.8" />
      <path d="M33 33l3-6h8l3 6-7 6z" fill="#fff8f4" stroke="#b97f6c" strokeWidth="1.3" />
      <path d="M33 33h14M36 27l4 12 4-12" stroke="#c99a88" strokeWidth="0.9" />
      <path d="M40 14v5M28 20l3 3M52 20l-3 3" stroke="#c0907f" strokeWidth="1.4" />
    </svg>
  );
}

/** Burgundy wax seal with an embossed heart. */
export function WaxSeal({ className = "", style }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id="wax" cx="38%" cy="32%" r="70%">
          <stop offset="0" stopColor="#a8374c" />
          <stop offset="0.6" stopColor="#7a2335" />
          <stop offset="1" stopColor="#541523" />
        </radialGradient>
      </defs>
      <path
        fill="url(#wax)"
        d="M32 2c4 0 5 3 9 3.6 3.6.6 6.4-1.6 9.2.8 2.7 2.4 1.3 5.6 3.2 8.7 1.9 3.1 5.4 3.4 6.2 7 .8 3.6-2.2 5.6-2.2 9.4s3 5.8 2.2 9.4c-.8 3.6-4.3 3.9-6.2 7-1.9 3.1-.5 6.3-3.2 8.7-2.8 2.4-5.6.2-9.2.8C37 57 36 62 32 62s-5-5-9-5.6c-3.6-.6-6.4 1.6-9.2-.8-2.7-2.4-1.3-5.6-3.2-8.7-1.9-3.1-5.4-3.4-6.2-7C3.6 36.3 6.6 34.3 6.6 30.5S3.6 24.7 4.4 21.1c.8-3.6 4.3-3.9 6.2-7 1.9-3.1.5-6.3 3.2-8.7C16.6 3 19.4 5.2 23 4.6 27 4 28 2 32 2z"
      />
      <circle cx="32" cy="32" r="19" fill="none" stroke="#5a1626" strokeWidth="1.6" opacity="0.7" />
      <circle cx="32" cy="32" r="19" fill="none" stroke="#c4566b" strokeWidth="0.7" opacity="0.5" transform="translate(-0.6 -0.6)" />
      <path
        d="M32 42s-9.5-5.8-9.5-12.3c0-3.4 2.6-5.9 5.6-5.9 1.7 0 3 .8 3.9 2.1.9-1.3 2.2-2.1 3.9-2.1 3 0 5.6 2.5 5.6 5.9C41.5 36.2 32 42 32 42z"
        fill="#5f1828"
        stroke="#b4485e"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/** A tiny hand-drawn flourish / divider. */
export function Flourish({ className = "", style }) {
  return (
    <svg viewBox="0 0 160 20" className={className} style={style} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
      <path d="M4 10h56M100 10h56" opacity="0.6" />
      <path d="M60 10c6-7 14-7 14 0s-8 7-8 0 8-6 14-1" />
      <path d="M100 10c-6-7-14-7-14 0s8 7 8 0-8-6-14-1" />
      <path d="M80 4.5c1.6-2 4.6-1.3 4.6 1.2C84.6 8.6 80 11 80 11s-4.6-2.4-4.6-5.3c0-2.5 3-3.2 4.6-1.2z" fill="currentColor" stroke="none" />
    </svg>
  );
}
