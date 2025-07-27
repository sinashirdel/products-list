import React, { useState, useEffect } from "react";
import { X, Percent, Star } from "lucide-react";
import ReactDOM from "react-dom";
import { getSafeProduct } from "./productUtils";

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  const safeProduct = getSafeProduct(product);
  const {
    title,
    description,
    price,
    stock,
    brand,
    category,
    rating,
    discountPercentage,
    images,
    thumbnail,
    specifications,
  } = safeProduct;

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(
    images?.[0] ||
      thumbnail ||
      "https://via.placeholder.com/400x400?text=No+Image"
  );

  // Reset selected image when product or isOpen changes
  useEffect(() => {
    setSelectedImage(
      images?.[0] ||
        thumbnail ||
        "https://via.placeholder.com/400x400?text=No+Image"
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, isOpen]);

  const isInStock = stock > 0;
  const discountedPrice = discountPercentage
    ? price - (price * discountPercentage) / 100
    : price;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-xs flex items-center justify-center z-50 sm:p-4"
      onClick={handleBackdropClick}
    >
      <div className="sm:p-2 bg-white rounded-xl">
        <div className="bg-white max-w-4xl max-sm:w-screen p-4 w-full max-h-[90vh] max-sm:max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 bg-gray-100 size-10 flex items-center justify-center rounded-full hover:text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={selectedImage}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </div>
              {images && images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((image, index) => (
                    <div
                      key={index}
                      className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                        selectedImage === image
                          ? "border-blue-500"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(image)}
                    >
                      <img
                        src={image}
                        alt={`${title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600 font-medium">
                  Brand:
                </span>
                <span className="ml-2 text-gray-800 font-semibold">
                  {brand}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600 font-medium">
                  Category:
                </span>
                <span className="ml-2 text-gray-800 font-semibold">
                  {category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 font-medium">
                  Rating:
                </span>
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 text-gray-800 font-semibold">
                    {rating}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-600 font-medium">
                  Availability:
                </span>
                <span
                  className={`ml-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    isInStock
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}
                >
                  {isInStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>

              <div>
                <span className="text-sm text-gray-600 font-medium">
                  Stock:
                </span>
                <span className="ml-2 text-gray-800 font-semibold">
                  {stock} items
                </span>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center gap-3">
                  {discountPercentage ? (
                    <>
                      <span className="text-3xl font-bold text-green-600">
                        ${discountedPrice.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        ${price.toFixed(2)}
                      </span>
                      <div className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
                        <Percent size={14} />
                        <span>{Math.round(discountPercentage)}%</span>
                      </div>
                    </>
                  ) : (
                    <span className="text-3xl font-bold text-gray-800">
                      ${price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description:
                </h3>
                <p className="text-gray-600 leading-relaxed">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;
