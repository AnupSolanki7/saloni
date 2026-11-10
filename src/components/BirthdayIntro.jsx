import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, WaxSeal, CornerFloral, Flourish } from "./Decor";
import FloatingHearts from "./FloatingHearts";

const OPEN_MS = 1750;

export default function BirthdayIntro({ onOpen, onFirstInteraction }) {
  const reduce = useReducedMotion();
  const [opening, setOpening] = useState(false);
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onFirstInteraction?.(); // runs inside the click, so audio is allowed to start
    timer.current = setTimeout(onOpen, reduce ? 150 : OPEN_MS);
  };

  const ease = [0.22, 1, 0.36, 1];
  const fadeUp = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <section className="blush-backdrop relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 pb-[calc(1.5rem+var(--safe-bottom))] pt-[calc(1.5rem+var(--safe-top))] text-center">
      <FloatingHearts count={16} sparkles={12} />
      <CornerFloral className="absolute -left-6 -top-6 h-44 w-44 opacity-90 sm:h-64 sm:w-64" />
      <CornerFloral flip className="absolute -bottom-6 -right-6 h-44 w-44 opacity-90 sm:h-64 sm:w-64" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <motion.p {...fadeUp(0.2)} className="font-hand text-[clamp(1.35rem,5.6vw,1.8rem)] text-rose-deep">
          A little something for you...
        </motion.p>

        <motion.h1
          {...fadeUp(0.5)}
          className="-mt-1 font-script text-[clamp(4.2rem,21vw,7.5rem)] leading-[1.05] text-burgundy [text-shadow:0_2px_18px_rgba(199,138,144,0.35)]"
        >
          Saloni
        </motion.h1>

        <motion.div {...fadeUp(0.85)} className="my-[clamp(0.9rem,3.5dvh,2rem)]">
          <div className="envelope">
            <div className="envelope-back" />
            <motion.div
              className="envelope-letter paper flex flex-col items-center justify-start pt-[12%]"
              initial={false}
              style={{ zIndex: 1 }}
              animate={opening ? { y: "-52%" } : { y: "0%" }}
              transition={{ delay: reduce ? 0 : 0.85, duration: 0.8, ease }}
            >
              <span className="font-hand text-[clamp(1rem,4.4vw,1.35rem)] text-ink">My dearest Saloni,</span>
              <Flourish className="mt-1 w-1/2 text-rose" />
              <Heart className="mt-2 h-4 w-4 text-burgundy" />
            </motion.div>
            <div className="envelope-pocket" style={{ zIndex: 2 }} />
            <motion.div
              className="envelope-flap"
              initial={false}
              animate={opening ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 4 }}
              transition={{ rotateX: { delay: reduce ? 0 : 0.2, duration: 0.65, ease }, zIndex: { delay: reduce ? 0 : 0.55, duration: 0 } }}
            />
            <motion.div
              className="absolute left-1/2 top-[58%] z-[5] w-[21%] -translate-x-1/2 -translate-y-1/2"
              initial={false}
              animate={opening ? { scale: 0.4, opacity: 0, rotate: -25 } : { scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <WaxSeal className="h-auto w-full drop-shadow-[0_3px_4px_rgba(77,21,35,0.35)]" />
            </motion.div>
          </div>
        </motion.div>

        <motion.p {...fadeUp(1.15)} className="font-serif text-[clamp(1.55rem,6.6vw,2.3rem)] italic leading-tight text-wine">
          Happy Birthday, My Love <span aria-hidden="true">❤️</span>
        </motion.p>

        <motion.div {...fadeUp(1.45)} className="mt-[clamp(1.1rem,3.5dvh,2rem)]">
          <button
            type="button"
            onClick={handleOpen}
            disabled={opening}
            className="group inline-flex min-h-12 items-center gap-2.5 rounded-full bg-burgundy px-7 py-3.5 font-sans text-[0.95rem] tracking-wide text-cream shadow-[0_10px_24px_-8px_rgba(122,35,53,0.7)] transition hover:-translate-y-0.5 hover:bg-wine active:translate-y-0 disabled:opacity-80"
          >
            <Heart className="h-4 w-4 text-rosegold-light transition group-hover:scale-110" />
            {opening ? "Opening…" : "Open Your Birthday Letter"}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
