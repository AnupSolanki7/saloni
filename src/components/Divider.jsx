import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function Divider({ src, alt = "", className = "", width = "w-56 sm:w-72", imgStyle }) {
  return (
    <motion.div
      className={`mx-auto flex justify-center ${width} ${className}`}
      style={{ transformOrigin: "center" }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
      variants={reveal}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full select-none"
        draggable={false}
        style={imgStyle}
      />
    </motion.div>
  );
}
