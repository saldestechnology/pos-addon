interface FooterProps {
  total: number;
}

export default function Footer({ total }: FooterProps) {
  return (
    <div className="border-t border-gray-100 bg-white p-4 shadow-lg">
      <div className="space-y-4">
        <div className="flex justify-between border-b border-gray-100 pb-4">
          <div className="space-y-1">
            <p className="text-sm text-gray-500">Subtotal</p>
            <p className="text-sm text-gray-500">Tax (12%)</p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm text-gray-900">
              {Math.round(total * 0.8)} kr
            </p>
            <p className="text-sm text-gray-900">
              {Math.round(total * 0.12)} kr
            </p>
          </div>
        </div>

        {/* Total */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-lg font-semibold text-gray-900">
            {total} kr
          </span>
        </div>

        {/* Place Order Button */}
        <button className="w-full rounded-xl bg-blue-500 py-3 font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-200 hover:bg-blue-600 hover:shadow-blue-500/50 active:scale-[0.98]">
          Place Order
        </button>
      </div>
    </div>
  );
}
