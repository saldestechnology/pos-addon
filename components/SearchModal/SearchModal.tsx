"use client";

import { Product } from "@prisma/client";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      {/* close x corner */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black"
      >
        <IoMdClose />
      </button>
      <div
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        className="h-8/12 animate-fade-up w-8/12 rounded-md bg-white text-black"
      >
        <div className="border-slate border-b-1 p-4">
          <input
            onChange={handleSearch}
            value={search}
            className="rounded-md-400 h-12 w-full px-4 outline-none"
            type="text"
            placeholder="Search..."
          />
        </div>
        {isLoading && (
          <div className="px-4">
            <div className="animate-pulse">
              <div className="mb-2 h-4 w-3/4 rounded-lg bg-gray-200"></div>
              <div className="mb-2 h-3 w-full rounded-lg bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded-lg bg-gray-200"></div>
            </div>
          </div>
        )}
        {!isLoading && products.length > 0 && (
          <div className="w-full p-4">
            <ul>
              {products.map((product) => (
                <li
                  key={product.id}
                  className="flex justify-between border-b-1 p-4"
                >
                  <div className="items-center§ flex">{product.name}</div>
                  <div className="items-center§ flex">
                    {product.description}
                  </div>
                  <div className="items-center§ flex">
                    {product.basePrice} kr
                  </div>
                  <div>
                    <button
                      className="rounded-md bg-blue-500 px-4 py-2 text-white"
                      onClick={() => addOrder(product.id)}
                    >
                      Add to order
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
