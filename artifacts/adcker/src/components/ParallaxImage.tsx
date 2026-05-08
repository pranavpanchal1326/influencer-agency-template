import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  strength?: number;
}

export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  strength = 10,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pct = `${strength}%`;
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}`, pct]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ position: "relative" }}>
      <motion.div style={{ y, position: "absolute", inset: 0, scale: 1.22 }}>
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  );
}

interface ParallaxBgProps {
  src: string;
  alt: string;
  children?: ReactNode;
  className?: string;
  strength?: number;
  overlay?: string;
}

export function ParallaxBg({
  src,
  alt,
  children,
  className = "",
  strength = 14,
  overlay = "bg-[#191919]/35",
}: ParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const pct = `${strength}%`;
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}`, pct]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} style={{ position: "relative" }}>
      <motion.div style={{ y, position: "absolute", inset: 0, scale: 1.3 }}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
      {children}
    </div>
  );
}
