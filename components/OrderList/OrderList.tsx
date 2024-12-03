"use client";

import { useOrder } from "@/context/OrderContext";
import { FaMinus, FaPlus, FaShoppingBag } from "react-icons/fa";
import Price from "./Price";
import Footer from "./Footer";
import Header from "./Header";

export default function OrderList() {
  const { orderItems, updateQuantity, total, removeFromOrder } = useOrder();

  return (
    <div className="col-start-18 col-end-25 row-end-25 row-start-1 flex h-full flex-col bg-white shadow-lg">
      <Header />
      <div className="flex-grow overflow-y-auto">
        {orderItems.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="group relative p-4 transition-colors hover:bg-gray-50"
              >
                {/* Main Product Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-lg border border-gray-200 bg-white">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1.5 text-gray-500 transition-colors hover:text-gray-700"
                      >
                        <FaMinus className="h-4 w-4" />
                      </button>
                      <span className="min-w-[2rem] text-center font-medium text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1.5 text-gray-500 transition-colors hover:text-gray-700"
                      >
                        <FaPlus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Product Name */}
                    <span className="font-medium text-gray-900">
                      {item.product.name}
                    </span>
                  </div>

                  {/* Price */}
                  <Price
                    price={item.product.basePrice}
                    quantity={item.quantity}
                    onRemove={() => removeFromOrder(item.id)}
                  />
                </div>

                {/* Addons */}
                {item.addons.length > 0 && (
                  <div className="mt-2 space-y-1 pl-12">
                    {item.addons.map((addon) => (
                      <div
                        key={addon.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-600">+ {addon.name}</span>
                        <span className="text-gray-600">
                          {addon.price * item.quantity} kr
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="rounded-full bg-gray-100/80 p-4">
              <FaShoppingBag className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 font-medium text-gray-900">
              Your order is empty
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Add items to get started
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer total={total} />
    </div>
  );
}
