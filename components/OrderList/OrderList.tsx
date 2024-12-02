"use client";

import { getOrderItemKey } from "@/utils/orderUtils";
import { useOrder } from "@/context/OrderContext";
import { FiMinus, FiPlus } from "react-icons/fi";

export default function OrderList() {
  const { orderItems, updateQuantity, total } = useOrder();

  return (
    <div className="col-start-10 col-end-13 row-start-1 row-end-13 flex h-full flex-col border-l-1 border-slate-600 bg-white">
      <div className="flex-grow pt-4">
        {orderItems.length ? (
          orderItems.map((item) => (
            <div key={item.id} className="border-b p-2">
              <div className="flex justify-between">
                <div className="flex flex-row">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="flex w-4 items-center justify-center text-black"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-2 text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex w-4 items-center justify-center text-black"
                  >
                    <FiPlus />
                  </button>
                  <span className="max-w-36 overflow-hidden text-ellipsis text-nowrap pl-4 text-black">
                    {item.product.name}
                  </span>
                </div>
                <span className="text-black">
                  {item.product.basePrice * item.quantity} kr
                </span>
              </div>
              {item.addons.length > 0 && (
                <div className="ml-14 mt-1">
                  {item.addons.map((addon) => (
                    <div
                      key={addon.id}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>+ {addon.name}</span>
                      <span>{addon.price * item.quantity} kr</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-black">No items in order</span>
          </div>
        )}
      </div>

      <div className="border-t-2 border-slate-600 p-4">
        <div className="flex justify-between pb-4">
          <span className="font-semibold text-black">Total:</span>
          <span className="font-semibold text-black">{total} kr</span>
        </div>
        <button
          onClick={() => alert("Order placed!")}
          className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}
