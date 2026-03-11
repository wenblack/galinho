import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
};

const Cart = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const {
    cart,
    removeFromCart,
    clearCart,
    addToCart,
    decrementCartItemClicks,
  } = useCart();
  const { createOrder } = useOrders();
  const { toast } = useToast();

  const handleConfirmOrder = () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Login necessário",
        description: "Por favor, faça login para confirmar seu pedido.",
        duration: 3000,
      });
      navigate("/signin");
      return;
    }

    const orderItems = cart.map((item) => {
      const product = mockProducts.find((p) => p.id === item.id);
      return {
        productId: item.id,
        quantity: item.clickCount,
        priceAtPurchase: product ? parsePrice(product.price) : 0,
      };
    });

    const total = orderItems.reduce((s, i) => s + i.priceAtPurchase * i.quantity, 0);
    const order = createOrder(user.id, orderItems, total);
    clearCart();

    toast({
      title: "Pedido realizado!",
      description: `Código do pedido: ${order.id}`,
      duration: 4000,
    });

    navigate(`/order/${order.id}`);
  };

  const totalItems = cart.reduce((s, it) => s + it.clickCount, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-10">
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
            <p className="text-muted-foreground">Seu carrinho está vazio.</p>
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
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="text-sm">Qtd: {item.clickCount}</div>
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
              onClick={handleConfirmOrder}
            >
              Confirmar Pedido
            </Button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
