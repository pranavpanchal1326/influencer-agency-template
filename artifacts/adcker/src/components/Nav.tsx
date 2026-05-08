import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/hooks/useLenis";
import { config } from "@/config";

const NAV_LINKS = [
  { href: "/", label: "Index", sublabel: "Home" },
  { href: "/services", label: "Services", sublabel: "What we do" },
  { href: "/our-work", label: "Our Work", sublabel: "Projects" },
  { href: "/about", label: "About", sublabel: "Who we are" },
  { href: "#contact", label: "Contact", sublabel: "Get in touch", isContact: true },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) lenis?.stop(); else lenis?.start();
    return () => { document.body.style.overflow = ""; getLenis()?.start(); };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof NAV_LINKS[0]) => {
    if (link.isContact) {
      e.preventDefault();
      setIsOpen(false);
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("contact:open"));
      }, 400);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-40 flex items-center justify-between px-6 md:px-10 transition-all duration-500 ${
          isOpen ? "py-6 md:py-8" : scrolled ? "py-4 md:py-5 bg-[#EFEDEA]/90 backdrop-blur-sm border-b border-[#191919]/10" : "py-6 md:py-8"
        }`}
      >
        {/* Logo mark — replace with your own */}
        <Link href="/" className="z-50 flex items-center gap-2.5 hover:opacity-60 transition-opacity">
          <div className={`w-[18px] h-[18px] relative flex-shrink-0 transition-colors duration-300 ${isOpen ? "bg-[#EFEDEA]" : "bg-[#191919]"}`}>
            <div className={`absolute inset-[5px] transition-colors duration-300 ${isOpen ? "bg-[#191919]" : "bg-[#EFEDEA]"}`} />
          </div>
          <span className={`text-[11px] font-semibold tracking-[0.28em] uppercase transition-colors duration-300 ${isOpen ? "text-[#EFEDEA]" : "text-[#191919]"}`}>
            {config.agency.name}
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`z-50 text-xs tracking-widest uppercase hover:opacity-60 transition-all duration-300 ${isOpen ? "text-[#EFEDEA]" : "text-[#191919]"}`}
        >
          {isOpen ? "Close" : "Menu"}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 bg-[#191919] text-[#EFEDEA] flex flex-col justify-center px-6 md:px-10"
          >
            <div className="flex flex-col gap-2 md:gap-4 mt-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                  className="border-b border-[#EFEDEA]/10 py-6 md:py-8"
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className="group flex items-baseline justify-between"
                  >
                    <span className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight group-hover:italic transition-all duration-300">
                      {link.label}
                    </span>
                    <span className="text-xs tracking-widest uppercase opacity-40 group-hover:opacity-70 transition-opacity">
                      {link.sublabel}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-8 left-6 md:left-10 right-6 md:right-10 flex flex-col md:flex-row justify-between text-xs tracking-wider gap-3 opacity-50"
            >
              <span>Email: <a href={`mailto:${config.agency.email}`} className="hover:opacity-80 hover:underline">{config.agency.email}</a></span>
              <span>Instagram: <a href={config.social.instagramUrl} target="_blank" rel="noreferrer" className="hover:opacity-80 hover:underline">{config.social.instagramHandle}</a></span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
