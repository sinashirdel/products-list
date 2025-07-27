import React, { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
// import ProductModal from "./ProductModal";
import FilterSidebar from "./filters/FilterSidebar";
import Pagination from "./Pagination";
import Loading from "./Loading";
import Error from "./Error";
import { useFilter } from "../contexts/FilterContext";

const ProductModal = lazy(() => import("./ProductModal"));

const ProductList = () => {
  const { products, brands, isLoading, error, pagination } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { search, priceRange, availability, selectedBrands, selectedCategories } = useFilter();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [search, priceRange, availability, selectedBrands , selectedCategories]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const handleShowDetails = useCallback((product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) {
    return <Loading message="Loading products..." />;
  }

  if (error) {
    return <Error message="Error loading products" onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Product List
          </h1>
          <p className="text-gray-600">
            {pagination.totalItems} products found
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <FilterSidebar brands={brands} />
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">Please adjust your filters</p>
              </div>
            ) : (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onShowDetails={handleShowDetails}
                    />
                  ))}
                </div>

                {/* Pagination */}
                <Pagination
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <Suspense fallback={<Loading message="Loading product details..." />}>
        <ProductModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Suspense>
    </div>
  );
};

export default ProductList;
