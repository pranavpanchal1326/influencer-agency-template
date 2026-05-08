import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { Link } from "wouter";
import { TextReveal } from "@/components/TextReveal";
import { MagneticBtn } from "@/components/MagneticBtn";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
};

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

const servicesList = [
  {
    id: "01",
    title: "Branding, Design, Photography, and Video",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=900&q=85",
    desc: "We craft high-quality visuals that bring your brand to life — from strategic design and identity to photography and video production. Every asset is created to engage your audience, tell your story, and elevate your brand presence across all channels.",
    tag: "Identity · Visuals",
  },
  {
    id: "02",
    title: "Social Media Strategy and Community Management",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&q=85",
    desc: "We develop tailored strategies that build an authentic brand presence, blending strategic content, engaging copy, and a distinct brand voice to create real connections with your audience.",
    tag: "Strategy · Growth",
  },
  {
    id: "03",
    title: "UGC and Affiliate Recruitment and Activation",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
    desc: "We identify and recruit creators whose style aligns with the brand, onboard them, provide video guidelines, support the production of authentic content, and refine it into polished, ready-to-use assets.",
    tag: "UGC · Creator",
  },
  {
    id: "04",
    title: "Influencer Strategy and Collaboration (US & LATAM)",
    image: "https://images.unsplash.com/photo-1598128558393-70ff21433be0?w=900&q=85",
    desc: "We build game-changing partnerships and connect your brand with the right influencers — from nano to celebrity — to build authentic relationships and drive meaningful impact in the U.S. and LATAM markets.",
    tag: "Influencer · Campaigns",
  },
  {
    id: "05",
    title: "LATAM and U.S. Latin Market Expansion",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85",
    desc: "Breaking into LATAM or the U.S. Latin market requires more than translation. We help brands localize their voice, tap regional trends, and build authentic connections through social strategy, influencer campaigns, and cross-cultural insights.",
    tag: "LATAM · Expansion",
  }
];

