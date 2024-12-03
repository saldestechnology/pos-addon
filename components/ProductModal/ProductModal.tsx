import React, { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { Addon, AddonGroup, Product } from "@prisma/client";

interface ProductModalProps {
  product: Product & {
    addonGroups: (AddonGroup & {
      addons: Addon[];
    })[];
  };
  onClose: () => void;
}

const ProductModal = ({ product, onClose }: ProductModalProps) => {
  const { addToOrder } = useOrder();
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [activeGroup, setActiveGroup] = useState(0);

  const handleAddonChange = (addon: Addon, isSelected: boolean) => {
    setSelectedAddons((prev) =>
      isSelected ? [...prev, addon] : prev.filter((a) => a.id !== addon.id),
    );
  };

  const handleAddToOrder = () => {
    addToOrder(product, selectedAddons);
    onClose();
  };

  const totalPrice =
    product.basePrice +
    selectedAddons.reduce((sum, addon) => sum + addon.price, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="animate-fade-up w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Section */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="mt-2 text-white/80">{product.description}</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b">
          {product.addonGroups.map((group, idx) => (
            <button
              key={group.id}
              onClick={() => setActiveGroup(idx)}
              className={`relative px-6 py-4 text-sm font-medium transition-all duration-300 ${activeGroup === idx ? "text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            >
              {group.name}
              {activeGroup === idx && (
                <div className="animate-slide-in absolute bottom-0 left-0 h-0.5 w-full bg-blue-600" />
              )}
            </button>
          ))}
        </div>

        {/* Addon Groups */}
        <div className="h-112 max-h-[calc(100vh-24rem)] overflow-y-auto p-6">
          <div className="space-y-6">
            {product.addonGroups.map((group, groupIdx) => (
              <div
                key={group.id}
                className={`transform space-y-4 transition-all duration-500 ${activeGroup === groupIdx ? "translate-x-0 opacity-100" : "hidden translate-x-4 opacity-0"}`}
              >
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {group.name}
                  </h3>
                </div>

                <div className="grid gap-3">
                  {group.addons.map((addon) => {
                    const isSelected = selectedAddons.some(
                      (a) => a.id === addon.id,
                    );
                    return (
                      <label
                        key={addon.id}
                        className={`relative flex cursor-pointer items-center rounded-xl border-2 p-4 transition-all duration-300 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50/50 shadow-md"
                            : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => handleAddonChange(addon, !isSelected)}
                      >
                        <div className="min-w-[1.5rem]">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                              isSelected
                                ? "scale-110 border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            <svg
                              className={`h-3 w-3 text-white transition-all duration-300 ${isSelected ? "scale-100" : "scale-0"}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </div>

                        <div className="ml-4 flex-grow">
                          <span className="font-medium text-gray-900">
                            {addon.name}
                          </span>
                        </div>

                        <div className="ml-4">
                          <span className="font-semibold text-blue-600">
                            +{addon.price} kr
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 bg-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="mr-2 text-sm text-gray-500">Total:</span>
              <span className="text-2xl font-bold text-gray-900">
                {totalPrice} kr
              </span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 text-gray-600 transition-colors hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToOrder}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-200/50 active:scale-95 active:transform"
              >
                Add to Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
