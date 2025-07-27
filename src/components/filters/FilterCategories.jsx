import React from "react";

const FilterCategories = React.memo(function FilterCategories({
  selectedCategories,
  onToggle,
}) {
  const CATEGORIES = [
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "home-decoration",
    "kitchen-accessories",
    "laptops",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "mobile-accessories",
    "motorcycle",
    "skin-care",
    "smartphones",
    "sports-accessories",
    "sunglasses",
    "tablets",
    "tops",
    "vehicle",
    "womens-bags",
    "womens-dresses",
    "womens-jewellery",
    "womens-shoes",
    "womens-watches",
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <div className="max-h-48 overflow-y-auto space-y-2">
        {CATEGORIES.map((category) => (
          <label
            key={category}
            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
          >
            <div className="relative">
              <input
                type="checkbox"
                checked={
                  Array.isArray(selectedCategories) &&
                  selectedCategories.includes(category)
                }
                onChange={() => onToggle(category)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all ${
                  Array.isArray(selectedCategories) &&
                  selectedCategories.includes(category)
                    ? "bg-blue-600 border-blue-600"
                    : "border-gray-300 bg-white"
                }`}
              >
                {Array.isArray(selectedCategories) &&
                  selectedCategories.includes(category) && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
              </div>
            </div>
            <span className="text-sm text-gray-700 select-none">
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
});

export default FilterCategories;
