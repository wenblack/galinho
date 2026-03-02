import productCompressor from "@/assets/product-compressor.png";
import productPurifier from "@/assets/product-purifier.png";

const categories = [
  { name: "Compressores", image: productCompressor },
  { name: "Purificadores", image: productPurifier },
  { name: "Peças", image: productCompressor },
  { name: "Ferramentas", image: productPurifier },
];

const CategorySection = () => {
  return (
    <section className="py-10 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">
          Encontre o que você precisa
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="bg-card rounded-lg border border-border p-4 flex flex-col items-center gap-3 hover:shadow-md transition-shadow group"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <span className="text-sm font-semibold text-foreground">{cat.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
