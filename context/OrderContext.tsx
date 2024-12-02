"use client";

import React, { createContext, useContext, useState } from "react";
import { Addon, Product } from "@prisma/client";

const hashUUIDs = (uuids: string[]) =>
  uuids.reduce((acc, uuid, index) => {
    if (index === 0) return uuid;
    return acc + "-" + uuid;
  }, "");

type OrderItem = {
  id: string;
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
    const uniqueId = hashUUIDs([
      product.id,
      ...addons.map((addon) => addon.id),
    ]);
    console.log({ product: product.name, uniqueId });
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === uniqueId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { id: uniqueId, product, quantity: 1, addons }];
    });
  };

  const removeFromOrder = (productId: string) => {
    setOrderItems((prevItems) =>
      prevItems.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    console.log({ productId, quantity });
    setOrderItems((prevItems) => {
      console.log({ prevItems });
      return prevItems
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0);
    });
  };

  const total = orderItems.reduce(
    (sum, item) =>
      sum +
      (item.product.basePrice +
        item.addons.reduce((acc, addon) => acc + addon.price, 0)) *
        item.quantity,
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
