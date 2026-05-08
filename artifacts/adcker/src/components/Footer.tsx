import { Link } from "wouter";
import { getLenis } from "@/hooks/useLenis";
import { config } from "@/config";

export function Footer() {
  const scrollToTop = () => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openContact = () => window.dispatchEvent(new CustomEvent("contact:open"));

  return (
    <footer id="contact" className="bg-[#EFEDEA] text-[#191919] pt-24 pb-8 px-6 md:px-16 border-t border-[#191919]/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
        <div className="space-y-4">
          <h4 className="text-xs tracking-widest uppercase font-medium mb-6 opacity-50">( Menu )</h4>
          <div className="flex flex-col gap-3 text-lg">
            <Link href="/" className="hover:opacity-50 transition-opacity">Index</Link>
            <Link href="/services" className="hover:opacity-50 transition-opacity">Services</Link>
            <Link href="/our-work" className="hover:opacity-50 transition-opacity">Our Work</Link>
            <Link href="/about" className="hover:opacity-50 transition-opacity">About</Link>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs tracking-widest uppercase font-medium mb-6 opacity-50">( Services )</h4>
          <div className="flex flex-col gap-3 text-lg">
            <Link href="/services" className="hover:opacity-50 transition-opacity">Branding & Design</Link>
            <Link href="/services" className="hover:opacity-50 transition-opacity">Social Media</Link>
            <Link href="/services" className="hover:opacity-50 transition-opacity">UGC & Affiliate</Link>
            <Link href="/services" className="hover:opacity-50 transition-opacity">Influencer</Link>
            <Link href="/services" className="hover:opacity-50 transition-opacity">LATAM Expansion</Link>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-xs tracking-widest uppercase font-medium mb-6 opacity-50">( Reach out )</h4>
          <div className="flex flex-col gap-3 text-lg">
            <button
              onClick={openContact}
              className="hover:opacity-50 transition-opacity group inline-flex items-center gap-2 text-left"
            >
              Start a project <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </button>
            <a href={`mailto:${config.agency.email}`} className="hover:opacity-50 transition-opacity group inline-flex items-center gap-2">
              Email <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </a>
            <a
              href={config.social.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-50 transition-opacity group inline-flex items-center gap-2"
            >
              Instagram <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </a>
          </div>
        </div>

        <div className="flex items-start justify-end">
          <button
            onClick={scrollToTop}
            className="text-xs tracking-widest uppercase hover:opacity-50 transition-opacity"
          >
            Back to top ↑
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[#191919]/10 text-xs tracking-wider opacity-50">
        <p>© {config.agency.year} {config.agency.name}</p>
        <p>{config.agency.description}</p>
      </div>
    </footer>
  );
}
