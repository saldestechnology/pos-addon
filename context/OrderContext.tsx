// contexts/OrderContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";
import { Addon, Product } from "@prisma/client";

type OrderItem = {
  product: Product;
  quantity: number;
  addons: Addon[];
};

type OrderContextType = {
  orderItems: OrderItem[];
  addToOrder: (product: Product, addons: Addon[]) => void;
  removeFromOrder: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  total: number;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const addToOrder = (product: Product, addons: Addon[]) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id && item.addons === addons,
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id && item.addons === addons
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { product, quantity: 1, addons }];
    });
  };

  const removeFromOrder = (productId: string) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setOrderItems((prevItems) =>
      prevItems
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.product.basePrice * item.quantity,
    0,
  );

  return (
    <OrderContext.Provider
      value={{
        orderItems,
        addToOrder,
        removeFromOrder,
        updateQuantity,
        total,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
}
