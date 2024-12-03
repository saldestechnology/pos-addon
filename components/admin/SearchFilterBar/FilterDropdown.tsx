"use client";

import { useState } from "react";
import { BiCheck, BiChevronDown } from "react-icons/bi";

interface FilterDropdownProps {
  filters: { id: string; label: string }[];
  onFilterChange?: (selectedFilters: string[]) => void;
}

const FilterDropdown = ({ filters, onFilterChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  const toggleFilter = (filterId: string) => {
    const newSelected = new Set(selectedFilters);
    if (newSelected.has(filterId)) {
      newSelected.delete(filterId);
    } else {
      newSelected.add(filterId);
    }
    setSelectedFilters(newSelected);
    onFilterChange?.(Array.from(newSelected) as string[]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-10 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 text-sm font-medium transition-all duration-200 ${
          isOpen
            ? "shadow-lg ring-2 ring-blue-500 ring-opacity-50"
            : "hover:shadow-md"
        }`}
      >
        <span className="text-gray-700">Filter</span>
        <BiChevronDown
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 transform" : ""
          }`}
        />
        {selectedFilters.size > 0 && (
          <span className="ml-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs font-medium text-white">
            {selectedFilters.size}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="animate-in fade-in slide-in-from-top-2 absolute z-20 mt-2 w-64 origin-top-right transform rounded-lg border border-gray-200 bg-white p-2 shadow-xl transition-all duration-200">
            <div className="divide-y divide-gray-100">
              {filters.map((filter) => (
                <div key={filter.id} className="py-2 first:pt-0 last:pb-0">
                  <button
                    onClick={() => toggleFilter(filter.id)}
                    className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm transition-colors duration-200 hover:bg-gray-50"
                  >
                    <span className="text-gray-700">{filter.label}</span>
                    {selectedFilters.has(filter.id) && (
                      <BiCheck className="h-4 w-4 text-blue-500" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FilterDropdown;
