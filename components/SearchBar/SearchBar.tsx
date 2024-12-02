"use client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const handleClick = (id: string) => {
    setSearch("");
    router.push(`/product/${id}`);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    if (e.target.value.length < 3) {
      return;
    }

    const res = await fetch(`/api/search/${e.target.value}`);
    if (!res.ok) {
      return;
    }
    const products: Product[] = await res.json();
    setProducts(products);
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
        <div className="animate-fade z-20 col-start-3 col-end-9 row-start-3 row-end-9 overflow-y-scroll bg-white shadow-xl">
          {products.length ? (
            <ul className="flex flex-wrap gap-2">
              {products.map(({ id, name }) => (
                <li key={id}>
                  <button
                    onClick={() => handleClick(id)}
                    className="flex h-20 w-20 items-center justify-center bg-blue-500 p-16 text-white"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
            </div>
          )}
        </div>
      )}
    </>
  );
}
