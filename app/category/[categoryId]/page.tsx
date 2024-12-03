import ProductsList from "@/components/ProductsList/ProductsList";
import { ProductWithAddons } from "@/components/types/product";
import { prisma } from "@/lib/prisma";

type Params = Promise<{ categoryId: string }>;

export default async function CategoryById({ params }: { params: Params }) {
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
    <div className="col-end-20 row-end-25 col-start-4 row-start-1 bg-white px-4 pt-4">
      <h1 className="mb-2 text-4xl font-bold text-black">{category?.name}</h1>
      <hr />
      <ProductsList products={products} />
    </div>
  );
}
