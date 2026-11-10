import { motion } from "framer-motion";
import kalashPots from "../assets/kalash_pots.png";
import weddingItemsPotli from "../assets/wedding_items_potli.png";
import FloatingOrnament from "./FloatingOrnament";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export default function ClosingSection() {
  return (
    <div className="relative flex flex-col items-center px-6 py-10">
      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        variants={fadeUp}
        className="max-w-sm text-center font-display text-xl italic text-maroon sm:text-2xl"
      >
        We solicit your presence &amp; blessings
      </motion.p>

      <div className="mt-8 flex w-full max-w-lg items-end justify-between">
        <FloatingOrnament duration={6.5}>
          <img
            src={kalashPots}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-20 w-24 select-none sm:h-24 sm:w-28"
            style={{ objectFit: "cover", objectPosition: "50% 100%", clipPath: "inset(18% 0% 0% 0%)" }}
          />
        </FloatingOrnament>
        <FloatingOrnament duration={7.5} delay={0.3}>
          <img
            src={weddingItemsPotli}
            alt=""
            loading="lazy"
            draggable={false}
            className="h-16 w-28 select-none sm:h-20 sm:w-32"
            style={{ objectFit: "cover", objectPosition: "50% 100%", clipPath: "inset(20% 0% 0% 0%)" }}
          />
        </FloatingOrnament>
      </div>
    </div>
  );
}
