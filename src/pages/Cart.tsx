import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    clearCart,
    addToCart,
    decrementCartItemClicks,
  } = useCart();
  const { toast } = useToast();

  const totalItems = cart.reduce((s, it) => s + it.clickCount, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="top-0 w-full">
        <Header />
      </div>
      <main className="flex-1 pb-10 relative">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <h1 className="text-2xl font-bold mb-4">Carrinho</h1>

          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Total de itens: {totalItems}
            </div>
            <Button
              variant="ghost"
              onClick={() => clearCart()}
              disabled={cart.length === 0}
            >
              Limpar carrinho
            </Button>
          </div>

          {cart.length === 0 ? (
            <p className="text-gray-500">Seu carrinho está vazio.</p>
          ) : (
            <div className="grid gap-4">
              {cart.map((item) => {
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
                      <div className="text-sm">
                        Quantidade: {item.clickCount}
                      </div>
                      {item.clickCount > 1 && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => decrementCartItemClicks(item.id)}
                        >
                          −
                        </Button>
                      )}
                      <Button size="sm" onClick={() => addToCart(item.id)}>
                        +
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remover
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cart.length > 0 && (
            <Button
              className="w-full mt-6"
              size="lg"
              onClick={() => {
                navigate("/order");
              }}
            >
              Confirmar Pedido
            </Button>
          )}
        </div>
      </main>
      <div className=" bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
