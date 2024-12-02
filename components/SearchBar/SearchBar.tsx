"use client";
import { useState } from "react";
import { Product } from "@prisma/client";
import ProductModal from "@/components/ProductModal/ProductModal";
import { ProductWithAddons } from "@/components/types/product";
import SearchModal from "../SearchModal";

export default function SearchBar() {
  const [, setSearch] = useState("");
  const [, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithAddons | null>(null);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleOpenSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen);
  };

  const addOrder = async (productId: string) => {
    console.log("Adding order for product", productId);
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) return;
    const product: ProductWithAddons = await res.json();

    setSelectedProduct(product);
    setIsProductModalOpen(true);
    handleReset();
  };

  const handleReset = () => {
    setSearch("");
    setProducts([]);
    setIsSearchModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleOpenSearchModal}
        type="button"
        className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-500 text-xl xl:h-24 xl:w-24 xl:text-base"
      >
        🔍
      </button>
      {isSearchModalOpen && (
        <SearchModal
          addOrder={addOrder}
          onClose={() => setIsSearchModalOpen(false)}
        />
      )}
      {isProductModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsProductModalOpen(false)}
        />
      )}
    </>
  );
}
