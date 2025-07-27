import React from "react";

const options = [
  { value: "all", label: "All" },
  { value: "inStock", label: "In Stock" },
  { value: "outOfStock", label: "Out of Stock" },
];

const FilterAvailability = React.memo(function FilterAvailability({
  value,
  onChange,
}) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Availability
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="radio"
              name="availability"
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className="sr-only"
            />
            <div
              className={`px-3 py-1 rounded-full border-2 text-sm font-medium transition-colors
                ${
                  value === option.value
                    ? "bg-blue-600/20 text-blue-600 border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }
              `}
            >
              {option.label}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
});

export default FilterAvailability;
