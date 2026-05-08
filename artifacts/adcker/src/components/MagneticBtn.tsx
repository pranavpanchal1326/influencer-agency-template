import { useRef, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";

interface MagneticBtnProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  strength?: number;
  disabled?: boolean;
}

export function MagneticBtn({
  children,
  className = "",
  onClick,
  type = "button",
  strength = 0.28,
  disabled,
}: MagneticBtnProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useSpring(0, { stiffness: 180, damping: 18, restDelta: 0.001 });
  const y = useSpring(0, { stiffness: 180, damping: 18, restDelta: 0.001 });

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={className}
    >
      {children}
    </motion.button>
  );
}
