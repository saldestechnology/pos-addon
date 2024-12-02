import { useOrder } from "@/context/OrderContext";
import { Addon, AddonGroup, Product } from "@prisma/client";
import { useState } from "react";
import Item from "./Item";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className="animate-fade-up rounded-md bg-white p-4 text-black"
      >
        <h2 className="text-xl font-bold">{product.name}</h2>
        <hr className="my-2" />
        <p className="mb-4 italic text-slate-500">{product.description}</p>
        <div className="flex flex-row gap-4">
          {product.addonGroups.map((group) => (
            <div key={group.id} className="border-r-1 border-gray-200 pr-4">
              <h3 className="mt-4 pl-2 text-lg font-semibold">{group.name}</h3>
              <hr className="my-2" />
              {group.addons.map((addon) => (
                <Item
                  key={addon.id}
                  addon={addon}
                  onChange={handleAddonChange}
                />
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
