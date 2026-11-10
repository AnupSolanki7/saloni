import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BirthdayIntro from "./components/BirthdayIntro";
import LoveLetter from "./components/LoveLetter";
import Album from "./components/Album";
import MusicToggle from "./components/MusicToggle";
import { MUSIC_SRC } from "./data/config";
import { useMusic } from "./lib/useMusic";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.45, ease: "easeIn" } },
};

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro → letter → album
  const music = useMusic(MUSIC_SRC);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  return (
    <>
      <MusicToggle music={music} />
      <AnimatePresence mode="wait">
        {screen === "intro" && (
          <motion.div key="intro" {...fade}>
            <BirthdayIntro onFirstInteraction={music.start} onOpen={() => setScreen("letter")} />
          </motion.div>
        )}
        {screen === "letter" && (
          <motion.div key="letter" {...fade}>
            <LoveLetter onContinue={() => setScreen("album")} />
          </motion.div>
        )}
        {screen === "album" && (
          <motion.div key="album" {...fade}>
            <Album onReplay={() => setScreen("intro")} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
