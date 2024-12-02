"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  id: string;
  name: string;
}

const nameToIconMap: Record<string, string> = {
  "Hot Drinks": "☕️",
  "Cold Drinks": "🥤",
  "Pastries & Snacks": "🥐",
};

export default function CategoryListBtn({ id, name }: ButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/category/${id}`);
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="flex h-14 w-14 items-center justify-center rounded-md bg-slate-500 text-xl xl:h-24 xl:w-24 xl:text-base"
    >
      {nameToIconMap[name]}
    </button>
  );
}
