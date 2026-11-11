import { motion, AnimatePresence } from "framer-motion";
import marigoldFlower from "../assets/marigold_flower_single.png";

export default function LoadingScreen({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-ivory"
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
        >
          <motion.img
            src={marigoldFlower}
            alt=""
            className="h-20 w-auto"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 4, 0, -4, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.p
            className="mt-4 font-script text-2xl text-maroon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Saloni &amp; Anup
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
