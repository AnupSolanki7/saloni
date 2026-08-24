import { motion, useReducedMotion } from "framer-motion";
import kalamkariArch from "../assets/kalamkari_arch.png";
import coupleIllustration from "../assets/couple_illustration.png";
import cornerFloralOrnament from "../assets/corner_floral_ornament.png";
import FloatingOrnament from "./FloatingOrnament";
import NandiCow from "./NandiCow";

// The source PNG has a thin scalloped card-edge sliver baked into its top ~5% —
// bake the trim into the animated clip-path itself, since a separate static
// clip-path style gets clobbered by Framer's own clipPath animation.
const archReveal = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0.6 },
  visible: {
    clipPath: "inset(5% 0% 0% 0%)",
    opacity: 1,
    transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] },
  },
};

const coupleReveal = {
  hidden: { opacity: 0, scale: 0.85, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut", delay: 1.1 },
  },
};

const headline = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 1.9, ease: "easeOut" } },
};

const nameContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.25, delayChildren: 2.3 } },
};

const nameWord = {
  hidden: { opacity: 0, scale: 0.7, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: "backOut" } },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-x-clip px-6 pt-14 pb-10 text-center">
      <FloatingOrnament className="pointer-events-none absolute -left-3 -top-1 h-24 w-24 sm:h-32 sm:w-32" duration={8}>
        <img src={cornerFloralOrnament} alt="" loading="eager" draggable={false} className="h-full w-full select-none" style={{ clipPath: "inset(11% 0% 0% 0%)" }} />
      </FloatingOrnament>
      <FloatingOrnament
        className="pointer-events-none absolute -right-3 -top-1 h-24 w-24 sm:h-32 sm:w-32"
        duration={8.5}
        delay={0.4}
      >
        <img
          src={cornerFloralOrnament}
          alt=""
          loading="eager"
          draggable={false}
          className="h-full w-full select-none"
          style={{ clipPath: "inset(11% 0% 0% 0%)", transform: "scaleX(-1)" }}
        />
      </FloatingOrnament>

      <div className="relative mt-4 flex h-64 w-64 items-center justify-center sm:h-80 sm:w-80">
        <motion.img
          src={kalamkariArch}
          alt=""
          loading="eager"
          draggable={false}
          initial="hidden"
          animate="visible"
          variants={archReveal}
          className="absolute inset-0 h-full w-full select-none object-contain"
        />

        <div className="absolute -bottom-2 -left-2 hidden sm:block">
          <NandiCow width={32} />
        </div>
        <div className="absolute -bottom-2 -right-2 hidden sm:block">
          <NandiCow width={32} flip />
        </div>

        {/*
          The arch's interior opening sits at roughly x:14%-86%, y:23%-100% of
          this square box. The couple PNG is 454x682 with a bleeding ornament
          sliver on its left ~17% and the same scalloped sliver on its top ~5%;
          crop those out (keep region x:76-454, y:36-682) and scale that region
          uniformly to fill this box, so nothing is stretched.
        */}
        <motion.div
          className="absolute overflow-hidden"
          style={{ left: "29.5%", top: "24%", width: "41%", height: "70%" }}
          initial="hidden"
          animate="visible"
          variants={coupleReveal}
        >
          <img
            src={coupleIllustration}
            alt="Saloni and Anup"
            loading="eager"
            draggable={false}
            className="absolute select-none"
            style={{ width: "120.1%", height: "105.6%", left: "-20.1%", top: "-5.6%" }}
          />
        </motion.div>
      </div>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={headline}
        className="mt-6 font-display text-base uppercase tracking-[0.3em] text-maroon-dark/80 sm:text-lg"
      >
        Together with their families,
      </motion.p>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={nameContainer}
        className="mt-2 flex flex-wrap items-baseline justify-center gap-x-4 py-4 leading-[1.4] sm:gap-x-8"
      >
        <motion.span variants={nameWord} className="shimmer-text font-script text-6xl sm:text-8xl">
          Saloni
        </motion.span>
        <motion.span variants={nameWord} className="font-script text-4xl leading-[1.4] text-gold sm:text-6xl">
          &amp;
        </motion.span>
        <motion.span variants={nameWord} className="shimmer-text font-script text-6xl sm:text-8xl">
          Anup
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: prefersReducedMotion ? 0 : [0, 8, 0] }}
        transition={{
          opacity: { delay: 3.2, duration: 0.6 },
          y: { delay: 3.2, duration: 1.8, repeat: prefersReducedMotion ? 0 : Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-6 text-gold"
        aria-hidden="true"
      >
        <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
          <path d="M10 0 V24 M2 16 L10 24 L18 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
