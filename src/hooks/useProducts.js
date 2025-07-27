import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useFilter } from "../contexts/FilterContext";
import { useDebounce } from "./useDebounce";

const fetchProducts = async () => {
  const response = await fetch("https://dummyjson.com/products?limit=200");
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export const useProducts = () => {
  const {
    search,
    priceRange,
    availability,
    selectedBrands,
    selectedCategories, // New
    currentPage,
    itemsPerPage,
  } = useFilter();
  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const filteredProducts = React.useMemo(() => {
    if (!data?.products) return [];

    let filtered = data.products;

    // Search filter
    if (debouncedSearch && debouncedSearch.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          (product.title &&
            product.title
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase())) ||
          (product.description &&
            product.description
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase())) ||
          (product.brand &&
            product.brand.toLowerCase().includes(debouncedSearch.toLowerCase()))
      );
    }

    // Price range filter
    if (!(priceRange.min === "" && priceRange.max === "")) {
      filtered = filtered.filter(
        (product) =>
          product.price &&
          (priceRange.min === "" || product.price >= priceRange.min) &&
          (priceRange.max === "" || product.price <= priceRange.max)
      );
    }

    // Availability filter
    if (availability === "inStock") {
      filtered = filtered.filter(
        (product) => product.stock && product.stock > 0
      );
    } else if (availability === "outOfStock") {
      filtered = filtered.filter(
        (product) => !product.stock || product.stock === 0
      );
    }

    // Brand filter
    if (selectedBrands && selectedBrands.length > 0) {
      filtered = filtered.filter(
        (product) => product.brand && selectedBrands.includes(product.brand)
      );
    }

    // Category filter
    if (selectedCategories && selectedCategories.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.category && selectedCategories.includes(product.category)
      );
    }

    return filtered;
  }, [
    data?.products,
    debouncedSearch,
    priceRange,
    availability,
    selectedBrands,
    selectedCategories,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Get unique brands for filter options
  const brands = React.useMemo(() => {
    if (!data?.products) return [];
    return [
      ...new Set(data.products.map((product) => product.brand).filter(Boolean)),
    ].sort();
  }, [data?.products]);

  return {
    products: paginatedProducts,
    allProducts: filteredProducts,
    brands,
    isLoading,
    error,
    pagination: {
      currentPage,
      totalPages,
      totalItems: filteredProducts.length,
      itemsPerPage,
    },
  };
};
