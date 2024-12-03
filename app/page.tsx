import CategoryList from "@/components/CategoryList/CategoryList";
import OrderList from "@/components/OrderList";
import { OrderProvider } from "@/context/OrderContext";
import { prisma } from "@/lib/prisma";
import { Category } from "@prisma/client";
import { BsLightning } from "react-icons/bs";
import { FaCoffee, FaPlus, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { GiSparkles } from "react-icons/gi";

export default async function Home() {
  const categories: Category[] = await prisma.category.findMany({});
  return (
    <OrderProvider>
      <div className="grid-cols-24 grid-rows-24 grid h-screen w-screen">
        <CategoryList categories={categories} />
        <div className="col-end-18 row-end-25 col-start-4 row-start-1 overflow-auto bg-gray-50">
          {/* Hero Section */}
          <div className="relative border-b border-gray-200 bg-white px-8 py-12 shadow-sm">
            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
                <GiSparkles className="mr-1 h-4 w-4" />
                Welcome to the Future of POS
              </div>
              <h1 className="mt-4 text-4xl font-bold text-gray-900">
                Modern Point of Sale System
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                A sleek, intuitive, and powerful POS system designed for modern
                cafes and restaurants. Experience seamless ordering, quick
                customization, and efficient management.
              </p>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          </div>

          {/* Features Grid */}
          <div className="p-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Quick Search */}
              <div className="shadow-card hover:shadow-premium rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300">
                <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                  <FaSearch className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Quick Search
                </h3>
                <p className="mt-2 text-gray-600">
                  Instantly find any product with our responsive search system.
                  Real-time results as you type.
                </p>
              </div>

              {/* Smart Categories */}
              <div className="shadow-card hover:shadow-premium rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300">
                <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                  <FaCoffee className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Smart Categories
                </h3>
                <p className="mt-2 text-gray-600">
                  Organized product categories with modern, intuitive
                  navigation. Quick access to all your items.
                </p>
              </div>

              {/* Customizable Add-ons */}
              <div className="shadow-card hover:shadow-premium rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300">
                <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                  <FaPlus className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Customizable Add-ons
                </h3>
                <p className="mt-2 text-gray-600">
                  Flexible addon system for product customization. Easy
                  selection with modern UI controls.
                </p>
              </div>

              {/* Real-time Order Management */}
              <div className="shadow-card hover:shadow-premium rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300">
                <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                  <FaShoppingCart className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Management
                </h3>
                <p className="mt-2 text-gray-600">
                  Efficient order handling with real-time updates. Easy quantity
                  adjustments and modifications.
                </p>
              </div>

              {/* Fast Performance */}
              <div className="shadow-card hover:shadow-premium rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300">
                <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                  <BsLightning className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Lightning Fast
                </h3>
                <p className="mt-2 text-gray-600">
                  Optimized for speed with instant responses. Smooth animations
                  without compromising performance.
                </p>
              </div>

              {/* Quick Setup */}
              <div className="shadow-card hover:shadow-premium rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300">
                <div className="mb-4 inline-flex rounded-lg bg-blue-50 p-3 text-blue-600">
                  <FiSettings className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Easy Setup
                </h3>
                <p className="mt-2 text-gray-600">
                  Simple configuration and customization. Get started quickly
                  with intuitive controls.
                </p>
              </div>
            </div>

            {/* Design Philosophy Section */}
            <div className="shadow-card mt-12 rounded-xl border border-gray-200 bg-white p-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Design Philosophy
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Modern Aesthetics
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Clean, contemporary design with attention to detail. Subtle
                    animations and transitions enhance the user experience.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">User-Centric</h3>
                  <p className="mt-2 text-gray-600">
                    Intuitive interface designed for speed and efficiency. Every
                    interaction is thoughtfully crafted.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Responsive</h3>
                  <p className="mt-2 text-gray-600">
                    Adapts seamlessly to different screen sizes. Consistent
                    experience across all devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <OrderList />
      </div>
    </OrderProvider>
  );
}
