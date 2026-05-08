import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Loader } from "./Loader";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Cursor } from "./Cursor";
import { ContactModal } from "./ContactModal";
import { VideoModal } from "./VideoModal";
import { useLenis, getLenis } from "@/hooks/useLenis";

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-px origin-left bg-[#191919]"
      style={{ scaleX }}
    />
  );
}

function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      setVisible(pct > 0.4);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.92 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-8 right-8 z-50"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("contact:open"))}
            className="relative flex items-center gap-3 bg-[#191919] text-[#EFEDEA] px-5 py-3 text-[10px] tracking-widest uppercase font-medium hover:bg-[#191919]/85 transition-colors duration-300 group"
          >
            {/* sonar ping ring */}
            <span
              className="absolute inset-0 bg-[#191919] opacity-50"
              style={{ animation: "contact-ping 2.4s cubic-bezier(0.4,0,0.6,1) infinite" }}
            />
            {/* dot */}
            <span className="relative w-1.5 h-1.5 bg-[#EFEDEA] shrink-0" />
            <span className="relative">Let's talk</span>
            <span className="relative group-hover:translate-x-0.5 transition-transform inline-block">→</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

export function Layout({ children }: { children: React.ReactNode }) {
  useLenis();

  return (
    <div className="min-h-screen bg-[#EFEDEA] text-[#191919] font-sans selection:bg-[#191919] selection:text-[#EFEDEA] cursor-none">
      <ScrollToTop />
      <ScrollProgressBar />
      <Cursor />
      <Loader />
      <Nav />
      <FloatingContact />
      <ContactModal />
      <VideoModal />
      <main className="relative z-10 w-full overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
}
