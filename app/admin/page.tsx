"use client";

import React, { useState } from "react";
import { BiPackage } from "react-icons/bi";
import { FaShoppingBag } from "react-icons/fa";
import ProductsView from "@/components/admin/products/ProductView";
import OrdersView from "@/components/admin/orders/OrderView";

function AdminPage() {
  const [activeView, setActiveView] = useState("products");
  const [, setShowProductModal] = useState(false);
  const [, setShowModificationModal] = useState(false);
  const [, setShowAddonModal] = useState(false);

  return (
    <div className="flex pt-14">
      {/* Sidebar */}
      <aside className="fixed bottom-0 left-0 top-14 w-64 border-r border-gray-200 bg-white p-4">
        <nav className="space-y-2">
          <button
            onClick={() => setActiveView("products")}
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
            onClick={() => setActiveView("orders")}
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

      {/* Main Content Area */}
      <main className="ml-64 flex-1 p-6">
        {activeView === "products" ? (
          <ProductsView
            onAddProduct={() => setShowProductModal(true)}
            onAddModification={() => setShowModificationModal(true)}
            onAddAddon={() => setShowAddonModal(true)}
          />
        ) : (
          <OrdersView />
        )}
      </main>
    </div>
  );
}

export default AdminPage;
