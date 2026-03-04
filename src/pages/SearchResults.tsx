import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = mockProducts.map((p) => p.category).filter(Boolean);
    return [...new Set(cats)] as string[];
  }, []);

  // Parse price from string (e.g., "R$ 4.500,00" -> 4500)
  const parsePrice = (priceStr: string): number => {
    return parseFloat(priceStr.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      // Search query filter
      const matchesQuery =
        query === "" ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        (product.category &&
          product.category.toLowerCase().includes(query.toLowerCase()));

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        (product.category && selectedCategories.includes(product.category));

      // Price filter
      const productPrice = parsePrice(product.price);
      const matchesPrice =
        productPrice >= priceRange[0] && productPrice <= priceRange[1];

      // Stock filter
      const matchesStock = !inStockOnly || product.inStock;

      return matchesQuery && matchesCategory && matchesPrice && matchesStock;
    });
  }, [query, selectedCategories, priceRange, inStockOnly]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category));
    }
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className="w-64 shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Search Query */}
                {query && (
                  <div>
                    <h3 className="font-medium mb-2">Busca</h3>
                    <Badge variant="secondary">"{query}"</Badge>
                  </div>
                )}

                {/* Categories */}
                <div>
                  <h3 className="font-medium mb-3">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div
                        key={category}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium mb-3">Faixa de Preço</h3>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      max={10000}
                      min={0}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>R$ {priceRange[0]}</span>
                      <span>R$ {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="inStock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) =>
                        setInStockOnly(checked as boolean)
                      }
                    />
                    <label
                      htmlFor="inStock"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Apenas em estoque
                    </label>
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  onClick={clearFilters}
                  className="w-full"
                >
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                Resultados da Busca
                {query && (
                  <span className="text-gray-600"> para "{query}"</span>
                )}
              </h1>
              <p className="text-gray-600">
                {filteredProducts.length} produto
                {filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductList products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  Nenhum produto encontrado com os filtros aplicados.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResults;
