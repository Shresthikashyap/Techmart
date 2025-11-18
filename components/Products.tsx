'use client';

import Image from "next/image";
import type { CartItem, ComparisonItem, WishlistItem, Product } from "@/types/types";
import AddToCart from "./AddToCart";
import AddToCompare from "./AddToCompare";
import slugify from "slugify";
import { useRouter, usePathname } from "next/navigation";
import AddToWishlist from "./AddToWishlist";
import { Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";

// Union type for all possible product types
type ProductUnion = Product | CartItem | ComparisonItem | WishlistItem;

interface ProductsProps {
  products: ProductUnion[];
  limit?: number;
  showRemoveButton?: boolean;
}

export default function Products({ products, limit, showRemoveButton }: ProductsProps) {
  const displayedProducts = limit ? products.slice(0, limit) : products;
  const router = useRouter();
  const pathname = usePathname();
  const { removeFromWishlist } = useWishlistStore();

  // Auto-detect if we're on wishlist page
  const isWishlistPage = pathname === '/wishlist' || showRemoveButton;

  // Helper function to extract product data from any item type
  const getProductData = (item: ProductUnion) => {
    // Check if it's a direct Product
    if ('name' in item && 'price' in item && 'image' in item) {
      return {
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image
      };
    }
    
    // Check if it's a CartItem, ComparisonItem, or WishlistItem with nested product
    if ('product' in item && item.product) {
      return {
        productId: item.product.productId,
        name: item.product.name,
        price: item.product.price,
        image: item.product.image
      };
    }

    // Fallback - shouldn't happen with proper types
    return {
      productId: 0,
      name: 'Unknown Product',
      price: 0,
      image: '/placeholder-image.jpg'
    };
  };

  const onRemove = (itemId: number | undefined) => {
    if (itemId) {
      removeFromWishlist(itemId);
    }
  };

  console.log("Items:", products);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {displayedProducts.length > 0 && (
        displayedProducts.map((item) => {
          const productData = getProductData(item);
          
          return (
            <div
              key={productData.productId}
              className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 cursor-pointer"
              onClick={() => router.push(`/product/${slugify(productData.name, { lower: true })}`)}
            >
              {/* Conditionally render remove button */}
              {isWishlistPage && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(productData.productId);
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-100 hover:bg-red-200 rounded-full text-red-500 hover:text-red-600 transition-colors z-[5]"
                  title="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              <div className="relative w-full h-48 mb-4">
                <Image
                  src={productData.image}
                  alt={productData.name}
                  className="object-contain"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority
                />
              </div>

              <h3 className={`font-semibold text-sm mb-2 h-10 line-clamp-2 ${isWishlistPage ? 'pr-8' : ''}`}>
                {productData.name}
              </h3>

              <div className="flex items-center mb-3">
                <span className="font-bold text-red-600">
                  ${productData.price.toFixed(2)}
                </span>
              </div>

              <div className="w-full h-px bg-gray-100 mb-3"></div>

              <div className="flex items-center justify-between">
                <AddToWishlist item={item as CartItem} />
                <AddToCart item={item as CartItem} />
                <AddToCompare item={item as ComparisonItem} />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}