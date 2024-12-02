"use client";

import { useOrder } from "@/context/OrderContext";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ButtonProps {
  product: Product;
}

export default ({ product }: ButtonProps) => {
  const { addToOrder } = useOrder();
  const router = useRouter();

  const handleClick = () => {
    addToOrder(product);
  };

  return (
    <button
      onClick={handleClick}
      className="border-1 flex h-32 w-32 flex-col items-center justify-between rounded-md border-slate-500 bg-white p-2 text-black"
    >
      <div className="flex">{product.name}</div>
      <div className="border-t-1 w-9/12 pt-1">{product.basePrice} kr</div>
    </button>
  );
};
