import { motion, type Variants } from "framer-motion";
import { Link } from "wouter";
import { ParallaxImage, ParallaxBg } from "@/components/ParallaxImage";
import { useCountUp } from "@/hooks/useCountUp";
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

const projects = [
  {
    slug: "campaign-01",
    name: "Campaign 01",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85",
    tag: "Beauty · Influencer",
    year: "2024"
  },
  {
    slug: "campaign-02",
    name: "Campaign 02",
    image: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=900&q=85",
    tag: "Skincare · UGC",
    year: "2024"
  },
  {
    slug: "campaign-03",
    name: "Campaign 03",
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=900&q=85",
    tag: "Wellness · Social",
    year: "2024"
  },
  {
    slug: "campaign-04",
    name: "Campaign 04",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85",
    tag: "Fashion · Content",
    year: "2025"
  },
  {
    slug: "campaign-05",
    name: "Campaign 05",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=85",
    tag: "LATAM · Expansion",
    year: "2025"
  },
  {
    slug: "campaign-06",
    name: "Campaign 06",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
    tag: "Creator · Strategy",
    year: "2025"
  }
];

const BRAND_SVG = (label: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='110' height='28' viewBox='0 0 110 28'%3E%3Ctext x='55' y='19' text-anchor='middle' font-family='sans-serif' font-size='9' font-weight='700' letter-spacing='4' fill='%23191919'%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`;

const brands = [
  { src: BRAND_SVG("BRAND A"), name: "Brand A" },
  { src: BRAND_SVG("BRAND B"), name: "Brand B" },
  { src: BRAND_SVG("BRAND C"), name: "Brand C" },
  { src: BRAND_SVG("BRAND D"), name: "Brand D" },
  { src: BRAND_SVG("BRAND E"), name: "Brand E" },
];

interface StatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

function Stat({ value, suffix = "", prefix = "", label }: StatProps) {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div className="flex flex-col">
      <span
        ref={(el) => { (ref as React.MutableRefObject<HTMLElement | null>).current = el; }}
        className="text-5xl md:text-7xl font-light tracking-tighter tabular-nums"
      >
        {prefix}{Math.floor(count)}{suffix}
      </span>
      <span className="text-xs tracking-widest uppercase opacity-40 mt-3">{label}</span>
    </div>
  );
}

export function OurWork() {
  return (
    <div className="w-full">
      {/* Hero */}
      <section className="pt-28 pb-24 px-6 md:px-16 flex flex-col min-h-[70vh] justify-center">
        <div className="max-w-[90vw]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-xs tracking-widest uppercase mb-10 opacity-60"
          >
            ( Where we shine / Projects )
          </motion.p>
          <div className="text-[13vw] leading-[0.88] font-light tracking-tighter uppercase mb-16">
            <TextReveal trigger="onMount" delay={0.1} className="mb-4">
              <span className="text-[5vw] lowercase italic font-serif opacity-60">This is</span>
            </TextReveal>
            <TextReveal trigger="onMount" delay={0.25} className="pl-[5vw]">Our</TextReveal>
            <TextReveal trigger="onMount" delay={0.4} className="pl-[15vw]">Work</TextReveal>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="text-xl md:text-3xl lg:text-4xl font-light max-w-3xl leading-tight opacity-70"
          >
            We craft and deliver top-tier social media solutions for visionary brands.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24"
        >
          {projects.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className={`flex flex-col group ${i % 2 !== 0 ? "md:mt-24" : ""}`}
            >
              <Link href={`/work/${p.slug}`} className="block">
                <div className="flex items-center gap-3 mb-6 justify-center">
                  <span className="text-[8vw] lg:text-[4vw] font-light opacity-25">(</span>
                  <div className="relative aspect-[4/5] w-full overflow-hidden" data-cursor="View">
                    <ParallaxImage src={p.image} alt={p.name} className="w-full h-full" strength={12} />
                    <div className="absolute inset-0 bg-[#191919]/0 group-hover:bg-[#191919]/55 transition-colors duration-500 flex items-center justify-center pointer-events-none">
                      <span className="text-[#EFEDEA] text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-3">
                        View project <span>→</span>
                      </span>
                    </div>
                  </div>
                  <span className="text-[8vw] lg:text-[4vw] font-light opacity-25">)</span>
                </div>
                <div className="flex justify-between items-baseline px-1">
                  <h3 className="text-2xl font-medium tracking-tight uppercase group-hover:italic transition-all duration-300">
                    {p.name}
                  </h3>
                  <div className="flex items-center gap-4">
                    <span className="text-xs tracking-wider uppercase opacity-40">{p.tag}</span>
                    <span className="text-xs tracking-wider opacity-25">— {p.year}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Campaign Results Strip */}
      <section className="py-24 px-6 md:px-16 bg-[#191919] text-[#EFEDEA] border-t border-[#EFEDEA]/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase opacity-40 mb-14">
            ( Campaign results )
          </motion.p>
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-6">
            <motion.div variants={fadeUp}><Stat value={200} suffix="+" label="Influencers activated" /></motion.div>
            <motion.div variants={fadeUp}><Stat value={50} suffix="+" label="Brand campaigns" /></motion.div>
            <motion.div variants={fadeUp}><Stat value={10} prefix="$" suffix="M+" label="Earned media value" /></motion.div>
            <motion.div variants={fadeUp}><Stat value={95} suffix="%" label="Client retention rate" /></motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Full-bleed editorial strip */}
      <ParallaxBg
        src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=85"
        alt="Fashion editorial"
        className="h-[60vh]"
        overlay="bg-[#191919]/30"
        strength={14}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-end px-6 md:px-16 pb-12"
        >
          <p className="text-[#EFEDEA]/70 text-xs tracking-widest uppercase">
            ( Every brand has a story worth telling )
          </p>
        </motion.div>
      </ParallaxBg>

      {/* Brands Section */}
      <section className="py-32 px-6 md:px-16 border-t border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={fadeUp} className="text-xl md:text-2xl font-light mb-20 text-center tracking-wide opacity-50">
            ( Brands we've worked with )
          </motion.h2>
          <motion.div variants={stagger} className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
            {brands.map((brand, i) => (
              <motion.img
                key={i}
                variants={fadeUp}
                src={brand.src}
                alt={brand.name}
                className="h-7 md:h-10 w-auto object-contain opacity-40 hover:opacity-80 transition-opacity duration-300"
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* CTA */}
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
