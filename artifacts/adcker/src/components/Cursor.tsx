import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

function CursorInner() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const followerRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      followerRef.current = { x: e.clientX, y: e.clientY };

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (el) {
        const style = window.getComputedStyle(el).cursor;
        setIsPointer(style === "pointer");
        const cursorEl = el.closest("[data-cursor]");
        setLabel(cursorEl?.getAttribute("data-cursor") ?? null);
      }
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    let lx = -100;
    let ly = -100;

    const animate = () => {
      lx += (followerRef.current.x - lx) * 0.1;
      ly += (followerRef.current.y - ly) * 0.1;
      setFollower({ x: lx, y: ly });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const hasLabel = Boolean(label);
  const ringSize = hasLabel ? 68 : 40;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: position.x - 4, y: position.y - 4, opacity: isHidden ? 0 : 1 }}
      >
        <div
          className="w-2 h-2 bg-[#191919] transition-transform duration-150"
          style={{ transform: isPointer || hasLabel ? "scale(0)" : "scale(1)" }}
        />
      </motion.div>

      <div
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          transform: `translate(${follower.x - ringSize / 2}px, ${follower.y - ringSize / 2}px)`,
          opacity: isHidden ? 0 : 1,
          transition: "opacity 0.2s",
        }}
      >
        <div
          className="border border-[#191919] flex items-center justify-center transition-all duration-300"
          style={{
            width: ringSize,
            height: ringSize,
            transform: hasLabel ? "scale(1)" : isPointer ? "scale(1.8)" : "scale(1)",
            opacity: hasLabel ? 1 : isPointer ? 0.5 : 0.3,
            background: hasLabel ? "#191919" : "transparent",
          }}
        >
          {hasLabel && (
            <span className="text-[9px] tracking-widest uppercase text-[#EFEDEA] font-medium select-none">
              {label}
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export function Cursor() {
  if (isTouchDevice()) return null;
  return <CursorInner />;
}
