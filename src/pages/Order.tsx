import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

// WhatsApp phone number (replace with actual number)
const WHATSAPP_NUMBER = "5511999999999";

// Helper function to parse price
const parsePrice = (priceStr: string): number => {
  return parseFloat(priceStr.replace(/[^\d,]/g, "").replace(",", ".")) || 0;
};

const Order = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { toast } = useToast();

  // Calculate totals
  const totalItems = cart.reduce((sum, item) => sum + item.clickCount, 0);
  const totalPrice = cart.reduce((sum, item) => {
    const product = mockProducts.find((p) => p.id === item.id);
    return sum + (product ? parsePrice(product.price) * item.clickCount : 0);
  }, 0);

  // Generate WhatsApp message
  const generateWhatsAppMessage = () => {
    let message = "*Novo Pedido - Galinho*\n\n";
    message += "*Itens:*\n";

    cart.forEach((item) => {
      const product = mockProducts.find((p) => p.id === item.id);
      if (product) {
        message += `- ${product.name} x${item.clickCount} = R$ ${(parsePrice(product.price) * item.clickCount).toFixed(2).replace(".", ",")}\n`;
      }
    });

    message += `\n*Total: R$ ${totalPrice.toFixed(2).replace(".", ",")}*\n`;
    message += `\nPor favor, confirme o pedido. Obrigado!`;

    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const message = generateWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");

    // Clear cart after sending to WhatsApp
    clearCart();

    toast({
      title: "Pedido enviado!",
      description: "Seu pedido foi enviado via WhatsApp.",
      duration: 3000,
    });

    navigate("/");
  };

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

          <h1 className="text-2xl font-bold mb-4">Confirmar Pedido</h1>

          {cart.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <p className="text-gray-500 mb-4">Seu carrinho esta vazio.</p>
              <Button onClick={() => navigate("/")}>Voltar para a loja</Button>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Total de itens: {totalItems}
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-3 border-b">
                  <h2 className="font-semibold">Resumo do Pedido</h2>
                </div>
                <div className="divide-y">
                  {cart.map((item) => {
                    const product = mockProducts.find((p) => p.id === item.id);
                    if (!product) return null;

                    return (
                      <div
                        key={item.id}
                        className="p-4 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            R${" "}
                            {parsePrice(product.price)
                              .toFixed(2)
                              .replace(".", ",")}{" "}
                            x {item.clickCount}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">
                            R${" "}
                            {(parsePrice(product.price) * item.clickCount)
                              .toFixed(2)
                              .replace(".", ",")}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="bg-muted px-4 py-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Total:</span>
                    <span className="font-bold text-lg">
                      R$ {totalPrice.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full mt-6"
                size="lg"
                onClick={handleWhatsAppOrder}
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar via WhatsApp
              </Button>

              <p className="text-sm text-muted-foreground text-center mt-4">
                Clique no botao acima para enviar seu pedido via WhatsApp
              </p>
            </>
          )}
        </div>
      </main>
      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Order;
