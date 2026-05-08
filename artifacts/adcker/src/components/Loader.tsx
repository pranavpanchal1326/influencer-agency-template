import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const duration = 2000;
    const interval = 16;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const raw = currentStep / steps;
      const eased = raw < 0.5 ? 2 * raw * raw : 1 - Math.pow(-2 * raw + 2, 2) / 2;
      const pct = Math.min(Math.floor(eased * 100), 100);
      setProgress(pct);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${eased})`;
      }
      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => setIsVisible(false), 350);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#EFEDEA] text-[#191919]"
        >
          <div className="flex items-center gap-4 text-4xl md:text-6xl font-light">
            <span className="opacity-30">*</span>
            <span className="opacity-30">(</span>
            <div className="w-16 h-16 md:w-24 md:h-24 relative overflow-hidden bg-[#191919]/8">
              <div
                ref={barRef}
                className="absolute inset-0 bg-[#191919] origin-left"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
            <span className="opacity-30">)</span>
            <span className="w-24 text-right tabular-nums">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
