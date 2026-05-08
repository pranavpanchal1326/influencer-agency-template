import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/hooks/useLenis";
import { config } from "@/config";

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const reelImages = [
  { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1400&q=85", client: "Campaign 01", tag: "UGC Campaign" },
  { src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85", client: "Campaign 02", tag: "Social Media" },
  { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&q=85", client: "Campaign 03", tag: "Fashion Content" },
  { src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1400&q=85", client: "Campaign 04", tag: "Wellness Campaign" },
  { src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=85", client: "Campaign 05", tag: "Influencer Activation" },
  { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1400&q=85", client: "Campaign 06", tag: "Beauty Campaign" },
  { src: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1400&q=85", client: "Campaign 07", tag: "Brand Identity" },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1400&q=85", client: "Campaign 08", tag: "Social Strategy" },
];

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.45 } },
  exit: { opacity: 0, transition: { duration: 0.35 } },
};

const panel = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.55, ease: EASE } },
  exit: { scale: 0.97, opacity: 0, transition: { duration: 0.3, ease: EASE } },
};

export function VideoModal() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const handler = () => { setOpen(true); setIdx(0); };
    window.addEventListener("showreel:open", handler);
    return () => window.removeEventListener("showreel:open", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop(); else lenis?.start();
    return () => { document.body.style.overflow = ""; getLenis()?.start(); };
  }, [open]);

  const advance = useCallback(() => {
    setIdx(i => (i + 1) % reelImages.length);
  }, []);

  useEffect(() => {
    if (!open || paused) return;
    const id = setInterval(advance, 1800);
    return () => clearInterval(id);
  }, [open, paused, advance]);

  const close = () => setOpen(false);
  const img = reelImages[idx];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="reel-backdrop"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[80] bg-[#191919]/98"
            onClick={close}
          />

          <motion.div
            key="reel-panel"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[90] flex flex-col px-6 md:px-12 pt-8 pb-10"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div className="flex items-center justify-between mb-6 shrink-0">
              <div className="flex items-center gap-6">
                <p className="text-[#EFEDEA]/40 text-xs tracking-widest uppercase">( Showreel )</p>
                <div className="flex gap-1.5">
                  {reelImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`transition-all duration-300 h-px ${i === idx ? "w-8 bg-[#EFEDEA]" : "w-3 bg-[#EFEDEA]/25 hover:bg-[#EFEDEA]/50"}`}
                    />
                  ))}
                </div>
              </div>
              <button
                onClick={close}
                className="text-[#EFEDEA]/40 hover:text-[#EFEDEA] transition-colors duration-200 text-lg leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 relative overflow-hidden min-h-0">
              <AnimatePresence mode="wait">
                <motion.img
                  key={idx}
                  src={img.src}
                  alt={img.client}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              <button
                onClick={() => setIdx(i => (i - 1 + reelImages.length) % reelImages.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#EFEDEA]/60 hover:text-[#EFEDEA] transition-colors text-2xl"
              >
                ←
              </button>
              <button
                onClick={() => setIdx(i => (i + 1) % reelImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#EFEDEA]/60 hover:text-[#EFEDEA] transition-colors text-2xl"
              >
                →
              </button>
            </div>

            <div className="flex items-end justify-between mt-5 shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-[#EFEDEA] text-xl md:text-3xl font-light tracking-tight">{img.client}</p>
                  <p className="text-[#EFEDEA]/40 text-xs tracking-widest uppercase mt-1">{img.tag}</p>
                </motion.div>
              </AnimatePresence>

              <a
                href={config.social.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[#EFEDEA]/50 hover:text-[#EFEDEA] text-xs tracking-widest uppercase transition-colors inline-flex items-center gap-2 group shrink-0 ml-8"
              >
                {config.social.instagramHandle} on Instagram
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
