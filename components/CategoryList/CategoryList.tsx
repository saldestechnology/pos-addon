"use client";

import { Category } from "@prisma/client";
import SearchBar from "../SearchBar";
import { useState } from "react";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  categories: Category[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  const [activeCategory, setActiveCategory] = useState<string>("");

  return (
    <div className="row-end-25 col-start-1 col-end-4 row-start-1 bg-gradient-to-b from-slate-800 to-slate-900 pt-4">
      <div className="flex h-full flex-col items-center space-y-4">
        <div className="group relative w-14 xl:w-24">
          <div className="absolute inset-0 rounded-xl bg-white/5 transition-all duration-300 group-hover:bg-white/10" />
          <div className="relative flex h-14 w-full items-center justify-center rounded-xl text-slate-300 transition-all duration-300 hover:text-white xl:h-24">
            <SearchBar />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-3">
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              category={category}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
