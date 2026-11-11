import { motion } from "framer-motion";
import verticalBorder from "../assets/vertical_border_pattern.png";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

function Person({ name, relation, parents }) {
  return (
    <motion.div variants={item} className="flex flex-col items-center text-center">
      <p className="font-display text-2xl font-semibold tracking-[0.15em] text-maroon sm:text-3xl">
        {name}
      </p>
      <p className="mt-2 max-w-[16rem] text-sm text-maroon-dark/80 sm:text-base">
        {relation}
        <br />
        {parents}
      </p>
    </motion.div>
  );
}

export default function NamesSection() {
  return (
    <div className="relative flex justify-center">
      <motion.div
        className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <Person name="SALONI" relation="Daughter of" parents="Meena & Ashok Devda" />

        <motion.span
          variants={item}
          className="font-script text-4xl text-gold sm:text-5xl"
          aria-hidden="true"
        >
          &amp;
        </motion.span>

        <Person name="ANUP" relation="Son of" parents="Babita & KrishnaGopal Solanki" />
      </motion.div>
    </div>
  );
}
