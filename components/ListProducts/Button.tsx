"use client";

import { useOrder } from "@/context/OrderContext";
import { Addon, AddonGroup, Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProductModal from "./ProductModal";
import { ProductWithAddons } from "./types/product";

interface ButtonProps {
  product: ProductWithAddons;
}

export default ({ product }: ButtonProps) => {
  const { addToOrder } = useOrder();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(product);
  const handleClick = () => {
    // addToOrder(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="border-1 flex h-32 w-32 flex-col items-center justify-between rounded-md border-slate-500 bg-white p-2 text-black"
      >
        <div className="flex">{product.name}</div>
        <div className="border-t-1 w-9/12 pt-1">{product.basePrice} kr</div>
      </button>
      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
