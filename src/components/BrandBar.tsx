const brands = ["Hotpoint", "Midea", "Ibbl", "Fantastik", "Chemours"];

const BrandBar = () => {
  return (
    <section className="bg-card border-y border-border py-5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-8 md:gap-16 flex-wrap">
          {brands.map((brand) => (
            <span
              key={brand}
              className="text-foreground/50 font-bold text-sm md:text-base tracking-wide hover:text-foreground/80 transition-colors cursor-pointer"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandBar;
