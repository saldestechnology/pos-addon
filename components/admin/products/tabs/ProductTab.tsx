import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@prisma/client";
import { TabsContent } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { BiEdit, BiTrash } from "react-icons/bi";

type ProductData = {
  data: Product[];
};

export default function ProductTab() {
  const {
    data: product,
    isLoading,
    error,
  } = useQuery<ProductData, Error>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
  });

  return (
    <TabsContent value="products" className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Products List</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
            </div>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-center">
              <p className="text-sm text-red-600">
                Error loading products: {error.message}
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 text-sm font-medium text-red-600 hover:text-red-500"
              >
                Try again
              </button>
            </div>
          )}

          {product && (
            <div className="divide-y divide-gray-200">
              {product.data.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between py-4"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Base Price: {product.basePrice} kr
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg p-2 text-gray-600 hover:bg-gray-100">
                      <BiEdit className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-red-600 hover:bg-red-50">
                      <BiTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
}
