import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BiEdit, BiTrash } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SearchFilterBar from "../SearchFilterBar/SearchFilterBar";

interface ProductsViewProps {
  onAddProduct: () => void;
  onAddModification: () => void;
  onAddAddon: () => void;
}

const ProductsView = ({
  onAddProduct,
  onAddModification,
  onAddAddon,
}: ProductsViewProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <SearchFilterBar />
        <div className="flex gap-3">
          <button
            onClick={onAddProduct}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <FaPlus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="modifications">Modifications</TabsTrigger>
          <TabsTrigger value="addons">Addons</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Products List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-gray-200">
                {/* Product items would go here */}
                <div className="flex items-center justify-between py-4">
                  <div>
                    <h3 className="font-medium text-gray-900">Soda</h3>
                    <p className="text-sm text-gray-500">Base Price: $75</p>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
            <CardContent>{/* Modifications list would go here */}</CardContent>
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
  );
};

export default ProductsView;
