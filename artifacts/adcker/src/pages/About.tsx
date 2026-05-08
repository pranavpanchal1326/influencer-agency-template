import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ParallaxImage, ParallaxBg } from "@/components/ParallaxImage";
import { TextReveal } from "@/components/TextReveal";
import { MagneticBtn } from "@/components/MagneticBtn";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } }
};

const testimonials = [
  {
    quote: "Working with this agency completely transformed how we show up on social. The influencer partnerships they curated felt genuinely authentic — our community noticed and engagement tripled within the first campaign.",
    brand: "Client A",
    person: "Marketing Director"
  },
  {
    quote: "Breaking into a new market was a game-changer. Their cultural fluency and creator network gave us access to audiences we could never have reached on our own.",
    brand: "Client B",
    person: "Head of Brand Partnerships"
  },
  {
    quote: "They don't just execute — they think. Every piece of content told our story in a way that resonated. Our earned media value from a single campaign exceeded our entire paid budget.",
    brand: "Client C",
    person: "VP of Digital"
  },
  {
    quote: "The UGC content pipeline they built is extraordinary. Authentic, high-quality, and consistently aligned with our brand DNA. It's the kind of output that takes most agencies months to figure out.",
    brand: "Client D",
    person: "Creative Lead"
  }
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  }),
};

function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    const n = (next + testimonials.length) % testimonials.length;
    setDir(n > index ? 1 : -1);
    setIndex(n);
  }, [index]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => go(index + 1), 5500);
    return () => clearInterval(id);
  }, [index, paused, go]);

  const t = testimonials[index];

  return (
    <section
      className="py-32 px-6 md:px-16 bg-[#191919] text-[#EFEDEA] border-t border-[#EFEDEA]/10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-xs tracking-widest uppercase opacity-40 mb-16"
        >
          ( What our clients say )
        </motion.p>

        <div className="relative min-h-[280px] md:min-h-[220px] flex flex-col justify-center">
          <div className="absolute -top-8 -left-2 text-[9rem] leading-none font-light text-[#EFEDEA]/8 select-none pointer-events-none">
            "
          </div>

          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="flex flex-col gap-10"
            >
              <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-tight">
                "{t.quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-[#EFEDEA]/30" />
                <div>
                  <p className="text-sm font-medium tracking-widest uppercase">{t.brand}</p>
                  <p className="text-xs tracking-widest uppercase opacity-40 mt-0.5">{t.person}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-16 border-t border-[#EFEDEA]/10 pt-8">
          <div className="flex gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                className={`transition-all duration-300 ${i === index ? "w-8 h-px bg-[#EFEDEA]" : "w-3 h-px bg-[#EFEDEA]/30 hover:bg-[#EFEDEA]/60"}`}
              />
            ))}
          </div>

          <div className="flex gap-6">
            <button
              onClick={() => go(index - 1)}
              className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span> Prev
            </button>
            <button
              onClick={() => go(index + 1)}
              className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity flex items-center gap-2 group"
            >
              Next <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const team = [
  {
    name: "Sarah K.",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=900&q=85",
    instagram: "https://www.instagram.com/"
  },
  {
    name: "Maria L.",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=85",
    instagram: "https://www.instagram.com/"
  },
  {
    name: "Jasmine T.",
    role: "Social Media Manager",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=900&q=85",
    instagram: "https://www.instagram.com/"
  }
];

