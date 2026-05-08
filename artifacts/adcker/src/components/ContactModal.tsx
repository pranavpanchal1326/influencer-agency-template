import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getLenis } from "@/hooks/useLenis";
import { config } from "@/config";

const services = [
  "Branding & Design",
  "Social Media Strategy",
  "UGC & Affiliate",
  "Influencer Campaigns",
  "LATAM Market Expansion",
  "Other",
];

const overlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

const EASE = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

const panel = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: EASE } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.4, ease: EASE } },
};

type Status = "idle" | "sending" | "success" | "error";

export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", brand: "", email: "", service: "", message: "" });
  const firstRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = () => { setOpen(true); setStatus("idle"); };
    window.addEventListener("contact:open", handler);
    return () => window.removeEventListener("contact:open", handler);
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
      setTimeout(() => firstRef.current?.focus(), 400);
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => { document.body.style.overflow = ""; getLenis()?.start(); };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setTimeout(() => {
        setOpen(false);
        setForm({ name: "", brand: "", email: "", service: "", message: "" });
        setStatus("idle");
      }, 2400);
    } catch {
      setStatus("error");
    }
  };

  const field = "w-full bg-transparent border-b border-[#EFEDEA]/20 py-4 text-[#EFEDEA] placeholder:text-[#EFEDEA]/30 text-sm focus:outline-none focus:border-[#EFEDEA]/70 transition-colors duration-300";

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            variants={overlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[80] bg-[#191919]/75 backdrop-blur-sm"
            onClick={close}
          />

          <motion.div
            key="panel"
            variants={panel}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-0 left-0 right-0 z-[90] bg-[#191919] text-[#EFEDEA] px-6 md:px-16 pt-12 pb-16 max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-14 max-w-4xl mx-auto">
              <div>
                <p className="text-xs tracking-widest uppercase opacity-40 mb-3">( Start a project )</p>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter uppercase leading-[0.9]">
                  Let's work<br />together
                </h2>
              </div>
              <button
                onClick={close}
                className="text-[#EFEDEA]/50 hover:text-[#EFEDEA] transition-colors duration-200 text-xl mt-1 leading-none shrink-0 ml-8"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto flex flex-col items-center justify-center py-16 gap-4 text-center"
              >
                <div className="text-5xl font-light opacity-20 mb-2">✓</div>
                <p className="text-lg font-light">Message received.</p>
                <p className="text-xs tracking-widest uppercase opacity-40">We'll be in touch soon</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16">
                  <div className="flex flex-col gap-0">
                    <div className="mb-6">
                      <input
                        ref={firstRef}
                        required
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={field}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        required
                        type="text"
                        placeholder="Brand / Company"
                        value={form.brand}
                        onChange={e => setForm(f => ({ ...f, brand: e.target.value }))}
                        className={field}
                      />
                    </div>
                    <div className="mb-6">
                      <input
                        required
                        type="email"
                        placeholder="Your email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={field}
                      />
                    </div>
                    <div className="mb-6">
                      <select
                        required
                        value={form.service}
                        onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                        className={`${field} appearance-none`}
                      >
                        <option value="" disabled>Service you need</option>
                        {services.map(s => (
                          <option key={s} value={s} className="bg-[#191919]">{s}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <textarea
                      required
                      rows={8}
                      placeholder="Tell us about your project…"
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={`${field} resize-none`}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs tracking-widest uppercase text-red-400/70 mt-6"
                  >
                    Something went wrong — please try again or email {config.agency.email}
                  </motion.p>
                )}

                <div className="flex items-center justify-between mt-14 border-t border-[#EFEDEA]/10 pt-8">
                  <p className="text-xs tracking-widest uppercase opacity-30">{config.agency.email}</p>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="border border-[#EFEDEA] px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-[#EFEDEA] hover:text-[#191919] transition-colors duration-300 flex items-center gap-3 group disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? "Sending…" : "Send message"}
                    {status !== "sending" && (
                      <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
