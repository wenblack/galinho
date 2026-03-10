import catAc from "@/assets/cat-ac.png";
import catCompressor from "@/assets/cat-compressor.png";
import catParts from "@/assets/cat-parts.png";
import catTools from "@/assets/cat-tools.png";
import catPurifier from "@/assets/cat-purifier.png";
import catPortable from "@/assets/cat-portable.png";

const categories = [
  { name: "Ar Condicionados", image: catAc, href: "/category/Ar Condicionados" },
  { name: "Compressores", image: catCompressor, href: "/category/Compressores" },
  { name: "Peças e Acessórios", image: catParts, href: "/category/Peças" },
  { name: "Ferramentas", image: catTools, href: "/category/Ferramentas" },
  { name: "Purificadores", image: catPurifier, href: "/category/Purificadores" },
  { name: "Portáteis", image: catPortable, href: "/category/Portáteis" },
];

const CategorySection = () => {
  return (
    <section className="py-10 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Encontre o que você precisa
          </h2>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/30" />
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href={cat.href}
              className="bg-card rounded-xl border border-border p-3 md:p-4 flex flex-col items-center gap-3 hover:shadow-lg hover:border-primary/30 transition-all duration-300 group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-xs md:text-sm font-semibold text-foreground text-center leading-tight">
                {cat.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
