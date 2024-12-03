"use client";

import { useRouter } from "next/navigation";

interface ButtonProps {
  category: { id: string; name: string };
  activeCategory: string;
  setActiveCategory: (id: string) => void;
}

const nameToIconMap: Record<string, string> = {
  "Hot Drinks": "☕️",
  "Cold Drinks": "🥤",
  "Pastries & Snacks": "🥐",
};

export default function CategoryItem({
  category,
  activeCategory,
  setActiveCategory,
}: ButtonProps) {
  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/category/${id}`);
    setActiveCategory(id);
  };

  return (
    <div key={category.id} className="group relative">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-700/0 to-slate-700/0 opacity-0 blur transition-all duration-500 group-hover:opacity-100" />
      {activeCategory === category.id && (
        <div className="animate-slide-in absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
      )}
      <button
        onClick={() => handleClick(category.id)}
        className={`relative flex h-14 w-14 items-center justify-center rounded-xl text-2xl transition-all duration-300 xl:h-24 xl:w-24 ${
          activeCategory === category.id
            ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20 shadow-lg shadow-blue-500/20"
            : "bg-white/5 hover:bg-white/10"
        } `}
      >
        <span
          className={`transform transition-all duration-300 ${activeCategory === category.id ? "scale-110" : "group-hover:scale-105"}`}
        >
          {nameToIconMap[category.name]}
        </span>
      </button>
    </div>
  );
}
