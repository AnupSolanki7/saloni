import { motion, useReducedMotion } from "framer-motion";

export default function FloatingOrnament({
  children,
  className = "",
  duration = 7,
  y = 6,
  rotate = 1.5,
  delay = 0,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={
        prefersReducedMotion
          ? undefined
          : { y: [0, -y, 0], rotate: [0, rotate, 0, -rotate, 0] }
      }
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}
