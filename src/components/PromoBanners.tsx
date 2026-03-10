import promoParts from "@/assets/promo-parts.png";
import promoPurifier from "@/assets/promo-purifier.png";

const PromoBanners = () => {
  return (
    <section className="py-6 sm:py-8 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Peças para Ar-Condicionado */}
          <a
            href="/category/Peças"
            className="relative overflow-hidden rounded-xl group h-36 sm:h-40 md:h-48 flex items-center justify-between px-5 sm:px-8"
            style={{ background: "linear-gradient(135deg, #C8A200 0%, #DAB800 100%)" }}
          >
            <div className="z-10 flex-1">
              <p className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight mb-3">
                Peças para<br />Ar-Condicionado
              </p>
              <span className="inline-block bg-accent text-accent-foreground text-xs font-bold py-2 px-5 rounded-md uppercase tracking-wide hover:opacity-90 transition-opacity">
                Confira
              </span>
            </div>
            <div className="z-10 flex-shrink-0 w-24 sm:w-32 md:w-40">
              <img
                src={promoParts}
                alt="Peças para Ar-Condicionado"
                className="w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </a>

          {/* Purificadores de Água */}
          <a
            href="/category/Purificadores"
            className="relative overflow-hidden rounded-xl group h-36 sm:h-40 md:h-48 flex items-center justify-between px-5 sm:px-8"
            style={{ background: "linear-gradient(135deg, #8B1A1A 0%, #B22222 100%)" }}
          >
            <div className="z-10 flex-1">
              <p className="text-white font-bold text-lg sm:text-xl md:text-2xl leading-tight mb-3">
                Purificadores<br />de Água
              </p>
              <span className="inline-block bg-white text-foreground text-xs font-bold py-2 px-5 rounded-md uppercase tracking-wide hover:opacity-90 transition-opacity">
                Confira
              </span>
            </div>
            <div className="z-10 flex-shrink-0 w-24 sm:w-32 md:w-40">
              <img
                src={promoPurifier}
                alt="Purificadores de Água"
                className="w-full object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
