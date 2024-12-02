import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import Button from "./Button";
import { BiSearchAlt2 } from "react-icons/bi";
import SearchBar from "../SearchBar";

export default async function CategoryList() {
  const categories: Category[] = await prisma.category.findMany({});

  return (
    <div className="row-start-1 row-end-12 bg-slate-600">
      <ul className="flex h-full flex-col items-center">
        <li key={"search-bar"} className="my-2 first:mt-4">
          <SearchBar />
        </li>
        {categories.map(({ id, name }) => (
          <li key={id} className="my-2 first:mt-4">
            <Button id={id} name={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
