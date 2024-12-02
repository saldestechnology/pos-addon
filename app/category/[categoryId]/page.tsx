import ListProducts from "@/components/ListProducts/ListProducts";
import { ProductWithAddons } from "@/components/types/product";
import { prisma } from "@/lib/prisma";

export default async function CategoryById({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = await params;
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
    <div className="col-start-2 col-end-10 row-start-2 row-end-12 bg-white px-4">
      <ListProducts products={products} />
    </div>
  );
}
