import { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Produtos = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [inStockOnly, setInStockOnly] = useState(false);

  const categories = useMemo(() => {
    const cats = mockProducts.map((p) => p.category).filter(Boolean);
    return [...new Set(cats)] as string[];
  }, []);

  const parsePrice = (priceStr: string): number =>
    parseFloat(priceStr.replace(/[^\d,]/g, "").replace(",", ".")) || 0;

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        (product.category && selectedCategories.includes(product.category));
      const productPrice = parsePrice(product.price);
      const matchesPrice =
        productPrice >= priceRange[0] && productPrice <= priceRange[1];
      const matchesStock = !inStockOnly || product.inStock;
      return matchesCategory && matchesPrice && matchesStock;
    });
  }, [selectedCategories, priceRange, inStockOnly]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    setSelectedCategories((prev) =>
      checked ? [...prev, category] : prev.filter((c) => c !== category)
    );
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
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          <aside className="w-full md:w-64 shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-3">Categorias</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cat-${category}`}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) =>
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`cat-${category}`}
                          className="text-sm font-medium leading-none"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

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
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>R$ {priceRange[0]}</span>
                      <span>R$ {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={inStockOnly}
                    onCheckedChange={(checked) =>
                      setInStockOnly(checked as boolean)
                    }
                  />
                  <label htmlFor="inStock" className="text-sm font-medium leading-none">
                    Apenas em estoque
                  </label>
                </div>

                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">Produtos</h1>
              <p className="text-muted-foreground">
                {filteredProducts.length} produto
                {filteredProducts.length !== 1 ? "s" : ""} encontrado
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <ProductList products={filteredProducts} />
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg mb-4">
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

export default Produtos;
