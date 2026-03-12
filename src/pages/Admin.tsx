import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { mockProducts } from "@/data/products";
import { mockUsers } from "@/data/users";
import { OrderStatus, OrderObservation } from "@/types/order";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ShieldCheck, Package, Users, ArrowLeft } from "lucide-react";

const statusOptions: OrderStatus[] = ["Pedido realizado", "Pedido confirmado", "Pedido finalizado"];
const observationOptions: OrderObservation[] = ["", "Em separação", "Em rota de entrega", "Entregue"];

const statusColor: Record<OrderStatus, string> = {
  "Pedido realizado": "bg-yellow-500/15 text-yellow-700 border-yellow-300",
  "Pedido confirmado": "bg-blue-500/15 text-blue-700 border-blue-300",
  "Pedido finalizado": "bg-green-500/15 text-green-700 border-green-300",
};

const observationColor: Record<string, string> = {
  "": "",
  "Em separação": "bg-orange-500/15 text-orange-700 border-orange-300",
  "Em rota de entrega": "bg-purple-500/15 text-purple-700 border-purple-300",
  "Entregue": "bg-green-500/15 text-green-700 border-green-300",
};

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { orders, updateOrderStatus, updateOrderObservation } = useOrders();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || !user?.isAdmin)) {
      navigate("/");
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  if (isLoading || !user?.isAdmin) return null;

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    toast({ title: "Status atualizado", description: `Pedido ${orderId} → ${status}`, duration: 2000 });
  };

  const handleObservationChange = (orderId: string, obs: OrderObservation) => {
    updateOrderObservation(orderId, obs);
    toast({ title: "Observação atualizada", description: obs || "Observação removida", duration: 2000 });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pb-10">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Button variant="ghost" onClick={() => navigate("/account")} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
          </Button>

          <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="w-7 h-7 text-primary" />
            <h1 className="text-2xl font-bold">Painel Administrativo</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6 text-center">
                <Package className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                <p className="text-2xl font-bold">{orders.length}</p>
                <p className="text-xs text-muted-foreground">Total Pedidos</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Pedido realizado").length}</p>
                <p className="text-xs text-muted-foreground">Aguardando</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Pedido confirmado").length}</p>
                <p className="text-xs text-muted-foreground">Confirmados</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-2xl font-bold">{orders.filter((o) => o.status === "Pedido finalizado").length}</p>
                <p className="text-xs text-muted-foreground">Finalizados</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders */}
          {orders.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Nenhum pedido registrado.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const orderDate = new Date(order.createdAt);
                const customer = mockUsers.find((u) => u.id === order.userId);
                return (
                  <Card key={order.id}>
                    <CardHeader className="pb-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <CardTitle className="text-base">{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {customer?.name ?? "Cliente desconhecido"} • {customer?.email}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {orderDate.toLocaleDateString("pt-BR")} às{" "}
                            {orderDate.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge className={statusColor[order.status]}>{order.status}</Badge>
                          {order.observation && (
                            <Badge className={observationColor[order.observation]}>{order.observation}</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Items summary */}
                      <div className="text-sm space-y-1 mb-4">
                        {order.items.map((item, i) => {
                          const prod = mockProducts.find((p) => p.id === item.productId);
                          return (
                            <p key={i} className="text-muted-foreground">
                              {prod?.name ?? "Produto"} × {item.quantity} — R$ {(item.priceAtPurchase * item.quantity).toFixed(2).replace(".", ",")}
                            </p>
                          );
                        })}
                        <p className="font-bold pt-1">Total: R$ {order.total.toFixed(2).replace(".", ",")}</p>
                      </div>

                      <Separator className="mb-4" />

                      {/* Controls */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Status do pedido</label>
                          <Select value={order.status} onValueChange={(v) => handleStatusChange(order.id, v as OrderStatus)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              {statusOptions.map((s) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex-1">
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Observação</label>
                          <Select value={order.observation || "none"} onValueChange={(v) => handleObservationChange(order.id, (v === "none" ? "" : v) as OrderObservation)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">Nenhuma</SelectItem>
                              {observationOptions.filter(Boolean).map((o) => (
                                <SelectItem key={o} value={o}>{o}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
