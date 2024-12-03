import { Product } from "@prisma/client";
import { FaPlus } from "react-icons/fa";

interface SearchResultItemProps {
  product: Product;
  addOrder: (productId: string) => void;
}

export default function SearchResultItem({
  product,
  addOrder,
}: SearchResultItemProps) {
  return (
    <div
      key={product.id}
      className="group relative flex items-center gap-4 p-4 transition-all duration-200 hover:bg-gray-50"
    >
      {/* Border Highlight (moved behind content) */}
      <div className="absolute inset-0 rounded-lg border border-blue-500/0 transition-all duration-200 group-hover:border-blue-500/50" />

      {/* Product Info */}
      <div className="relative flex-1 space-y-1">
        <h3 className="font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>

      {/* Price & Action */}
      <div className="relative flex items-center gap-4">
        <span className="text-lg font-semibold text-gray-900">
          {product.basePrice} kr
        </span>
        <button
          onClick={() => addOrder(product.id)}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/50 active:scale-95"
        >
          <FaPlus size={16} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
}
