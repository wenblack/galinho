export type OrderStatus = "Pedido realizado" | "Pedido confirmado" | "Pedido finalizado";
export type OrderObservation = "" | "Em separação" | "Em rota de entrega" | "Entregue";

export interface OrderItem {
  productId: number;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  userId: number;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  observation: OrderObservation;
  createdAt: Date;
}
