"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  id: string;
  name: string;
}

export default ({ id, name }: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      className="flex h-32 w-32 items-center justify-center bg-white p-16 text-black"
    >
      {name}
    </button>
  );
};
