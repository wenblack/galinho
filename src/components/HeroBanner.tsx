import { Heart } from "lucide-react";
import heroAc from "@/assets/hero-ac.png";

const HeroBanner = () => {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-16 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div className="text-primary-foreground z-10 flex-1 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight mb-2 sm:mb-3">
            Ar-Condicionado
          </h1>
          <p className="text-base sm:text-lg md:text-2xl font-light mb-4 sm:mb-6 opacity-90">
            com preços imperdíveis
          </p>
          <a
            href="#"
            className="inline-block cta-gradient text-accent-foreground font-bold py-2.5 sm:py-3 px-6 sm:px-8 rounded-md text-xs sm:text-sm uppercase tracking-wider hover:opacity-90 transition-opacity shadow-lg"
          >
            Aproveitar
          </a>
        </div>
        <div className="flex-1 relative flex justify-center">
          <button aria-label="Adicionar aos favoritos" className="absolute top-0 right-2 sm:right-4 md:right-0 text-primary-foreground hover:text-accent transition-colors z-10">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <img
            src={heroAc}
            alt="Ar-Condicionado"
            className="max-w-[200px] sm:max-w-xs md:max-w-md drop-shadow-2xl"
          />
          <div className="absolute bottom-2 right-4 flex gap-1.5">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary-foreground" />
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary-foreground/40" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
