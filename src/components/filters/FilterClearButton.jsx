import React from "react";

const FilterClearButton = React.memo(function FilterClearButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-sm text-gray-600 hover:text-gray-700 font-medium px-2 py-1 rounded-md hover:bg-gray-100 transition-colors cursor-pointer mb-6"
    >
      Clear All
    </button>
  );
});

export default FilterClearButton; 