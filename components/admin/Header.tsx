"use client";

import { useRouter } from "next/navigation";
import { BiChevronLeft } from "react-icons/bi";
import { FiSettings } from "react-icons/fi";

export default function Header() {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/");
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-10 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex w-full">
        <button onClick={handleGoBack} className="rounded-sm bg-blue-600">
          <BiChevronLeft size={24} />
        </button>
        <h1 className="ml-4 text-xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="rounded-lg p-2 hover:bg-gray-100">
          <FiSettings className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
}
