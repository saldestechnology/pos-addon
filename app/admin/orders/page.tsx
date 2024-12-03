import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BiChevronDown, BiFilter } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

function OrderPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                className="w-64 rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50">
              <BiFilter className="h-4 w-4" />
              Filter Orders
              <BiChevronDown className="h-4 w-4" />
            </button>
          </div>

          <div className="divide-y divide-gray-200">
            {/* Order items would go here */}
            <div className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">Order #12345</h3>
                  <p className="text-sm text-gray-500">Dec 3, 2024 - 14:30</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$125.00</p>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderPage;
