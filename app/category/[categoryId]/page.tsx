import ListProducts from "@/components/ListProducts/ListProducts";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export default async function CategoryById({
  params,
}: {
  params: { categoryId: string };
}) {
  const { categoryId } = await params;
  const products: Product[] = await prisma.product.findMany({
    where: { categoryId: categoryId },
  });
  return (
    <div className="col-start-2 col-end-10 row-start-2 row-end-12 bg-white px-4">
      <ListProducts products={products} />
    </div>
  );
}
