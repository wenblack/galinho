import { Heart } from "lucide-react";
import heroAc from "@/assets/hero-ac.png";

const HeroBanner = () => {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 py-10 sm:py-12 md:py-20 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="text-primary-foreground z-10 flex-1 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-3 sm:mb-4">
            Ar Condicionais
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 opacity-90">
            com preços imperdíveis
          </p>
          <a
            href="/category/Ar Condicionados"
            className="inline-block cta-gradient text-accent-foreground font-bold py-3 sm:py-3.5 px-8 sm:px-10 rounded-md text-sm sm:text-base uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
          >
            Aproveitar
          </a>
        </div>
        <div className="flex-1 relative flex justify-center">
          <button
            aria-label="Adicionar aos favoritos"
            className="absolute top-0 right-2 sm:right-4 md:right-0 text-primary-foreground hover:text-accent transition-colors z-10"
          >
            <Heart className="w-7 h-7 sm:w-8 sm:h-8" />
          </button>
          <img
            src={heroAc}
            alt="Ar-Condicionado"
            className="max-w-[220px] sm:max-w-xs md:max-w-md lg:max-w-lg drop-shadow-2xl"
          />
          <div className="absolute bottom-3 right-4 flex gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary-foreground/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
