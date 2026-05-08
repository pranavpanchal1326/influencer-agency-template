import { useParams, Link } from "wouter";
import { motion, type Variants } from "framer-motion";
import { getCaseStudy, getAdjacentProjects } from "@/data/caseStudies";
import { ParallaxImage, ParallaxBg } from "@/components/ParallaxImage";
import { TextReveal } from "@/components/TextReveal";
import { MagneticBtn } from "@/components/MagneticBtn";
import NotFound from "@/pages/not-found";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: "easeOut" } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export function CaseStudy() {
  const params = useParams<{ slug: string }>();
  const study = getCaseStudy(params.slug ?? "");
  const { prev, next } = getAdjacentProjects(params.slug ?? "");

  if (!study) return <NotFound />;

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <ParallaxBg
          src={study.heroImage}
          alt={study.name}
          className="absolute inset-0 h-full w-full"
          overlay="bg-[#191919]/55"
          strength={10}
        />
        <div className="relative z-10 px-6 md:px-16 pb-16 pt-36 text-[#EFEDEA]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xs tracking-widest uppercase opacity-60 mb-8"
          >
            ( {study.category} / {study.year} )
          </motion.p>
          <div className="text-[12vw] md:text-[9vw] leading-[0.88] font-light tracking-tighter uppercase">
            {study.name.split(" ").map((word, i) => (
              <TextReveal key={i} trigger="onMount" delay={0.1 + i * 0.15}>
                {word}
              </TextReveal>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="flex items-center gap-6 mt-8"
          >
            <span className="text-xs tracking-widest uppercase opacity-60 border border-[#EFEDEA]/30 px-3 py-1.5">
              {study.tag}
            </span>
            <span className="text-xs tracking-widest uppercase opacity-40">— {study.year}</span>
          </motion.div>
        </div>
        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 right-8 md:right-16 hidden md:flex flex-col items-center gap-2 text-[#EFEDEA]/50"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-[#EFEDEA]/30"
          />
        </motion.div>
      </section>

      {/* Overview */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-b border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32"
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs tracking-widest uppercase opacity-50 mb-6">( Overview )</p>
            <p className="text-2xl md:text-3xl font-light leading-[1.4] opacity-80">
              {study.overview}
            </p>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col justify-between gap-12">
            <div>
              <p className="text-xs tracking-widest uppercase opacity-50 mb-6">( Services )</p>
              <ul className="flex flex-col gap-3">
                {study.services.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-base font-light opacity-70 border-b border-[#191919]/10 pb-3 last:border-0"
                  >
                    <span className="w-1.5 h-1.5 bg-[#191919] flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Challenge & Approach */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-b border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
        >
          <motion.div variants={fadeUp}>
            <p className="text-xs tracking-widest uppercase opacity-50 mb-6">( The challenge )</p>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">{study.challenge}</p>
          </motion.div>
          <motion.div variants={fadeUp}>
            <p className="text-xs tracking-widest uppercase opacity-50 mb-6">( Our approach )</p>
            <p className="text-lg md:text-xl font-light leading-relaxed opacity-70">{study.approach}</p>
          </motion.div>
        </motion.div>
      </section>

      {/* Results Strip */}
      <section className="py-24 md:py-32 px-6 md:px-16 bg-[#191919] text-[#EFEDEA]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase opacity-40 mb-16">
            ( Campaign results )
          </motion.p>
          <motion.div
            variants={stagger}
            className="grid grid-cols-2 md:grid-cols-4 gap-y-14 gap-x-8"
          >
            {study.results.map((r, i) => (
              <motion.div key={i} variants={fadeUp} className="flex flex-col">
                <span className="text-5xl md:text-6xl font-light tracking-tighter tabular-nums leading-none mb-4">
                  {r.value}
                </span>
                <span className="text-xs tracking-widest uppercase opacity-40">{r.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Gallery */}
      <section className="py-24 md:py-32 px-6 md:px-16 border-b border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="max-w-7xl mx-auto"
        >
          <motion.p variants={fadeUp} className="text-xs tracking-widest uppercase opacity-50 mb-12">
            ( Project visuals )
          </motion.p>
          <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <motion.div variants={fadeUp} className="md:col-span-7">
              <ParallaxImage
                src={study.gallery[0]}
                alt={`${study.name} 01`}
                className="aspect-[4/3] w-full"
                strength={10}
              />
            </motion.div>
            <motion.div variants={fadeUp} className="md:col-span-5 flex flex-col gap-6">
              <ParallaxImage
                src={study.gallery[1]}
                alt={`${study.name} 02`}
                className="flex-1 min-h-[200px]"
                strength={10}
              />
              {study.gallery[2] && (
                <ParallaxImage
                  src={study.gallery[2]}
                  alt={`${study.name} 03`}
                  className="flex-1 min-h-[200px]"
                  strength={10}
                />
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Quote */}
      {study.quote && (
        <section className="py-24 md:py-32 px-6 md:px-16 border-b border-[#191919]/10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={fadeUp}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="text-[6rem] leading-none font-light opacity-10 mb-4 select-none">"</div>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-tight mb-10 -mt-10">
              "{study.quote.text}"
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-px bg-[#191919]/30" />
              <div>
                <p className="text-sm font-medium tracking-widest uppercase">{study.quote.author}</p>
                <p className="text-xs tracking-widest uppercase opacity-40 mt-0.5">{study.quote.role}</p>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 px-6 md:px-16 border-b border-[#191919]/10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          className="max-w-6xl mx-auto text-center border border-[#191919] p-8 md:p-24 relative"
        >
          <div className="absolute top-6 right-6 text-3xl font-light opacity-20">*</div>
          <h2 className="text-3xl md:text-5xl font-light leading-[1.1] mb-10">
            Ready to write your own story?
          </h2>
          <MagneticBtn
            onClick={() => window.dispatchEvent(new CustomEvent("contact:open"))}
            className="inline-block border border-[#191919] px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-[#191919] hover:text-[#EFEDEA] transition-colors duration-300"
          >
            Get in touch →
          </MagneticBtn>
        </motion.div>
      </section>

      {/* Prev / Next navigation */}
      <section className="border-b border-[#191919]/10">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {prev ? (
            <Link href={`/work/${prev.slug}`}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex flex-col gap-3 px-6 md:px-16 py-14 border-b md:border-b-0 md:border-r border-[#191919]/10 hover:bg-[#191919]/3 transition-colors duration-300 cursor-pointer"
              >
                <span className="text-xs tracking-widest uppercase opacity-40">← Previous</span>
                <span className="text-2xl md:text-3xl font-light uppercase tracking-tight group-hover:opacity-60 transition-opacity">
                  {prev.name}
                </span>
                <span className="text-xs tracking-wider opacity-40">{prev.tag}</span>
              </motion.div>
            </Link>
          ) : (
            <div />
          )}

          {next ? (
            <Link href={`/work/${next.slug}`}>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="group flex flex-col gap-3 px-6 md:px-16 py-14 md:text-right hover:bg-[#191919]/3 transition-colors duration-300 cursor-pointer"
              >
                <span className="text-xs tracking-widest uppercase opacity-40">Next →</span>
                <span className="text-2xl md:text-3xl font-light uppercase tracking-tight group-hover:opacity-60 transition-opacity">
                  {next.name}
                </span>
                <span className="text-xs tracking-wider opacity-40">{next.tag}</span>
              </motion.div>
            </Link>
          ) : (
            <div />
          )}
        </div>
      </section>

      {/* Back to all work */}
      <section className="py-12 px-6 md:px-16">
        <Link
          href="/our-work"
          className="text-xs tracking-widest uppercase opacity-50 hover:opacity-100 transition-opacity inline-flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
          All projects
        </Link>
      </section>
    </div>
  );
}
