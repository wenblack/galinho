import { useEffect, useRef } from "react";

const brands = [
  { name: "Copeland", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Emerson_Electric_logo.svg/200px-Emerson_Electric_logo.svg.png" },
  { name: "Midea", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Midea_logo.svg/200px-Midea_logo.svg.png" },
  { name: "Danfoss", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Danfoss-Logo.svg/200px-Danfoss-Logo.svg.png" },
  { name: "IBBL", logo: "" },
  { name: "Bitzer", logo: "" },
  { name: "Carrier", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Carrier_logo.svg/200px-Carrier_logo.svg.png" },
  { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png" },
  { name: "LG", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG_logo_%282015%29.svg/200px-LG_logo_%282015%29.svg.png" },
  { name: "Chemours", logo: "" },
  { name: "EBM Papst", logo: "" },
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
    const handleMouseLeave = () => { animationId = requestAnimationFrame(scroll); };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Double the brands for infinite scroll effect
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
              className="text-foreground/50 font-bold text-sm md:text-base tracking-wide hover:text-foreground/80 transition-colors cursor-pointer shrink-0"
            >
              {brand.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBar;
