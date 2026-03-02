const PromoBanners = () => {
  return (
    <section className="py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="relative overflow-hidden rounded-lg group bg-secondary h-32 md:h-40 flex items-center px-6"
          >
            <div className="z-10">
              <p className="text-secondary-foreground font-bold text-lg md:text-xl">
                Peças para Ar-Condicionado
              </p>
              <span className="inline-block mt-2 cta-gradient text-accent-foreground text-xs font-bold py-1.5 px-4 rounded uppercase">
                Confira
              </span>
            </div>
            <div className="absolute inset-0 bg-secondary/80 group-hover:bg-secondary/70 transition-colors" />
          </a>
          <a
            href="#"
            className="relative overflow-hidden rounded-lg group h-32 md:h-40 flex items-center px-6"
            style={{ background: "hsl(0 70% 40%)" }}
          >
            <div className="z-10">
              <p className="text-primary-foreground font-bold text-lg md:text-xl">
                Purificadores de Água
              </p>
              <span className="inline-block mt-2 bg-primary-foreground text-foreground text-xs font-bold py-1.5 px-4 rounded uppercase">
                Saiba mais
              </span>
            </div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
