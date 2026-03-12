import React, { createContext, useContext, useState, useEffect } from "react";
import { Order, OrderItem, OrderStatus, OrderObservation } from "@/types/order";

const ORDER_STORAGE_KEY = "galinho_orders";

interface OrderContextType {
  orders: Order[];
  createOrder: (userId: number, items: OrderItem[], total: number) => Order;
  getOrderById: (id: string) => Order | undefined;
  getOrdersByUser: (userId: number) => Order[];
  updateOrderStatus: (id: string, status: OrderStatus) => void;
  updateOrderObservation: (id: string, observation: OrderObservation) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(ORDER_STORAGE_KEY);
    if (stored) {
      setOrders(JSON.parse(stored));
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
    }
  }, [orders, isInitialized]);

  const createOrder = (userId: number, items: OrderItem[], total: number): Order => {
    const order: Order = {
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      userId,
      items,
      total,
      createdAt: new Date(),
    };
    setOrders((prev) => [order, ...prev]);
    return order;
  };

  const getOrderById = (id: string) => orders.find((o) => o.id === id);

  const getOrdersByUser = (userId: number) => orders.filter((o) => o.userId === userId);

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrderById, getOrdersByUser }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderContextProvider");
  }
  return context;
};
