import productCompressor from "@/assets/product-compressor.png";
import productPurifier from "@/assets/product-purifier.png";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "QR-0337 - Compressor",
    description: "Scroll Copeland 36.000 BTU R-410A / R-32",
    price: "R$ 4.500,00",
    image: productCompressor,
  },
  {
    id: 2,
    name: "QR-0398 - Compressor",
    description: "Rotativo 18.000 BTU/s R-410A",
    price: "R$ 2.800,00",
    image: productCompressor,
  },
  {
    id: 3,
    name: "QR-0725 - Compressor",
    description: "Hermético Embraco 1/4+ HP R-134a",
    price: "R$ 1.250,00",
    image: productCompressor,
  },
  {
    id: 4,
    name: "Purificador de Água",
    description: "Purificador Natural IBBL FR600",
    price: "R$ 890,00",
    image: productPurifier,
  },
];

const FeaturedProducts = () => {
  return (
    <section className="py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 uppercase">
          Produtos em Destaque
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-lg border border-border overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square bg-muted flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-3 md:p-4">
                <h3 className="text-xs md:text-sm font-semibold text-foreground line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[11px] md:text-xs text-muted-foreground mt-1 line-clamp-2">
                  {product.description}
                </p>
                <p className="text-sm md:text-base font-bold text-primary mt-2">
                  {product.price}
                </p>
                <button className="w-full mt-3 bg-primary text-primary-foreground text-xs md:text-sm font-semibold py-2 rounded hover:bg-primary/90 transition-colors uppercase">
                  Veja
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
