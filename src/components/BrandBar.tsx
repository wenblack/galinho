import { useEffect, useRef } from "react";

const brands = [
  {
    name: "Copeland",
    svg: (
      <svg viewBox="0 0 120 30" className="h-6 w-auto">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">COPELAND</text>
      </svg>
    ),
  },
  {
    name: "Midea",
    svg: (
      <svg viewBox="0 0 100 30" className="h-6 w-auto">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="currentColor">midea</text>
      </svg>
    ),
  },
  {
    name: "Danfoss",
    svg: (
      <svg viewBox="0 0 120 30" className="h-6 w-auto">
        <rect x="0" y="2" width="26" height="26" rx="3" fill="currentColor" />
        <text x="32" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">Danfoss</text>
      </svg>
    ),
  },
  {
    name: "IBBL",
    svg: (
      <svg viewBox="0 0 80 30" className="h-6 w-auto">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="22" fill="currentColor">IBBL</text>
      </svg>
    ),
  },
  {
    name: "Bitzer",
    svg: (
      <svg viewBox="0 0 100 30" className="h-6 w-auto">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="currentColor">BITZER</text>
      </svg>
    ),
  },
  {
    name: "Carrier",
    svg: (
      <svg viewBox="0 0 110 30" className="h-6 w-auto">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">Carrier</text>
      </svg>
    ),
  },
  {
    name: "Samsung",
    svg: (
      <svg viewBox="0 0 140 30" className="h-6 w-auto">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" letterSpacing="2" fill="currentColor">SAMSUNG</text>
      </svg>
    ),
  },
  {
    name: "LG",
    svg: (
      <svg viewBox="0 0 50 30" className="h-7 w-auto">
        <circle cx="15" cy="15" r="13" stroke="currentColor" strokeWidth="2.5" fill="none" />
        <text x="8" y="21" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="currentColor">LG</text>
      </svg>
    ),
  },
  {
    name: "Chemours",
    svg: (
      <svg viewBox="0 0 130 30" className="h-6 w-auto">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="currentColor">Chemours</text>
      </svg>
    ),
  },
  {
    name: "EBM Papst",
    svg: (
      <svg viewBox="0 0 140 30" className="h-6 w-auto">
        <text x="0" y="22" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="16" fill="currentColor">ebm-papst</text>
      </svg>
    ),
  },
];

const BrandBar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animationId: number;
    let scrollPos = 0;

    const scroll = () => {
      scrollPos += 0.5;
      if (scrollPos >= el.scrollWidth / 2) {
        scrollPos = 0;
      }
      el.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const allBrands = [...brands, ...brands];

  return (
    <section className="bg-card border-y border-border py-5 overflow-hidden">
      <div className="container mx-auto px-4">
        <div
          ref={scrollRef}
          className="flex items-center gap-10 md:gap-16 overflow-hidden"
          style={{ scrollBehavior: "auto" }}
        >
          {allBrands.map((brand, i) => (
            <span
              key={`${brand.name}-${i}`}
              className="text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer shrink-0"
            >
              {brand.svg}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBar;
