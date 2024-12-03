"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BiPackage } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();
  const [activeView, setActiveView] = useState("products");

  const handleActiveView = (view: string) => {
    setActiveView(view);
    router.push(`/admin/${view}`);
  };

  return (
    <aside className="fixed bottom-0 left-0 top-14 w-64 border-r border-gray-200 bg-white p-4">
      <nav className="space-y-2">
        <button
          onClick={() => handleActiveView("products")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 ${
            activeView === "products"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <BiPackage className="h-5 w-5" />
          Products
        </button>
        <button
          onClick={() => handleActiveView("orders")}
          className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 ${
            activeView === "orders"
              ? "bg-blue-50 text-blue-600"
              : "text-gray-600 hover:bg-gray-50"
          }`}
        >
          <FaShoppingBag className="h-5 w-5" />
          Orders
        </button>
      </nav>
    </aside>
  );
}
