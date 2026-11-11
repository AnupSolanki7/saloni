import { Heart, Sparkle } from "./Decor";

// Deterministic pseudo-random so the layout is stable across renders.
const rand = (seed) => {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
};

const COLORS = ["#d48f98", "#e8b4b8", "#c0907f", "#b65a6b", "#f0c9c6"];

export default function FloatingHearts({ count = 14, sparkles = 10, className = "" }) {
  const hearts = Array.from({ length: count }, (_, i) => ({
    left: rand(i + 1) * 100,
    size: 10 + rand(i + 7) * 18,
    d: 14 + rand(i + 13) * 12,
    delay: -rand(i + 21) * 26,
    sway: (rand(i + 31) - 0.5) * 70,
    o: 0.25 + rand(i + 41) * 0.35,
    color: COLORS[i % COLORS.length],
  }));
  const twinkles = Array.from({ length: sparkles }, (_, i) => ({
    left: rand(i + 101) * 100,
    top: rand(i + 111) * 100,
    size: 7 + rand(i + 121) * 9,
    d: 3 + rand(i + 131) * 4,
    delay: -rand(i + 141) * 6,
  }));

  return (
    <div className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {hearts.map((h, i) => (
        <span
          key={`h${i}`}
          className="float-heart"
          style={{
            left: `${h.left}%`,
            width: h.size,
            height: h.size,
            color: h.color,
            "--d": `${h.d}s`,
            "--delay": `${h.delay}s`,
            "--sway": `${h.sway}px`,
            "--o": h.o,
          }}
        >
          <Heart className="h-full w-full" />
        </span>
      ))}
      {twinkles.map((s, i) => (
        <span
          key={`s${i}`}
          className="twinkle text-rosegold"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, "--d": `${s.d}s`, "--delay": `${s.delay}s` }}
        >
          <Sparkle className="h-full w-full" />
        </span>
      ))}
    </div>
  );
}
