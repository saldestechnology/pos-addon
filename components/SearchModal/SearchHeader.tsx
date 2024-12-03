import { FaSearch } from "react-icons/fa";

interface SearchHeaderProps {
  search: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function SearchHeader({
  search,
  handleSearch,
}: SearchHeaderProps) {
  return (
    <div className="border-b border-gray-100 bg-gray-50/50 p-4">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
          <FaSearch size={20} />
        </div>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-gray-900 transition-shadow duration-200 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
          placeholder="Search products..."
        />
      </div>
    </div>
  );
}
