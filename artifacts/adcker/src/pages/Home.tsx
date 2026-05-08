import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useScroll, useTransform, type Variants } from "framer-motion";
import { ParallaxImage, ParallaxBg } from "@/components/ParallaxImage";
import { useCountUp } from "@/hooks/useCountUp";
import { LogoMarquee } from "@/components/LogoMarquee";
import { TextReveal } from "@/components/TextReveal";
import { MagneticBtn } from "@/components/MagneticBtn";
import { config } from "@/config";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } }
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const services = [
  {
    id: "beauty",
    title: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85",
    text: "Beauty on social media is a goldmine. Trends explode, products go viral, and brands become cult favorites overnight. With the right strategy, your beauty brand can break through the noise, reach millions, and drive real engagement."
  },
  {
    id: "fashion",
    title: "Fashion",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85",
    text: "Fashion on social media is where trends ignite. Viral styling tips, bold looks, and creative expression fuel engagement. We help your brand capture the style-savvy audience's attention and lead the fashion conversation."
  },
  {
    id: "wellness",
    title: "Wellness",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85",
    text: "Wellness is no longer just about products — it's about lifestyle, mindset, and community. From morning routines to self-care rituals, the right content builds trust and loyalty. We tap into a space where storytelling sells."
  }
];

const tickerItems = [
  "Beauty", "Fashion", "Wellness", "Influencer Marketing", "UGC", "Content Creation",
  "Social Strategy", "Brand Growth", "LATAM Expansion", "Digital Culture"
];

