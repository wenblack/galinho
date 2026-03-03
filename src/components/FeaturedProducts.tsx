import { useState } from "react";
import { mockProducts } from "@/data/products";
import { Product } from "@/types/product";
import ProductList from "@/components/ProductList";

const FeaturedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Get only first 4 products for featured section
  const featuredProducts = mockProducts.slice(0, 4);

  const handleViewProduct = (product: Product) => {
    setSelectedProduct(product);
    console.log("Product selected:", product);
    // TODO: Navigate to product detail page or open modal
  };

  return (
    <section className="py-6 sm:py-10 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6 uppercase">
          Produtos em Destaque
        </h2>
        <ProductList
          products={featuredProducts}
          columns={4}
          layout="grid"
          onProductClick={handleViewProduct}
        />
      </div>
    </section>
  );
};

export default FeaturedProducts;
