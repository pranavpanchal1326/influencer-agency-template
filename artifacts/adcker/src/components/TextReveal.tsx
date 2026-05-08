import { motion } from "framer-motion";
import { ReactNode } from "react";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: "onMount" | "inView";
  duration?: number;
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  trigger = "inView",
  duration = 0.85,
}: TextRevealProps) {
  const transition = { duration, ease: EASE, delay };

  if (trigger === "onMount") {
    return (
      <div className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: "105%" }}
          animate={{ y: "0%" }}
          transition={transition}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-20px" }}
        transition={transition}
      >
        {children}
      </motion.div>
    </div>
  );
}
