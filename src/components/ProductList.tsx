import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface ProductListProps {
  products: Product[];
  isLoading?: boolean;
  onProductClick?: (product: Product) => void;
  layout?: "grid" | "list";
  columns?: number;
}

/**
 * ProductList Component - Similar to FlatList in React Native
 * Displays a list/grid of products with optional click handlers
 */
export const ProductList = ({
  products,
  isLoading = false,
  onProductClick,
  layout = "grid",
  columns = 4,
}: ProductListProps) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4`}>
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-t-lg" />
              <CardContent className="pt-4">
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
      </div>
    );
  }

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    onProductClick?.(product);
    // Navigate to product details page
    navigate(`/product/${product.id}`, { state: { product } });
  };

  const gridColsClass =
    {
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      6: "grid-cols-6",
    }[columns] || "grid-cols-4";

  const containerClass =
    layout === "grid"
      ? `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4`
      : "flex flex-col gap-4";

  return (
    <div className={containerClass}>
      {products.map((product) => (
        <Card
          key={product.id}
          className={`overflow-hidden hover:shadow-lg transition-shadow cursor-pointer ${
            selectedProduct?.id === product.id ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleProductClick(product)}
        >
          <div className="relative overflow-hidden bg-gray-100 h-48">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            {!product.inStock && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Badge variant="secondary">Fora de Estoque</Badge>
              </div>
            )}
          </div>

          <CardHeader className="pb-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className="font-semibold text-sm line-clamp-2">
                  {product.name}
                </h3>
                {product.category && (
                  <CardDescription className="text-xs mt-1">
                    {product.category}
                  </CardDescription>
                )}
              </div>
              {product.rating && (
                <Badge variant="outline" className="text-xs">
                  ⭐ {product.rating}
                </Badge>
              )}
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-xs text-gray-600 line-clamp-2 mb-3">
              {product.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-bold text-primary text-lg">
                {product.price}
              </span>
              <Button
                size="sm"
                variant={product.inStock ? "default" : "secondary"}
                disabled={!product.inStock}
                onClick={(e) => {
                  e.stopPropagation();
                  // Add to cart logic here
                  console.log("Adicionado ao carrinho:", product);
                }}
              >
                {product.inStock ? "Adicionar" : "Indisponível"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
