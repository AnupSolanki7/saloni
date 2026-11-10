import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { letter } from "../data/words";
import { SIGNATURE } from "../data/config";
import { Blossom, Flourish, Heart, Sprig, WaxSeal } from "./Decor";
import FloatingHearts from "./FloatingHearts";

const STEP_MS = 900;

export default function LoveLetter({ onContinue }) {
  const reduce = useReducedMotion();
  const blocks = [letter.greeting, ...letter.paragraphs, "signature"];
  const total = blocks.length;
  const [progress, setShown] = useState(0);
  const shown = reduce ? total : progress; // reduced motion: whole letter at once
  const done = shown >= total;

  // Reveal one paragraph at a time, like it's being written.
  useEffect(() => {
    if (done) return undefined;
    const t = setTimeout(() => setShown((n) => n + 1), shown === 0 ? 500 : STEP_MS);
    return () => clearTimeout(t);
  }, [shown, done]);

  const revealAll = () => setShown(total);

  return (
    <section className="blush-backdrop relative min-h-[100dvh] overflow-hidden px-3 pb-[calc(2.5rem+var(--safe-bottom))] pt-[calc(2rem+var(--safe-top))] sm:px-6 sm:pt-14">
      <FloatingHearts count={9} sparkles={8} />

      <motion.article
        initial={reduce ? false : { opacity: 0, y: 40, rotate: -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        onClick={done ? undefined : revealAll}
        className="paper relative z-10 mx-auto w-full max-w-[38rem] rounded-[3px] px-6 pb-10 pt-12 shadow-[0_2px_3px_rgba(80,30,40,0.08),0_24px_50px_-20px_rgba(122,35,53,0.45)] sm:px-12 sm:pb-14 sm:pt-16"
        aria-label="Birthday letter"
      >
        <span className="tape tape-rose" style={{ top: -12, left: "36%", width: "28%", height: 26 }} aria-hidden="true" />
        <WaxSeal className="absolute -right-2 -top-3 w-14 rotate-12 drop-shadow-[0_3px_4px_rgba(77,21,35,0.3)] sm:w-16" />
        <Sprig className="pointer-events-none absolute -left-1 top-6 w-9 -rotate-12 opacity-70" />
        <Blossom className="pointer-events-none absolute bottom-5 right-5 w-8 opacity-80" />

        {!done && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              revealAll();
            }}
            className="absolute right-16 top-3 rounded-full px-3 py-1.5 font-sans text-[0.72rem] uppercase tracking-[0.18em] text-rose-deep/80 transition hover:bg-blush hover:text-burgundy"
          >
            Show all
          </button>
        )}

        <div className="font-hand text-[clamp(1.32rem,4.9vw,1.62rem)] leading-[1.5] text-ink" aria-live="polite">
          {blocks.map((text, i) => {
            const visible = i < shown;
            const anim = {
              initial: false,
              animate: visible ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 6, filter: "blur(3px)" },
              transition: { duration: reduce ? 0 : 0.9, ease: "easeOut" },
            };
            if (text === "signature") {
              return (
                <motion.div key="sig" {...anim} className="mt-8 text-right" aria-hidden={!visible}>
                  <p>{letter.closing}</p>
                  <p className="mt-1 font-script text-[1.45em] leading-tight text-burgundy">{SIGNATURE}</p>
                </motion.div>
              );
            }
            return (
              <motion.p
                key={i}
                {...anim}
                aria-hidden={!visible}
                className={i === 0 ? "mb-5 text-[1.12em] text-burgundy" : "mb-4"}
              >
                {text}
              </motion.p>
            );
          })}
        </div>

        <motion.div
          initial={false}
          animate={done ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: reduce ? 0 : 0.7, delay: reduce ? 0 : 0.5 }}
          className="mt-10 flex flex-col items-center"
          style={{ pointerEvents: done ? "auto" : "none" }}
        >
          <Flourish className="mb-5 w-40 text-rose" />
          <button
            type="button"
            onClick={onContinue}
            tabIndex={done ? 0 : -1}
            className="group inline-flex min-h-12 items-center gap-2.5 whitespace-nowrap rounded-full border border-burgundy/30 bg-cream/70 px-5 py-2.5 font-hand text-[clamp(1.2rem,5vw,1.45rem)] text-burgundy shadow-sm transition hover:border-burgundy hover:bg-burgundy hover:text-cream"
          >
            <Heart className="h-4 w-4" />
            Turn the page to our story
            <span className="nudge inline-block" aria-hidden="true">→</span>
          </button>
        </motion.div>
      </motion.article>
    </section>
  );
}
