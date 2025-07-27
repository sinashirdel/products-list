import { createContext, useContext, useReducer } from "react";

const FilterContext = createContext();

const initialState = {
  search: "",
  priceRange: { min: "", max: "" },
  availability: "all", // 'all', 'inStock', 'outOfStock'
  selectedBrands: [], // Ensure this is always an array
  selectedCategories: [], // New: array of selected categories
  currentPage: 1,
  itemsPerPage: 12,
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case "SET_SEARCH":
      return { ...state, search: action.payload, currentPage: 1 };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload, currentPage: 1 };
    case "SET_AVAILABILITY":
      return { ...state, availability: action.payload, currentPage: 1 };
    case "SET_SELECTED_BRANDS":
      return { 
        ...state, 
        selectedBrands: Array.isArray(action.payload) ? action.payload : [], 
        currentPage: 1 
      };
    case "SET_SELECTED_CATEGORIES":
      return {
        ...state,
        selectedCategories: Array.isArray(action.payload) ? action.payload : [],
        currentPage: 1
      };
    case "SET_CURRENT_PAGE":
      return { ...state, currentPage: action.payload };
    case "RESET_FILTERS":
      return { ...initialState };
    default:
      return state;
  }
};

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const setSearch = (search) => {
    dispatch({ type: "SET_SEARCH", payload: search });
  };

  const setPriceRange = (priceRange) => {
    dispatch({ type: "SET_PRICE_RANGE", payload: priceRange });
  };

  const setAvailability = (availability) => {
    dispatch({ type: "SET_AVAILABILITY", payload: availability });
  };

  const setSelectedBrands = (brands) => {
    // Handle both function and direct value
    const brandsArray = typeof brands === 'function' 
      ? brands(state.selectedBrands) 
      : brands;
    
    const finalBrands = Array.isArray(brandsArray) ? brandsArray : [];
    dispatch({ type: "SET_SELECTED_BRANDS", payload: finalBrands });
  };

  const setSelectedCategories = (categories) => {
    // Handle both function and direct value
    const categoriesArray = typeof categories === 'function'
      ? categories(state.selectedCategories)
      : categories;
    const finalCategories = Array.isArray(categoriesArray) ? categoriesArray : [];
    dispatch({ type: "SET_SELECTED_CATEGORIES", payload: finalCategories });
  };

  const setCurrentPage = (page) => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: page });
  };

  const resetFilters = () => {
    dispatch({ type: "RESET_FILTERS" });
  };

  const value = {
    ...state,
    setSearch,
    setPriceRange,
    setAvailability,
    setSelectedBrands,
    setSelectedCategories, // New
    setCurrentPage,
    resetFilters,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
