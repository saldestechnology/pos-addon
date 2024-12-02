"use client";
import { useState } from "react";
import { Product } from "@prisma/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProductModal from "@/components/ProductModal/ProductModal";
import { ProductWithAddons } from "@/components/types/product";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithAddons | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleClick = async (productId: string) => {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) return;
    const product: ProductWithAddons = await res.json();

    setSelectedProduct(product);
    setIsModalOpen(true);
    handleReset();
  };

  const handleReset = () => {
    setSearch("");
    setProducts([]);
  };

  return (
    <>
      <div className="col-span-9 row-span-1 flex justify-center border-b-2 border-slate-600">
        <input
          onChange={handleSearch}
          placeholder="Search"
          value={search}
          className="w-full px-4 text-2xl text-black outline-none"
        />
        <button onClick={handleReset} className="bg-blue-500 px-4 text-white">
          Reset
        </button>
      </div>
      {search && (
        <div className="animate-fade z-20 col-start-3 col-end-9 row-start-3 row-end-9 overflow-y-scroll bg-white p-2 shadow-xl">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center">
              <AiOutlineLoading3Quarters className="h-8 w-8 animate-spin text-gray-600" />
            </div>
          ) : products.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {products.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => handleClick(product.id)}
                    className="border-1 flex h-32 w-32 flex-col items-center justify-between rounded-md border-slate-500 bg-white p-2 text-black"
                  >
                    <div className="flex">{product.name}</div>
                    <div className="border-t-1 w-9/12 pt-1">
                      {product.basePrice} kr
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-gray-600">No results found</p>
            </div>
          )}
        </div>
      )}
      {isModalOpen && selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
