"use client";
import { useState } from "react";
import ProductModal from "../ProductModal/ProductModal";
import { ProductWithAddons } from "../types/product";

interface ButtonProps {
  product: ProductWithAddons;
}

export default ({ product }: ButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    // addToOrder(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="flex h-32 w-32 flex-col items-center justify-between rounded-md border-1 border-slate-500 bg-white p-2 text-black"
      >
        <div className="flex">{product.name}</div>
        <div className="w-9/12 border-t-1 pt-1">{product.basePrice} kr</div>
      </button>
      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};
