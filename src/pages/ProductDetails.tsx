import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { mockProducts } from "@/data/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductDetails = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Get product from location state or fetch it
    const locationState = location.state as { product?: Product };
    if (locationState?.product) {
      setProduct(locationState.product);
    } else {
      // Fallback: In a real app, you would fetch from an API
      // For now, we'll show a message
      setProduct(mockProducts.find((p) => p.id === Number(productId)) || null);
    }
    setIsLoading(false);
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Card className="text-center py-12">
            <p className="text-gray-500 text-lg">Produto não encontrado</p>
            <Button className="mt-4" onClick={() => navigate("/")}>
              Ir para Home
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Implement cart logic here
    console.log("Produto adicionado ao carrinho:", product);
    // You can show a toast notification
  };

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          {/* Product Details Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover max-h-96"
              />
            </div>

            {/* Product Info */}
            <Card className="flex flex-col justify-between">
              <CardHeader>
                {/* Category Badge */}
                {product.category && (
                  <Badge className="w-fit mb-4">{product.category}</Badge>
                )}

                {/* Product Name */}
                <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="outline">⭐ {product.rating} / 5</Badge>
                  </div>
                )}

                {/* Stock Status */}
                <div className="mb-4">
                  {product.inStock ? (
                    <Badge variant="default" className="bg-green-600">
                      Em Estoque
                    </Badge>
                  ) : (
                    <Badge variant="destructive">Fora de Estoque</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-6 flex-grow">
                {/* Description */}
                <div>
                  <h2 className="text-lg font-semibold mb-2">Descrição</h2>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Price */}
                <div className="border-t pt-6">
                  <p className="text-gray-500 text-sm mb-2">Preço</p>
                  <p className="text-4xl font-bold text-primary">
                    {product.price}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="border-t pt-6 space-y-3">
                  <Button
                    className="w-full"
                    size="lg"
                    disabled={!product.inStock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    {product.inStock ? "Adicionar ao Carrinho" : "Indisponível"}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={handleToggleFavorite}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${
                        isFavorite ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                    {isFavorite
                      ? "Remover dos Favoritos"
                      : "Adicionar aos Favoritos"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetails;
