import { FaShoppingBag } from "react-icons/fa";

export default function Header() {
  return (
    <div className="border-b border-gray-100 bg-gray-50/50 p-4">
      <div className="flex items-center gap-2">
        <FaShoppingBag className="h-5 w-5 text-gray-600" />
        <h2 className="font-semibold text-gray-900">Current Order</h2>
      </div>
    </div>
  );
}
