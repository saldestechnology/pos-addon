import FilterDropdown from "./FilterDropdown";
import SearchInput from "./SearchInput";

const SearchFilterBar = () => {
  const filters = [
    { id: "active", label: "Active Products" },
    { id: "outOfStock", label: "Out of Stock" },
    { id: "hasModifications", label: "Has Modifications" },
    { id: "hasAddons", label: "Has Addons" },
    { id: "recent", label: "Recently Added" },
  ];

  return (
    <div className="flex items-center gap-3">
      <SearchInput
        placeholder="Search products..."
        onSearch={(value) => console.log("Searching:", value)}
      />
      <FilterDropdown
        filters={filters}
        onFilterChange={(selectedFilters) =>
          console.log("Filters:", selectedFilters)
        }
      />
    </div>
  );
};

export default SearchFilterBar;
