import ProductsList from "@/components/ProductsList/ProductsList";
import { ProductWithAddons } from "@/components/types/product";
import { prisma } from "@/lib/prisma";

export default async function CategoryById({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = await params;

  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  const products: ProductWithAddons[] = await prisma.product.findMany({
    where: { categoryId: categoryId },
    include: {
      modifications: {
        include: {
          options: true,
        },
      },
      addonGroups: {
        include: {
          addons: true,
        },
      },
    },
  });

  return (
    <div className="col-start-2 col-end-10 row-start-1 row-end-12 bg-white px-4 pt-4">
      <h1 className="mb-2 text-4xl font-bold text-black">{category?.name}</h1>
      <hr />
      <ProductsList products={products} />
    </div>
  );
}
