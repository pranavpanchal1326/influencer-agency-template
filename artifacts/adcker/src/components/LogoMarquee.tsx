interface Logo {
  src: string;
  name: string;
}

interface LogoMarqueeProps {
  logos: Logo[];
  speed?: number;
  direction?: "left" | "right";
}

export function LogoMarquee({ logos, speed = 40, direction = "left" }: LogoMarqueeProps) {
  const doubled = [...logos, ...logos, ...logos];
  const duration = `${speed}s`;

  return (
    <div className="overflow-hidden w-full" style={{ maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
      <div
        className={`flex items-center gap-16 w-max ${direction === "right" ? "animate-marquee-right" : "animate-marquee"}`}
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center shrink-0 h-8 opacity-40 hover:opacity-90 transition-opacity duration-300 grayscale hover:grayscale-0"
            style={{ minWidth: "120px" }}
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="h-full w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