const BRAND_SVG = (label: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='28' viewBox='0 0 110 28'%3E%3Ctext x='55' y='19' text-anchor='middle' font-family='sans-serif' font-size='9' font-weight='700' letter-spacing='4' fill='%23191919'%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`;

const clientLogos = [
  { src: BRAND_SVG("BRAND A"), name: "Brand A" },
  { src: BRAND_SVG("BRAND B"), name: "Brand B" },
  { src: BRAND_SVG("BRAND C"), name: "Brand C" },
  { src: BRAND_SVG("BRAND D"), name: "Brand D" },
  { src: BRAND_SVG("BRAND E"), name: "Brand E" },
];

function HeroParallaxPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div ref={ref} className="hidden lg:block absolute right-0 top-0 w-[38vw] h-full overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.3] origin-top">
        <img
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=900&q=85"
          alt="Editorial portrait"
          className="w-full h-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#EFEDEA]/60" />
      <div className="absolute bottom-8 left-6 text-xs tracking-widest uppercase text-[#191919]/60">
        ( Editorial )
      </div>
    </div>
  );
}

interface StatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

function StatCounter({ value, suffix = "", prefix = "", label, decimals = 0 }: StatProps) {
  const { count, ref } = useCountUp(value, 2200, decimals);
  return (
    <div className="flex flex-col items-start border-l border-[#191919]/15 pl-8 first:border-l-0 first:pl-0">
      <span
        ref={(el) => { (ref as React.MutableRefObject<HTMLElement | null>).current = el; }}
        className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tighter tabular-nums"
      >
        {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}
      </span>
      <span className="text-xs tracking-widest uppercase opacity-50 mt-3">{label}</span>
    </div>
  );
}

export function Home() {
  const [openService, setOpenService] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen pt-28 pb-16 px-6 md:px-16 flex flex-col justify-center relative overflow-hidden">
        <HeroParallaxPanel />
        <div className="max-w-[90vw] lg:max-w-[58vw] relative z-10">
          <div className="text-[13vw] lg:text-[9vw] leading-[0.88] font-light tracking-tighter uppercase">
            <TextReveal trigger="onMount" delay={0.1}>The Art</TextReveal>
            <TextReveal trigger="onMount" delay={0.25} className="pl-[10vw] lg:pl-[7vw]">of</TextReveal>
            <TextReveal trigger="onMount" delay={0.4}>Hacking</TextReveal>
            <TextReveal trigger="onMount" delay={0.55} className="pl-[5vw] lg:pl-[4vw]">Social</TextReveal>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end w-full mt-16 text-lg"
          >
            <p className="font-light text-[#191919]/60">( We're built for this )</p>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent("showreel:open"))}
              className="flex items-center gap-2 hover:opacity-60 transition-opacity mt-8 md:mt-0 group"
            >
              <span className="tracking-widest uppercase text-sm font-medium">Showreel</span>
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-3"
        >
          <span className="text-[10px] tracking-widest uppercase opacity-40">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-10 bg-[#191919]/30"
          />
        </motion.div>
      </section>

      {/* Ticker Marquee */}
      <div className="overflow-hidden border-y border-[#191919]/15 py-4 bg-[#191919] text-[#EFEDEA]">
        <motion.div
          className="flex gap-12 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        >
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="text-xs tracking-widest uppercase shrink-0">
              {item} <span className="opacity-30 mx-3">*</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Services Teaser */}
      <section className="py-24 px-6 md:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="text-6xl md:text-8xl font-light mb-16">For</motion.h2>

          <div className="flex flex-col border-t border-[#191919]/20">
            {services.map((s, i) => (
              <div key={s.id}>
                {i > 0 && (
                  <div className="py-3 px-2 text-sm italic font-serif opacity-40">and</div>
                )}
                <div className="border-b border-[#191919]/20">
                  <button
                    onClick={() => setOpenService(openService === s.id ? null : s.id)}
                    className="w-full py-8 md:py-10 flex justify-between items-center text-4xl md:text-6xl lg:text-7xl font-light tracking-tight hover:italic transition-all duration-300 group text-left"
                  >
                    <span>{s.title}</span>
                    <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-50 transition-opacity shrink-0 ml-4">
                      {openService === s.id ? "← Close" : "← Click"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {openService === s.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                          <div className="flex items-center gap-3 justify-center">
                            <span className="text-5xl md:text-7xl font-light opacity-30">(</span>
                            <ParallaxImage
                              src={s.image}
                              alt={s.title}
                              className="aspect-[3/4] w-full max-w-xs"
                              strength={8}
                            />
                            <span className="text-5xl md:text-7xl font-light opacity-30">)</span>
                          </div>
                          <div className="flex flex-col justify-center gap-8">
                            <p className="text-xl md:text-2xl font-light leading-relaxed opacity-70">{s.text}</p>
                            <Link href="/services" className="text-xs tracking-widest uppercase font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-2 group">
                              Read more <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Full-bleed editorial image */}
      <ParallaxBg
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85"
        alt="Editorial fashion"
        className="h-[70vh] md:h-[85vh]"
        overlay="bg-[#191919]/40"
        strength={14}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute inset-0 flex flex-col items-center justify-center text-[#EFEDEA] text-center px-6"
        >
          <p className="text-xs tracking-widest uppercase mb-6 opacity-60">( We craft culture )</p>
          <h2 className="text-4xl md:text-6xl lg:text-8xl font-light tracking-tighter leading-[0.9] uppercase max-w-4xl">
            Where brands become icons
          </h2>
        </motion.div>
        <div className="absolute bottom-8 right-8 text-[#EFEDEA]/40 text-xs tracking-widest uppercase">
          Beauty · Fashion · Wellness
        </div>
      </ParallaxBg>

      {/* About Teaser */}
      <section className="py-32 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-5xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-12">
            In a world where everyone is trying to do everything, we choose to specialize in the beauty, fashion, and wellness industries.
          </h2>
          <Link href="/about" className="text-xs uppercase tracking-widest font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-2 group">
            More about us <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </motion.div>
      </section>

      {/* Stats Strip */}
      <section className="py-24 px-6 md:px-16 border-t border-[#191919]/10 bg-[#191919] text-[#EFEDEA]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase opacity-40 mb-14">
            ( By the numbers )
          </motion.p>
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-6">
            <motion.div variants={fadeUp}><StatCounter value={200} suffix="+" label="Influencers activated" /></motion.div>
            <motion.div variants={fadeUp}><StatCounter value={50} suffix="+" label="Brand campaigns" /></motion.div>
            <motion.div variants={fadeUp}><StatCounter value={10} prefix="$" suffix="M+" label="Earned media value" /></motion.div>
            <motion.div variants={fadeUp}><StatCounter value={3} label="Core industries" /></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Client Logo Marquee */}
      <section className="py-20 border-t border-[#191919]/10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xs tracking-widest uppercase opacity-40 px-6 md:px-16 mb-10">
            ( Trusted by )
          </p>
          <LogoMarquee logos={clientLogos} speed={35} />
          <div className="mt-6">
            <LogoMarquee logos={[...clientLogos].reverse()} speed={45} direction="right" />
          </div>
        </motion.div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-24 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10"
        >
          {[
            { num: "01", slug: "campaign-01", src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85", cls: "md:col-span-7",  aspect: "aspect-video",   strength: 10, label: "Campaign 01 · UGC" },
            { num: "02", slug: "campaign-02", src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=85", cls: "md:col-span-5 md:mt-32", aspect: "aspect-square",  strength: 10, label: "Campaign 02 · Skincare" },
            { num: "03", slug: "campaign-03", src: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=900&q=85", cls: "md:col-span-4",  aspect: "aspect-[3/4]",  strength: 10, label: "Campaign 03 · Wellness" },
            { num: "04", slug: "campaign-04", src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85", cls: "md:col-span-8 md:-mt-24", aspect: "aspect-video",   strength: 10, label: "Campaign 04 · Fashion" },
            { num: "05", slug: "campaign-05", src: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85", cls: "md:col-span-12 mt-4", aspect: "aspect-[21/9]", strength: 8,  label: "Campaign 05 · LATAM" },
          ].map((item) => (
            <motion.div key={item.num} variants={fadeUp} className={`relative group ${item.cls}`} data-cursor="View">
              <Link href={`/work/${item.slug}`} className="block">
                <div className="absolute top-4 left-4 z-10 bg-[#EFEDEA] px-2 py-0.5 text-xs tracking-wider">( {item.num} )</div>
                <div className={`relative overflow-hidden ${item.aspect}`}>
                  <ParallaxImage src={item.src} alt={`Portfolio ${item.num}`} className="w-full h-full" strength={item.strength} />
                  <div className="absolute inset-0 bg-[#191919]/0 group-hover:bg-[#191919]/45 transition-colors duration-500 flex flex-col items-center justify-center gap-3 pointer-events-none">
                    <span className="text-[#EFEDEA] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">{item.label}</span>
                    <span className="text-[#EFEDEA] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-60 transition-opacity duration-500 delay-75">View →</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mt-12 flex justify-end"
        >
          <Link href="/our-work" className="text-xs tracking-widest uppercase font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-2 group">
            See all work <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
          </Link>
        </motion.div>
      </section>

      {/* Instagram Feed */}
      <section className="py-24 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeUp} className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-widest uppercase opacity-50 mb-3">( Social )</p>
              <h2 className="text-4xl md:text-6xl font-light">Follow the feed</h2>
            </div>
            <a
              href={config.social.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs tracking-widest uppercase font-medium hover:opacity-60 transition-opacity inline-flex items-center gap-2 group shrink-0"
            >
              {config.social.instagramHandle}
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </a>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-3 md:grid-cols-6 gap-1 md:gap-2">
            {[
              { src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=85", alt: "Beauty" },
              { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=85", alt: "Fashion" },
              { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=85", alt: "Skincare" },
              { src: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=85", alt: "Wellness" },
              { src: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&q=85", alt: "Editorial" },
              { src: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&q=85", alt: "Beauty" },
            ].map((post, i) => (
              <motion.a
                key={i}
                variants={fadeUp}
                href={config.social.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="relative aspect-square overflow-hidden group block"
              >
                <img src={post.src} alt={post.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#191919]/0 group-hover:bg-[#191919]/40 transition-colors duration-300 flex items-center justify-center">
                  <svg className="w-7 h-7 text-[#EFEDEA] opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 md:px-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-6xl mx-auto text-center border border-[#191919] p-8 md:p-24 relative"
        >
          <div className="absolute top-6 right-6 text-3xl font-light opacity-20">*</div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-12">
            We don't just do social media, we master it. From scroll-stopping content to high-impact designs that drive real results, we make brands impossible to ignore.
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
