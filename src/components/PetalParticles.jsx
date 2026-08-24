import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import marigoldFlower from "../assets/marigold_flower_single.png";

export default function PetalParticles({ count = 8 }) {
  const prefersReducedMotion = useReducedMotion();

  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: (i * 97) % 100,
        size: 20 + ((i * 13) % 18),
        duration: 18 + ((i * 7) % 12),
        delay: (i * 1.9) % 14,
        spinDir: i % 2 === 0 ? 1 : -1,
      })),
    [count]
  );

  if (prefersReducedMotion) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <motion.img
          key={p.id}
          src={marigoldFlower}
          alt=""
          className="absolute block opacity-25"
          style={{
            left: `${p.left}%`,
            top: "-8%",
            width: p.size,
          }}
          animate={{
            y: ["0vh", "112vh"],
            x: [0, 15, -10, 0],
            rotate: [0, 90 * p.spinDir, 200 * p.spinDir],
            opacity: [0, 0.28, 0.28, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
