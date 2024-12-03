import { FaTrash } from "react-icons/fa";

interface PriceProps {
  price: number;
  quantity: number;
  onRemove: () => void;
}

export default function Price({ price, quantity, onRemove }: PriceProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-gray-900">{price * quantity} kr</span>
      <button
        onClick={onRemove}
        className="hidden text-gray-400 transition-colors hover:text-red-500 group-hover:block"
      >
        <FaTrash className="h-4 w-4" />
      </button>
    </div>
  );
}
