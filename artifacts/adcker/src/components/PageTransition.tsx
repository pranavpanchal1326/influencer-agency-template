import { motion } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div style={{ position: "relative" }}>
      {/* Dark panel wipe — covers on exit, lifts on enter */}
      <motion.div
        className="fixed inset-0 z-[65] bg-[#191919] pointer-events-none"
        initial={{ y: "0%" }}
        animate={{ y: "-100%", transition: { duration: 0.65, ease: EASE } }}
        exit={{ y: "0%", transition: { duration: 0.45, ease: EASE } }}
      />
      {children}
    </motion.div>
  );
}
