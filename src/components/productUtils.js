// Utility function to safely extract product fields with defaults
export function getSafeProduct(product = {}) {
  return {
    id: product.id ?? '',
    title: product.title || 'Untitled Product',
    description: product.description || 'No description available',
    price: product.price || 0,
    stock: product.stock || 0,
    brand: product.brand || 'Unknown Brand',
    category: product.category || 'Uncategorized',
    rating: product.rating || 0,
    discountPercentage: product.discountPercentage || 0,
    images: Array.isArray(product.images) ? product.images : [],
    thumbnail: product.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image',
    specifications: product.specifications || {},
  };
} 