function ServiceSwiper() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((next: number, direction?: number) => {
    const d = direction ?? (next > active ? 1 : -1);
    setDir(d);
    setActive(next);
  }, [active]);

  const goNext = useCallback(() => {
    goTo((active + 1) % servicesList.length, 1);
  }, [active, goTo]);

  const goPrev = useCallback(() => {
    goTo((active - 1 + servicesList.length) % servicesList.length, -1);
  }, [active, goTo]);

  useEffect(() => {
    if (paused) { if (intervalRef.current) clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(goNext, 5500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, goNext]);

  const s = servicesList[active];

  const imageVariants = {
    enter: (d: number) => ({ x: d > 0 ? "8%" : "-8%", opacity: 0, scale: 1.06 }),
    center: { x: "0%", opacity: 1, scale: 1, transition: { duration: 0.85, ease: EASE } },
    exit: (d: number) => ({ x: d > 0 ? "-6%" : "6%", opacity: 0, scale: 0.97, transition: { duration: 0.55, ease: EASE } }),
  };

  const textVariants = {
    enter: (d: number) => ({ x: d > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.7, ease: EASE, delay: 0.1 } },
    exit: (d: number) => ({ x: d > 0 ? -30 : 30, opacity: 0, transition: { duration: 0.45, ease: EASE } }),
  };

  return (
    <section
      className="relative border-t border-[#191919]/10 overflow-hidden"
      style={{ minHeight: "100vh" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Text panel */}
        <div className="relative flex flex-col justify-center px-6 md:px-16 py-20 lg:py-32 z-10 order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[10px] tracking-[0.25em] uppercase opacity-30">Services</span>
            <div className="flex gap-2">
              {servicesList.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`transition-all duration-400 h-px ${i === active ? "w-8 bg-[#191919]" : "w-3 bg-[#191919]/25 hover:bg-[#191919]/50"}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={active} custom={dir} variants={textVariants} initial="enter" animate="center" exit="exit">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-xs font-medium border border-[#191919]/40 w-10 h-10 flex items-center justify-center tracking-wider shrink-0">
                  {s.id}
                </span>
                <span className="text-[10px] tracking-widest uppercase opacity-40">{s.tag}</span>
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light uppercase tracking-tight leading-[1.05] mb-8 max-w-lg">
                {s.title}
              </h3>

              <p className="text-base md:text-lg font-light leading-relaxed opacity-60 mb-12 max-w-md">
                {s.desc}
              </p>

              <Link href="/our-work" className="text-xs tracking-widest uppercase font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-2 group">
                See our work
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-5 mt-16 md:mt-20">
            <button
              onClick={goPrev}
              className="w-11 h-11 border border-[#191919]/30 flex items-center justify-center hover:bg-[#191919] hover:text-[#EFEDEA] hover:border-[#191919] transition-all duration-300 text-sm group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
            </button>
            <button
              onClick={goNext}
              className="w-11 h-11 border border-[#191919]/30 flex items-center justify-center hover:bg-[#191919] hover:text-[#EFEDEA] hover:border-[#191919] transition-all duration-300 text-sm group"
            >
              <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
            </button>
            <span className="text-xs tracking-widest uppercase opacity-30 ml-2 tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(servicesList.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Image panel */}
        <div className="relative overflow-hidden order-1 lg:order-2 aspect-[4/3] lg:aspect-auto min-h-[40vh] lg:min-h-0">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={active} custom={dir} variants={imageVariants} initial="enter" animate="center" exit="exit" className="absolute inset-0">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-8 right-8 pointer-events-none select-none z-10">
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 0.12, y: 0, transition: { duration: 0.6 } }}
                exit={{ opacity: 0 }}
                className="text-[#EFEDEA] text-[10rem] font-light leading-none"
              >
                {s.id}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Number tabs */}
      <div className="border-t border-[#191919]/10 grid grid-cols-5">
        {servicesList.map((item, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`py-5 text-center text-xs tracking-widest uppercase transition-all duration-300 border-r border-[#191919]/10 last:border-r-0 relative ${
              i === active ? "bg-[#191919] text-[#EFEDEA]" : "hover:bg-[#191919]/5 opacity-40 hover:opacity-80"
            }`}
          >
            {item.id}
          </button>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { num: "01", title: "Strategy", sub: "Define the game plan", desc: "We audit your brand, map your audience, and set measurable goals. Every campaign starts with a clear blueprint — the right channels, the right message, and the right moment." },
  { num: "02", title: "Casting", sub: "Find the perfect voices", desc: "From our network of 200+ vetted creators, we identify influencers whose aesthetic, audience, and values align with your brand — nano, micro, macro, or celebrity." },
  { num: "03", title: "Content", sub: "Create what stops the scroll", desc: "Creators produce authentic, brief-aligned content. We review, refine, and deliver campaign-ready assets — photography, video, UGC — that feel real because they are." },
  { num: "04", title: "Launch", sub: "Go live with precision", desc: "We coordinate publishing windows across platforms to hit peak engagement. Every post, story, and reel goes out at exactly the right time to the right audience." },
  { num: "05", title: "Reporting", sub: "Measure everything", desc: "Full campaign analytics, reach, impressions, engagement rates, and earned media value — delivered in a clear report with insights that fuel the next campaign." }
];

function StepContent({ step, align }: { step: typeof steps[0]; align: "left" | "right" }) {
  return (
    <div className={align === "right" ? "lg:text-right" : ""}>
      <p className="text-xs tracking-widest uppercase opacity-40 mb-2">{step.num}</p>
      <h3 className="text-2xl lg:text-4xl font-light uppercase tracking-tight mb-2 leading-[1]">{step.title}</h3>
      <p className="text-xs tracking-widest uppercase opacity-50 mb-5 italic">{step.sub}</p>
      <p className="text-base font-light leading-relaxed opacity-70">{step.desc}</p>
    </div>
  );
}

function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 0.85", "end 0.25"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="py-32 px-6 md:px-16 border-t border-[#191919]/10">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }} className="mb-24">
          <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase opacity-50 mb-6">( How we work )</motion.p>
          <motion.h2 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tighter uppercase leading-[0.9]">The process</motion.h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[#191919]/10 pointer-events-none">
            <motion.div className="absolute top-0 left-0 w-full bg-[#191919] origin-top" style={{ scaleY: lineScaleY, height: "100%" }} />
          </div>
          <div className="lg:hidden absolute left-0 top-0 bottom-0 w-px bg-[#191919]/10 pointer-events-none">
            <motion.div className="absolute top-0 left-0 w-full bg-[#191919] origin-top" style={{ scaleY: lineScaleY, height: "100%" }} />
          </div>

          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div key={step.num} className="relative grid grid-cols-1 lg:grid-cols-2">
                <motion.div initial={{ scale: 0, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.35, delay: 0.1 }} className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 border border-[#191919] bg-[#EFEDEA] items-center justify-center z-10">
                  <div className="w-2 h-2 bg-[#191919]" />
                </motion.div>
                <div className="lg:hidden absolute -left-[9px] top-10 w-4 h-4 border border-[#191919] bg-[#EFEDEA] flex items-center justify-center z-10">
                  <div className="w-1.5 h-1.5 bg-[#191919]" />
                </div>
                {isLeft ? (
                  <>
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="pl-8 lg:pl-0 lg:pr-20 py-10 lg:text-right">
                      <StepContent step={step} align="right" />
                    </motion.div>
                    <div className="hidden lg:block" />
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block" />
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.8, ease: "easeOut" }} className="pl-8 lg:pl-20 py-10">
                      <StepContent step={step} align="left" />
                    </motion.div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <div className="w-full">
      <section className="min-h-screen pt-28 pb-16 px-6 md:px-16 flex flex-col justify-center">
        <div className="max-w-[90vw]">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-xs tracking-widest uppercase mb-10 opacity-60">
            ( Services / What we do )
          </motion.p>
          <div className="text-[13vw] leading-[0.88] font-light tracking-tighter uppercase">
            <TextReveal trigger="onMount" delay={0.15}>What</TextReveal>
            <TextReveal trigger="onMount" delay={0.3} className="pl-[10vw]">We</TextReveal>
            <TextReveal trigger="onMount" delay={0.45} className="pl-[5vw]">Do</TextReveal>
          </div>
        </div>
      </section>

      <ServiceSwiper />
      <ProcessTimeline />

      <section className="py-32 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} variants={fadeUp} className="max-w-6xl mx-auto text-center border border-[#191919] p-8 md:p-24 relative">
          <div className="absolute top-6 right-6 text-3xl font-light opacity-30">*</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-12">Let's create something unforgettable.</h2>
          <MagneticBtn onClick={() => window.dispatchEvent(new CustomEvent("contact:open"))} className="inline-block border border-[#191919] px-8 py-4 text-sm uppercase tracking-widest font-medium hover:bg-[#191919] hover:text-[#EFEDEA] transition-colors duration-300">
            Don't be shy, contact us now →
          </MagneticBtn>
        </motion.div>
      </section>
    </div>
  );
}
