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
  createdAt: Date;
}
