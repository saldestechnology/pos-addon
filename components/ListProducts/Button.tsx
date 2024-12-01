"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  id: string;
  name: string;
  price: number;
}

export default ({ id, name, price }: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="border-1 flex h-32 w-32 flex-col items-center justify-between rounded-md border-slate-500 bg-white p-2 text-black"
    >
      <div className="flex">{name}</div>
      <div className="border-t-1 w-9/12 pt-1">{price}</div>
    </button>
  );
};
