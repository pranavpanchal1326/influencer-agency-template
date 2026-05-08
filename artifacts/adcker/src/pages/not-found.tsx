import { Link } from "wouter";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/TextReveal";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#EFEDEA] text-[#191919] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="text-xs tracking-widest uppercase opacity-50 mb-10"
        >
          ( 404 )
        </motion.p>
        <div className="text-[18vw] font-light tracking-tighter leading-[0.85] uppercase mb-12">
          <TextReveal trigger="onMount" delay={0.2}>Lost</TextReveal>
        </div>
        <p className="text-xl font-light opacity-60 mb-12 max-w-sm">
          This page doesn't exist — but your brand story does. Let's build it.
        </p>
        <Link
          href="/"
          className="border border-[#191919] px-8 py-4 text-xs uppercase tracking-widest font-medium hover:bg-[#191919] hover:text-[#EFEDEA] transition-colors duration-300 inline-flex items-center gap-3 group"
        >
          Back to Index
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </Link>
      </motion.div>
    </div>
  );
}
