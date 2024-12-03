import CategoryList from "@/components/CategoryList/CategoryList";
import OrderList from "@/components/OrderList";
import ProductsList from "@/components/ProductsList/ProductsList";
import { ProductWithAddons } from "@/components/types/product";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";

type Params = Promise<{ categoryId: string }>;

export default async function CategoryById({ params }: { params: Params }) {
  const { categoryId } = await params;

  const category: Category | null = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  const categories: Category[] = await prisma.category.findMany({});

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
    <div className="grid-cols-24 grid-rows-24 grid h-screen w-screen">
      <CategoryList categories={categories} />
      <div className="col-end-18 row-end-25 col-start-4 row-start-1 overflow-hidden bg-gray-50">
        <div className="relative flex h-[57px] items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
          <div className="flex items-baseline gap-3">
            <h1 className="text-xl font-semibold text-gray-900">
              {category?.name}
            </h1>
            <span className="text-sm text-gray-500">
              {products.length} items available
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>

        <div className="p-6">
          <ProductsList products={products} />
        </div>
      </div>
      <OrderList />
    </div>
  );
}
