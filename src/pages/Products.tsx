import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductList from "@/components/ProductList";
import { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ProductsCatalog = () => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [category, setCategory] = useState<string | undefined>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products with the hook
  const {
    data: productsData,
    isLoading,
    error,
  } = useProducts(page, pageSize, category);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-red-500">
          Erro ao carregar produtos: {error.message}
        </p>
      </div>
    );
  }

  const products = productsData?.data || [];
  const total = productsData?.total || 0;
  const totalPages = Math.ceil(total / pageSize);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    console.log("Selected product:", product);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Catálogo de Produtos
          </h1>
          <p className="text-gray-600">
            Total de {total} produto{total !== 1 ? "s" : ""} encontrado
            {total !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Categoria</label>
            <Select value={category || ""} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as categorias" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas as categorias</SelectItem>
                <SelectItem value="Compressores">Compressores</SelectItem>
                <SelectItem value="Filtros e Purificadores">
                  Filtros e Purificadores
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">
              Itens por página
            </label>
            <Select
              value={pageSize.toString()}
              onValueChange={(v) => {
                setPageSize(Number(v));
                setPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 itens</SelectItem>
                <SelectItem value="10">10 itens</SelectItem>
                <SelectItem value="20">20 itens</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <ProductList
          products={products}
          isLoading={isLoading}
          layout="grid"
          columns={4}
          onProductClick={handleProductClick}
        />

        {/* Selected Product Info */}
        {selectedProduct && (
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-bold text-lg mb-2">Produto Selecionado:</h3>
            <p className="text-sm">
              <strong>Nome:</strong> {selectedProduct.name}
            </p>
            <p className="text-sm">
              <strong>Preço:</strong> {selectedProduct.price}
            </p>
            <p className="text-sm">
              <strong>Status:</strong>{" "}
              {selectedProduct.inStock ? "Em estoque" : "Fora de estoque"}
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <Button
              variant="outline"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              Anterior
            </Button>

            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .slice(Math.max(0, page - 2), Math.min(totalPages, page + 1))
                .map((p) => (
                  <Button
                    key={p}
                    variant={page === p ? "default" : "outline"}
                    onClick={() => setPage(p)}
                    disabled={isLoading}
                  >
                    {p}
                  </Button>
                ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              Próxima
            </Button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Carregando produtos...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsCatalog;
