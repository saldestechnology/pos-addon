"use client";

import SearchFilterBar from "@/components/admin/SearchFilterBar/SearchFilterBar";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddProductModal from "./Modals/AddProduct";

export default function Header() {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const onAddProduct = () => {
    setProductModalOpen(true);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <SearchFilterBar />
        <div className="flex gap-3">
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <FaPlus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>
      <AddProductModal show={productModalOpen} onClose={setProductModalOpen} />
    </>
  );
}
