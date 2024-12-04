"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaPlus } from "react-icons/fa";
import ProductTab from "@/components/admin/products/tabs/ProductTab";
import Header from "@/components/admin/Header";

const queryClient = new QueryClient();

function ProductsPage() {
  const onAddModification = () => {
    console.log("Add Modification");
  };

  const onAddAddon = () => {
    console.log("Add Addon");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className="space-y-6">
        <Header />
        <Tabs defaultValue="products">
          <TabsList>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="modifications">Modifications</TabsTrigger>
            <TabsTrigger value="addons">Addons</TabsTrigger>
          </TabsList>
          <ProductTab />
          <TabsContent value="modifications" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Modifications</CardTitle>
                <button
                  onClick={onAddModification}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  <FaPlus className="h-4 w-4" />
                  Add Modification
                </button>
              </CardHeader>
              <CardContent>
                {/* Modifications list would go here */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addons" className="mt-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Addons</CardTitle>
                <button
                  onClick={onAddAddon}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                >
                  <FaPlus className="h-4 w-4" />
                  Add Addon
                </button>
              </CardHeader>
              <CardContent>{/* Addons list would go here */}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </QueryClientProvider>
  );
}

export default ProductsPage;
