"use client";

import { useOrder } from "@/context/OrderContext";

export default function OrderList() {
  const { orderItems, removeFromOrder, updateQuantity, total } = useOrder();
  return (
    <div className="col-start-10 col-end-13 row-start-1 row-end-13 bg-emerald-500">
      {orderItems.map((item) => (
        <div key={item.product.id} className="flex justify-between p-2">
          <div className="flex">
            <button
              onClick={() => removeFromOrder(item.product.id)}
              className="text-white"
            >
              -
            </button>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(item.product.id, parseInt(e.target.value, 10))
              }
              className="w-10 text-black"
            />
            <span className="text-white">{item.product.name}</span>
          </div>
          <span className="text-white">
            {item.product.basePrice * item.quantity} kr
          </span>
        </div>
      ))}
    </div>
  );
}
