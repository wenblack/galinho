import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Category = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const decodedCategory = decodeURIComponent(categoryName || "");

  const [selectedOwners, setSelectedOwners] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  // Products in this category
  const categoryProducts = useMemo(
    () => mockProducts.filter((p) => p.category === decodedCategory),
    [decodedCategory]
  );

  // Unique owners from category products
  const owners = useMemo(() => {
    const o = categoryProducts.map((p) => p.owner).filter(Boolean);
    return [...new Set(o)] as string[];
  }, [categoryProducts]);

  const parsePrice = (priceStr: string): number =>
    parseFloat(priceStr.replace(/[^\d,]/g, "").replace(",", ".")) || 0;

  const filteredProducts = useMemo(() => {
    return categoryProducts.filter((product) => {
      const matchesOwner =
        selectedOwners.length === 0 ||
        (product.owner && selectedOwners.includes(product.owner));

      const price = parsePrice(product.price);
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];

      return matchesOwner && matchesPrice;
    });
  }, [categoryProducts, selectedOwners, priceRange]);

  const handleOwnerChange = (owner: string, checked: boolean) => {
    setSelectedOwners((prev) =>
      checked ? [...prev, owner] : prev.filter((o) => o !== owner)
    );
  };

  const clearFilters = () => {
    setSelectedOwners([]);
    setPriceRange([0, 10000]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6 md:gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full md:w-64 shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Owner filter */}
                {owners.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-3">Fabricante</h3>
                    <div className="space-y-2">
                      {owners.map((owner) => (
                        <div key={owner} className="flex items-center space-x-2">
                          <Checkbox
                            id={`owner-${owner}`}
                            checked={selectedOwners.includes(owner)}
                            onCheckedChange={(checked) =>
                              handleOwnerChange(owner, checked as boolean)
                            }
                          />
                          <label
                            htmlFor={`owner-${owner}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {owner}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

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
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>R$ {priceRange[0]}</span>
                      <span>R$ {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <Button variant="outline" onClick={clearFilters} className="w-full">
                  Limpar Filtros
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">{decodedCategory}</h1>
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

export default Category;
