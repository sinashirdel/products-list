import React from "react";

const FilterActiveSummary = React.memo(function FilterActiveSummary({ availability, selectedBrands }) {
  if ((Array.isArray(selectedBrands) && selectedBrands.length === 0) && availability === "all") return null;
  return (
    <div className="border-t pt-4">
      <h4 className="text-sm font-medium text-gray-700 mb-2">
        Active Filters:
      </h4>
      <div className="space-y-1">
        {availability !== "all" && (
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-1 mb-1">
            {availability === "inStock" ? "in Stock" : "out of Stock"}
          </span>
        )}
        {Array.isArray(selectedBrands) &&
          selectedBrands.map((brand) => (
            <span
              key={brand}
              className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-1 mb-1"
            >
              {brand}
            </span>
          ))}
      </div>
    </div>
  );
});

export default FilterActiveSummary; 