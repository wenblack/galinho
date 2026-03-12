import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useOrders } from "@/contexts/OrderContext";
import { useAuth } from "@/contexts/AuthContext";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, Package, Clock, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const statusSteps = ["Pedido realizado", "Pedido confirmado", "Pedido finalizado"] as const;

const statusColor: Record<string, string> = {
  "Pedido realizado": "bg-yellow-500/15 text-yellow-700 border-yellow-300",
  "Pedido confirmado": "bg-blue-500/15 text-blue-700 border-blue-300",
  "Pedido finalizado": "bg-green-500/15 text-green-700 border-green-300",
};

const observationColor: Record<string, string> = {
  "Em separação": "bg-orange-500/15 text-orange-700 border-orange-300",
  "Em rota de entrega": "bg-purple-500/15 text-purple-700 border-purple-300",
  "Entregue": "bg-green-500/15 text-green-700 border-green-300",
};

const Order = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getOrderById } = useOrders();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) navigate("/signin");
  }, [isAuthenticated, isLoading, navigate]);

  const order = id ? getOrderById(id) : undefined;

  if (!order) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg text-muted-foreground mb-4">Pedido não encontrado.</p>
            <Button onClick={() => navigate("/account")}>Voltar para Minha Conta</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const orderDate = new Date(order.createdAt);
  const currentStepIndex = statusSteps.indexOf(order.status as any);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-10">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate("/account")} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar para Minha Conta
          </Button>

          <div className="text-center mb-8">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-secondary" />
            <h1 className="text-2xl font-bold">Pedido Confirmado!</h1>
            <p className="text-muted-foreground mt-1">Código: {order.id}</p>
          </div>

          {/* Status Tracker */}
          <div className="bg-muted rounded-lg p-6 mb-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Acompanhamento
            </h2>
            <div className="flex items-center justify-between mb-3">
              {statusSteps.map((step, i) => (
                <div key={step} className="flex flex-col items-center flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    i <= currentStepIndex ? "bg-secondary text-secondary-foreground" : "bg-muted-foreground/20 text-muted-foreground"
                  }`}>
                    {i + 1}
                  </div>
                  <p className={`text-[10px] sm:text-xs mt-1 text-center ${i <= currentStepIndex ? "font-semibold" : "text-muted-foreground"}`}>
                    {step.replace("Pedido ", "")}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-3">
              <Badge className={statusColor[order.status]}>{order.status}</Badge>
              {order.observation && (
                <Badge className={observationColor[order.observation]}>
                  <Truck className="w-3 h-3 mr-1" />
                  {order.observation}
                </Badge>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-muted rounded-lg p-4 mb-6 flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Data do pedido</p>
              <p className="font-semibold">
                {orderDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Horário</p>
              <p className="font-semibold">
                {orderDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>

          {/* Items */}
          <div className="border rounded-lg overflow-hidden mb-6">
            <div className="bg-muted px-4 py-3 border-b">
              <h2 className="font-semibold">Itens do Pedido ({order.items.length})</h2>
            </div>
            <div className="divide-y">
              {order.items.map((item, idx) => {
                const product = mockProducts.find((p) => p.id === item.productId);
                return (
                  <div key={idx} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {product?.image && (
                        <img src={product.image} alt={product?.name} className="w-12 h-12 object-contain rounded" />
                      )}
                      <div>
                        <p className="font-semibold">{product?.name ?? "Produto"}</p>
                        <p className="text-sm text-muted-foreground">
                          R$ {item.priceAtPurchase.toFixed(2).replace(".", ",")} × {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">
                      R$ {(item.priceAtPurchase * item.quantity).toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                );
              })}
            </div>
            <Separator />
            <div className="px-4 py-4 flex justify-between items-center bg-muted">
              <span className="font-bold text-lg">Total</span>
              <span className="font-bold text-lg">R$ {order.total.toFixed(2).replace(".", ",")}</span>
            </div>
          </div>

          <Button className="w-full" onClick={() => navigate("/")}>Continuar Comprando</Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Order;
