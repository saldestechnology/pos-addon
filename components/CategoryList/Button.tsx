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
      className="flex h-16 w-16 items-center justify-center bg-slate-500 text-xl xl:h-32 xl:w-32 xl:text-base"
    >
      {nameToIconMap[name]}
    </button>
  );
}
