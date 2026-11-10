import "./index.css";
import { lazy, Suspense, useEffect, useState } from "react";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Divider from "./components/Divider";
import PetalParticles from "./components/PetalParticles";
import marigoldSwag1 from "./assets/marigold_swag_1.png";
import marigoldSwag2 from "./assets/marigold_swag_2.png";

const NamesSection = lazy(() => import("./components/NamesSection"));
const DateSection = lazy(() => import("./components/DateSection"));
const ClosingSection = lazy(() => import("./components/ClosingSection"));

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ready = () => setLoading(false);
    if (document.fonts?.ready) {
      Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 1800)),
      ]).then(ready);
    } else {
      const timer = setTimeout(ready, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <LoadingScreen show={loading} />
      <PetalParticles />

      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="scallop-top" />
        <div className="paper-texture relative overflow-hidden bg-ivory">
          <Hero />

          <section className="px-6 py-14 sm:py-20">
            <Suspense fallback={null}>
              <NamesSection />
            </Suspense>
          </section>

          <Divider src={marigoldSwag1} alt="" />

          <section className="px-6 py-14 sm:py-20">
            <Suspense fallback={null}>
              <DateSection />
            </Suspense>
          </section>

          <Divider src={marigoldSwag2} alt="" />

          <section className="pb-16 pt-14 sm:pb-20 sm:pt-20">
            <Suspense fallback={null}>
              <ClosingSection />
            </Suspense>
          </section>
        </div>
        <div className="scallop-bottom" />
      </div>
    </>
  );
}
