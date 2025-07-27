import { Star } from "lucide-react";
import React from "react";
import { getSafeProduct } from "./productUtils";

const ProductCard = React.memo(({ product, onShowDetails }) => {
  const safeProduct = getSafeProduct(product);
  const {
    id,
    title,
    price,
    stock,
    brand,
    thumbnail,
    discountPercentage,
    rating,
  } = safeProduct;

  const isInStock = stock > 0;
  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : price;

  return (
    <div className="bg-white p-3 rounded-3xl border-[1px] border-gray-300 transition-shadow duration-300 overflow-hidden">
      <div className="relative bg-gray-100 rounded-2xl mb-3">
        <img
          src={thumbnail}
          alt={title}
          className={`w-full h-48 object-cover ${!isInStock && "grayscale"}`}
          loading="lazy"
        />
        {discountPercentage ? (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {Math.round(discountPercentage)}%
          </div>
        ) : null}
        {!isInStock && (
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="mb-2 flex items-center justify-between w-full">
        <span className="text-xs font-light bg-blue-600/10 text-blue-600 py-0.5 px-2 rounded-full">
          {brand}
        </span>
        {/* Rating Display */}
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" />
          <span className="text-sm text-gray-600 font-medium">{rating}</span>
        </div>
      </div>

      <h3 className="text-base font-medium text-gray-700 mb-2 line-clamp-1">
        {title}
      </h3>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {discountPercentage ? (
            <>
              <span className="text-lg font-bold text-gray-800">
                ${discountedPrice.toFixed(2)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-gray-800">
              ${price.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => onShowDetails(product)}
        className="w-full text-sm cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-xl transition-colors duration-200"
      >
        More Details
      </button>
    </div>
  );
});

export default ProductCard;