export function About() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-28 pb-24 px-6 md:px-16 flex flex-col min-h-[80vh] justify-center">
        <div className="max-w-[90vw]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xs tracking-widest uppercase mb-10 opacity-60"
          >
            ( The minds behind )
          </motion.p>
          <div className="text-[13vw] leading-[0.88] font-light tracking-tighter uppercase">
            <TextReveal trigger="onMount" delay={0.1}>We</TextReveal>
            <TextReveal trigger="onMount" delay={0.25} className="pl-[10vw]">Are</TextReveal>
            <TextReveal trigger="onMount" delay={0.4} className="pl-[20vw]">
              <span className="italic font-serif">Your Agency</span>
            </TextReveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-5xl mx-auto flex flex-col gap-10"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1]">
            Our story is built on a deep understanding of beauty, fashion, and wellness.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light leading-relaxed opacity-60">
            This allows us to craft authentic, cohesive strategies that connect with your audience. With a keen eye on industry trends, we ensure your brand stays ahead of the curve.
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              href="/our-work"
              className="text-xs tracking-widest uppercase font-medium border border-[#191919] px-6 py-3 hover:bg-[#191919] hover:text-[#EFEDEA] transition-all duration-300 inline-flex items-center gap-2 group"
            >
              See our work <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Staggered Images */}
      <section className="py-24 px-6 md:px-16 border-t border-[#191919]/10 overflow-hidden">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          <motion.div variants={fadeUp} className="relative md:translate-y-12">
            <div className="absolute top-4 left-4 z-10 bg-[#EFEDEA] px-2 py-0.5 text-xs tracking-wider">( 01 )</div>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=85"
              alt="About 01"
              className="aspect-[3/4]"
              strength={12}
            />
          </motion.div>
          <motion.div variants={fadeUp} className="relative md:-translate-y-12">
            <div className="absolute top-4 left-4 z-10 bg-[#EFEDEA] px-2 py-0.5 text-xs tracking-wider">( 02 )</div>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1562967916-eb82221dfb5a?w=900&q=85"
              alt="About 02"
              className="aspect-[4/5]"
              strength={12}
            />
          </motion.div>
          <motion.div variants={fadeUp} className="relative md:translate-y-8">
            <div className="absolute top-4 left-4 z-10 bg-[#EFEDEA] px-2 py-0.5 text-xs tracking-wider">( 03 )</div>
            <ParallaxImage
              src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=900&q=85"
              alt="About 03"
              className="aspect-square"
              strength={12}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Full-bleed editorial strip */}
      <ParallaxBg
        src="https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=1920&q=85"
        alt="Beauty editorial"
        className="h-[55vh]"
        overlay="bg-[#191919]/35"
        strength={14}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center text-[#EFEDEA] text-center px-6"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tighter uppercase leading-[0.9]">
            Passion meets<br />precision
          </h2>
        </motion.div>
      </ParallaxBg>

      {/* Strategy Section */}
      <section className="py-32 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-5xl mx-auto flex flex-col gap-10 text-center"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1]">
            We specialize in creating hyper-targeted strategies unique to your brand.
          </motion.h2>
          <motion.p variants={fadeUp} className="text-xl md:text-2xl font-light leading-relaxed opacity-60 max-w-4xl mx-auto">
            Leveraging our expertise to navigate the competitive landscape, we combine cultural insights with years of experience to guarantee engaging, impactful results for your brand.
          </motion.p>
          <motion.div variants={fadeUp} className="flex justify-center">
            <Link href="/services" className="text-xs tracking-widest uppercase font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-2 group">
              More about our services <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Testimonials />

      {/* Team */}
      <section className="py-32 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-light text-center mb-24 leading-[1.1]">
            ( Meet the creative leaders behind the agency )
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {team.map((member, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col items-center group text-center">
                <div className="relative aspect-[3/4] w-full max-w-sm mb-8">
                  <div className="absolute top-4 left-4 z-10 bg-[#EFEDEA] px-2 py-0.5 text-xs tracking-wider">( 0{i + 1} )</div>
                  <ParallaxImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full"
                    imgClassName="grayscale group-hover:grayscale-0 transition-all duration-700"
                    strength={10}
                  />
                </div>
                <h3 className="text-xl font-medium uppercase tracking-widest mb-2">{member.name}</h3>
                <p className="text-xs uppercase tracking-widest opacity-50 mb-4">— {member.role}</p>
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs tracking-widest uppercase opacity-30 hover:opacity-80 transition-opacity inline-flex items-center gap-2 group/link"
                >
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Instagram
                  <span className="group-hover/link:translate-x-0.5 transition-transform inline-block">→</span>
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-32 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-6xl mx-auto text-center border border-[#191919] p-8 md:p-24 relative"
        >
          <div className="absolute top-6 right-6 text-3xl font-light opacity-20">*</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-12">
            Let's create something unforgettable.
          </h2>
          <MagneticBtn
            onClick={() => window.dispatchEvent(new CustomEvent("contact:open"))}
            className="inline-block border border-[#191919] px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-[#191919] hover:text-[#EFEDEA] transition-colors duration-300"
          >
            Don't be shy, contact us now →
          </MagneticBtn>
        </motion.div>
      </section>
    </div>
  );
}
