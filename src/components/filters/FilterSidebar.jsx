import React from "react";
import { useFilter } from "../../contexts/FilterContext";
import FilterSearch from "./FilterSearch";
import FilterPriceRange from "./FilterPriceRange";
import FilterAvailability from "./FilterAvailability";
import FilterBrands from "./FilterBrands";
import FilterActiveSummary from "./FilterActiveSummary";
import FilterClearButton from "./FilterClearButton";
import FilterCategories from "./FilterCategories";

const FilterSidebar = ({ brands }) => {
  const {
    search,
    priceRange,
    availability,
    selectedBrands,
    selectedCategories,
    setSearch,
    setPriceRange,
    setAvailability,
    setSelectedBrands,
    setSelectedCategories,
    resetFilters,
  } = useFilter();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    const newRange = {
      ...priceRange,
      [name]: value === "" ? "" : parseInt(value),
    };
    if (newRange.min === "" && newRange.max === "") {
      setPriceRange({ min: "", max: "" });
    } else {
      setPriceRange(newRange);
    }
  };

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) => {
      const currentBrands = Array.isArray(prev) ? prev : [];
      return currentBrands.includes(brand)
        ? currentBrands.filter((b) => b !== brand)
        : [...currentBrands, brand];
    });
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories((prev) => {
      const currentCategories = Array.isArray(prev) ? prev : [];
      return currentCategories.includes(category)
        ? currentCategories.filter((c) => c !== category)
        : [...currentCategories, category];
    });
  };

  return (
    <div className="bg-white rounded-3xl border-[1px] border-gray-300 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
        <FilterClearButton onClick={resetFilters} />
      </div>
      <FilterSearch value={search} onChange={handleSearchChange} />
      <FilterPriceRange
        min={priceRange.min}
        max={priceRange.max}
        onChange={handlePriceRangeChange}
      />
      <FilterAvailability
        value={availability}
        onChange={(e) => setAvailability(e.target.value)}
      />
      <FilterBrands
        brands={brands}
        selectedBrands={selectedBrands}
        onToggle={handleBrandToggle}
      />
      <hr className="my-4 w-full border-gray-200" />
      <FilterCategories
        selectedCategories={selectedCategories}
        onToggle={handleCategoryToggle}
      />
      <FilterActiveSummary
        availability={availability}
        selectedBrands={selectedBrands}
      />
    </div>
  );
};

export default FilterSidebar;
