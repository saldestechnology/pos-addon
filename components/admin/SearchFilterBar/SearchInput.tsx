"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

interface SearchInputProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchInput = ({
  placeholder = "Search...",
  onSearch,
}: SearchInputProps) => {
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="group relative">
      <div
        className={`relative flex items-center transition-all duration-300 ${
          isFocused
            ? "shadow-lg ring-2 ring-blue-500 ring-opacity-50"
            : "hover:shadow-md"
        }`}
      >
        <FaSearch
          className={`absolute left-3.5 h-4 w-4 transition-colors duration-300 ${
            isFocused ? "text-blue-500" : "text-gray-400"
          }`}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch?.(e.target.value);
          }}
          placeholder={placeholder}
          className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {value && (
          <button
            onClick={() => {
              setValue("");
              onSearch?.("");
            }}
            className="absolute right-3 rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
          >
            <IoMdClose className="h-3 w-3 text-gray-400" />
          </button>
        )}
      </div>
      <div className="absolute inset-0 -z-10 scale-[0.98] transform rounded-lg bg-gradient-to-b from-white to-gray-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
};

export default SearchInput;
