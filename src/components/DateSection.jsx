import { motion } from "framer-motion";
import GarlandSwag from "./GarlandSwag";
import ToranBunting from "./ToranBunting";
import { downloadSaveTheDate } from "../utils/ics";

const swing = {
  hidden: { rotate: -8, opacity: 0, y: -10 },
  visible: {
    rotate: 0,
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 8, delay: 0.1 },
  },
};

const buntingReveal = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 200, damping: 14, delay: 0.7 },
  },
};

const stamp = {
  hidden: { scale: 0, opacity: 0, rotate: -6 },
  visible: {
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 220, damping: 14, delay: 1.1 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 1.4 } },
};

export default function DateSection() {
  return (
    <motion.div
      className="mx-auto flex max-w-xs flex-col items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <motion.div variants={swing} style={{ transformOrigin: "top center" }}>
        <GarlandSwag width={260} className="sm:hidden" />
        <GarlandSwag width={300} className="hidden sm:block" />
      </motion.div>

      <motion.div variants={buntingReveal} className="-mt-2">
        <ToranBunting width={260} className="sm:hidden" />
        <ToranBunting width={300} className="hidden sm:block" />
      </motion.div>

      <motion.div
        variants={stamp}
        className="relative -mt-3 rounded-lg border-2 border-gold bg-ivory-light px-8 py-5 text-center shadow-[0_6px_20px_rgba(122,31,43,0.15)]"
      >
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full border-2 border-gold bg-ivory-light" />
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full border-2 border-gold bg-ivory-light" />
        <span className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full border-2 border-gold bg-ivory-light" />
        <span className="absolute -bottom-2 -right-2 h-4 w-4 rounded-full border-2 border-gold bg-ivory-light" />
        <p className="font-display text-3xl font-semibold tracking-wide text-maroon sm:text-4xl">
          24 FEB 2027
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-4 flex items-center gap-3 font-display text-lg tracking-wide text-maroon-dark sm:text-xl"
      >
        <span>WEDNESDAY</span>
        <span className="h-4 w-px bg-gold/60" />
        <span className="text-center leading-tight">
          Evening
          <br />
          <span className="text-sm font-body italic text-maroon-dark/70">Venues to be announced</span>
        </span>
      </motion.div>

      <motion.button
        type="button"
        onClick={downloadSaveTheDate}
        variants={fadeUp}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="animate-pulse-glow mt-6 rounded-full bg-maroon px-6 py-2.5 font-display text-sm font-semibold tracking-widest text-ivory-light shadow-md transition-colors hover:bg-maroon-dark sm:text-base"
      >
        SAVE THE DATE
      </motion.button>
    </motion.div>
  );
}
