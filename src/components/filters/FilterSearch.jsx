import React from "react";

const FilterSearch = React.memo(function FilterSearch({ value, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Search
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search products..."
        className="w-full px-3 py-1 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white"
      />
    </div>
  );
});

export default FilterSearch; 