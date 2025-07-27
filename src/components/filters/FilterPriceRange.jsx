import React from "react";

const FilterPriceRange = React.memo(function FilterPriceRange({ min, max, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Price Range
      </label>
      <div className="space-y-3">
        <div className="flex flex-col gap-2">
          <input
            type="number"
            name="min"
            value={min}
            onChange={onChange}
            placeholder="Min"
            className="flex-1 px-3 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
          />
          <input
            type="number"
            name="max"
            value={max}
            onChange={onChange}
            placeholder="Max"
            className="flex-1 px-3 py-1 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
          />
        </div>
      </div>
    </div>
  );
});

export default FilterPriceRange; 