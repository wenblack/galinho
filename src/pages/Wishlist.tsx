import React from "react";
import { useCart } from "@/contexts/CartContext";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist, addToWishlist } =
    useCart();

  const totalItems = wishlist.reduce((s, it) => s + it.clickCount, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>

      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Total de itens: {totalItems}
        </div>
        <Button
          variant="ghost"
          onClick={() => clearWishlist()}
          disabled={wishlist.length === 0}
        >
          Limpar wishlist
        </Button>
      </div>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Sua wishlist está vazia.</p>
      ) : (
        <div className="grid gap-4">
          {wishlist.map((item) => {
            const product = mockProducts.find((p) => p.id === item.id);
            return (
              <div
                key={item.id}
                className="p-4 border rounded flex items-center justify-between"
              >
                <div>
                  <div className="font-semibold">
                    {product?.name ?? `Produto ${item.id}`}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {product?.price ?? "-"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Adicionado: {new Date(item.addedAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-sm">Clicks: {item.clickCount}</div>
                  <Button size="sm" onClick={() => addToWishlist(item.id)}>
                    +
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFromWishlist(item.id)}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
