import { useEffect, useRef } from "react";

const brands: Array<{ name: string; img: string; svg?: React.ReactNode }> = [
  {
    name: "Midea",
    img: "/logo_midea.png",
  },
  {
    name: "Danfoss",
    img: "/logo_danfoss.png",
  },
  {
    name: "IBBL",
    img: "/logo_ibbl.png",
  },
  {
    name: "Bitzer",
    img: "/logo_bitzer.png",
  },
  {
    name: "Carrier",
    img: "/logo_carrier.png",
  },
  {
    name: "Chemours",
    img: "/logo_the_chemours.png",
  },
  {
    name: "EBM Papst",
    img: "/logo_ebm.png",
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
              {brand.img ? (
                <img
                  src={brand.img}
                  alt={brand.name}
                  className="h-[118px] w-auto object-contain"
                />
              ) : (
                brand.svg
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBar;
