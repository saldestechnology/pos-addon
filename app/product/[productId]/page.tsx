import ListProducts from "@/components/ListProducts/ListProducts";
import { prisma } from "@/lib/prisma";
import { Product } from "@prisma/client";

export default async function ProductById({
  params,
}: {
  params: { productId: string };
}) {
  const { productId } = await params;
  const product: Product | null = await prisma.product.findUnique({
    where: { id: productId },
  });
  return (
    <div className="col-start-2 col-end-10 row-start-2 row-end-12 bg-lime-600 p-4">
      {/** Product listing */}
      <h1>Welcome to {product?.name}</h1>
    </div>
  );
}
