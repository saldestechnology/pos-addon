import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import Button from "./Button";

export default async function CategoryList() {
  const categories: Category[] = await prisma.category.findMany({});

  return (
    <div className="row-start-2 row-end-12 bg-slate-600">
      <ul className="flex h-full flex-col items-center">
        {categories.map(({ id, name }) => (
          <li key={id} className="my-2 first:mt-4">
            <Button id={id} name={name} />
          </li>
        ))}
      </ul>
    </div>
  );
}
