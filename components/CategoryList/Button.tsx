"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  id: string;
  name: string;
}

export default ({ id, name }: ButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/category/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex h-16 w-16 items-center justify-center bg-slate-500 text-xs xl:h-32 xl:w-32 xl:text-base"
    >
      {name}
    </button>
  );
};
