"use client";

import { Product } from "@prisma/client";
import { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import SearchResultItem from "./SearchResultItem";
import SearchHeader from "./SearchHeader";
import CloseButton from "./CloseButton";

interface SearchModalProps {
  addOrder: (productId: string) => void;
  onClose: () => void;
}

export default function SearchModal({ addOrder, onClose }: SearchModalProps) {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.length < 3) return;

    setIsLoading(true);

    const res = await fetch(`/api/search/${e.target.value}`);
    if (!res.ok) return;
    const products: Product[] = await res.json();

    setProducts(products);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 animate-fade bg-black/30 backdrop-blur-md" />
      <div className="animate-slide-up-fade relative w-full max-w-3xl">
        <CloseButton onClick={onClose} />
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          <SearchHeader search={search} handleSearch={handleSearch} />
          <div className="max-h-[60vh] overflow-y-auto p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <FaSpinner className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : products.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {products.map((product) => (
                  <SearchResultItem
                    key={product.id}
                    product={product}
                    addOrder={addOrder}
                  />
                ))}
              </div>
            ) : search.length >= 3 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="rounded-full bg-gray-100/80 p-4">
                  <FaSearch className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="mt-4 font-medium text-gray-900">
                  No results found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search terms
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
