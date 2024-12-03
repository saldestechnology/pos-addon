"use client";
import { useState } from "react";
import ProductModal from "../ProductModal/ProductModal";
import { ProductWithAddons } from "../types/product";

interface ButtonProps {
  product: ProductWithAddons;
}

export default function ProductListButton({ product }: ButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="shadow-premium group relative flex h-32 w-32 flex-col items-center justify-between overflow-hidden rounded-xl bg-white p-4 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div
          className={`absolute inset-0 bg-blue-500/5 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
        />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="relative flex h-full w-full flex-col items-center justify-between">
          <div className="w-full text-center">
            <span className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
              {product.name}
            </span>
          </div>
          <div className="flex w-full items-center justify-center border-t border-gray-100 pt-2">
            <span className="font-semibold text-blue-600">
              {product.basePrice} kr
            </span>
          </div>
        </div>
        <div className="absolute inset-0 rounded-xl border border-blue-500/0 transition-all duration-300 group-hover:border-blue-500/50" />
        <div className="absolute -right-4 -top-4 h-8 w-8 rotate-45 transform bg-blue-500/0 transition-all duration-300 group-hover:bg-blue-500/10" />
      </button>

      {isModalOpen && (
        <ProductModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
