import { useOrder } from "@/context/OrderContext";
import { Addon, AddonGroup, Product } from "@prisma/client";
import { useState } from "react";

interface ProductModalProps {
  product: Product & {
    addonGroups: (AddonGroup & {
      addons: Addon[];
    })[];
  };
  onClose: () => void;
}

export default function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToOrder } = useOrder();
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  const handleAddonChange = (addon: Addon, isSelected: boolean) => {
    setSelectedAddons((prev) =>
      isSelected ? [...prev, addon] : prev.filter((a) => a.id !== addon.id),
    );
  };

  const handleAddToOrder = () => {
    addToOrder(product, selectedAddons);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-md bg-white p-4 text-black">
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p>{product.description}</p>
        <div>
          {product.addonGroups.map((group) => (
            <div key={group.id}>
              <h3 className="font-semibold">{group.name}</h3>
              {group.addons.map((addon) => (
                <label key={addon.id} className="flex items-center">
                  <input
                    type="checkbox"
                    onChange={(e) => handleAddonChange(addon, e.target.checked)}
                  />
                  <span className="ml-2">
                    {addon.name} (+{addon.price} kr)
                  </span>
                </label>
              ))}
            </div>
          ))}
        </div>
        <button
          onClick={handleAddToOrder}
          className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Add to Order
        </button>
        <button
          onClick={onClose}
          className="ml-2 mt-4 rounded-md bg-gray-500 px-4 py-2 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
