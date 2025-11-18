'use client';

import { use, useEffect, useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { useCategoryStore } from '@/store/categoryStore';
import AddToCart from '@/components/AddToCart';
import Image from 'next/image';
import { Loader} from 'lucide-react';
import { Button } from '@heroui/button';
import type { CartItem, Product } from '@/types/types';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Product({ params }: { params: Promise<{ slug: string }>  }) {
  const { slug } = use(params);
  console.log('Product slug:', slug);
  const router = useRouter();
  
  const { token } = useAuthStore();
  const { products, isLoading, fetchProducts} = useProductStore();
  const { addToWishlist } = useWishlistStore();

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [productError, setProductError] = useState<Error | null>(null);

  // Helper function to convert Product to CartItem format
  const productToCartItem = (product: Product): CartItem => {
    return {
      cartItemId: undefined,
      userId: undefined,
      productId: product.productId,
      quantity: 1,
      createdAt: undefined,
      updatedAt: undefined,
      product: product,
      category: undefined
    };
  };

const { categories, fetchCategories } = useCategoryStore();
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Effect for fetching product details
  useEffect(() => {
    // Reset states when slug changes
    setProduct(null);
    setProductError(null);
    
    // Skip if products aren't loaded yet
    if (!products || !Array.isArray(products) || products.length === 0) {
      return;
    }
    
    // Find product with matching slug
    const filteredProduct = products.find((product: Product) => 
      slugify(product.name, { lower: true }) === slug
    );
    
    const productId = filteredProduct?.productId;
    
    if (!productId) {
      // No matching product found
      setProduct(null);
      return;
    }
    console.log('Found product ID:', productId);
    
    fetch(`/api/products/${productId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        return response.json();
      })
      .then(data => {
        debugger;
        setProduct(data);
        setProductError(null);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
        setProductError(error instanceof Error ? error : new Error('Unknown error'));
        // Fallback to the basic product info if API call fails
        setProduct(filteredProduct);
      });
  }, [slug, products]);
 
  const showLoading = isLoading || (!product && !productError);

  const handleAddToWishlist = () => {
    try {
      if (!token) {
        toast.error(
          <div className="cursor-pointer" 
            onClick={(e) => {
              e.stopPropagation();
              router.push('/signin');
            }}
          >
            Please sign in to add to wishlist. Click to sign in.
          </div>, 
          {
            position: "bottom-center",
            autoClose: 5000,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
          }
        );
        return;
      }  

      if (product) {
        addToWishlist(product.productId);
        console.log("Added to wishlist: ", product);
      }
    } catch (err) {
      console.error("Error adding to wishlist: ", err);
    }
  };

    const getCategory = (categoryId: number) => {
    if (typeof categoryId !== 'number') return undefined;
    const category = categories.find((c) => c.categoryId === categoryId);
    console.log('dfshfi   ====> ', category);
    return category?.name;
  }

  return (
    <div className='container mx-auto px-4 min-h-[100vh] my-8'>
      <div className='flex flex-col'>
        {product ? (
          <div className='flex flex-col md:flex-row justify-between items-center py-8 flex-grow'>
            <div className='flex flex-col md:flex-row items-center lg:gap-28'>
              <Image 
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
                className='rounded-lg'
              />
              <div className='ml-8'>
                <h1 className='text-2xl font-bold mb-8'>{product.name}</h1>
                <div className='text-lg text-gray-700'>
                  {product.description && (
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  )}
                </div>
                <p className='text-xl font-semibold my-4'>${product.price}</p>

                <div className='flex justify-start mt-4 md:mt-0'>
                  <AddToCart item={productToCartItem(product)} />
                  <Button 
                    className='bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 ml-2' 
                    onPress={handleAddToWishlist}
                  >
                    Add to Wishlist
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : showLoading ? (
          <div className="col-span-full py-20 text-center text-gray-500 flex-grow">
            <Loader className="w-16 h-16 mx-auto mb-4 text-gray-400 animate-spin"/>
            <p className="text-lg font-medium">Loading...</p>
          </div>
        ) : productError ? (
          <div className='flex flex-col items-center justify-center flex-grow'>
            <h1 className='text-2xl font-bold my-4'>Error Loading Product</h1>
            <p>{productError.message}</p>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center flex-grow'>
            <h1 className='text-2xl font-bold my-4'>Product Not Found</h1>
          </div>
        )}
      </div>
       {/* Additional Product Information */}
            <div className='w-full mt-12 border-t border-gray-200 pt-8'>
              {/* Product Specifications */}
              <div className='mb-8'>
                <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Product Specifications</h2>
                <div className='bg-white border border-gray-200 rounded-lg overflow-hidden'>
                  <div className='grid grid-cols-1 divide-y divide-gray-200'>
                    {product?.categoryId && (
                      <div className='grid grid-cols-3 p-4 hover:bg-gray-50'>
                        <span className='font-medium text-gray-700'>Category</span>
                        <span className='col-span-2 text-gray-600'>
                        {typeof product.categoryId === 'number' ? getCategory(product.categoryId) : 'N/A'}
                        </span>
                      </div>
                    )}
                    {product?.weight && (
                      <div className='grid grid-cols-3 p-4 hover:bg-gray-50'>
                        <span className='font-medium text-gray-700'>Weight</span>
                        <span className='col-span-2 text-gray-600'>{product.weight} kg</span>
                      </div>
                    )}
                    <div className='grid grid-cols-3 p-4 hover:bg-gray-50'>
                      <span className='font-medium text-gray-700'>Stock Status</span>
                      <span className='col-span-2'>
                        {product?.inStock ? (
                          <span className='text-green-600 font-medium'>✓ In Stock</span>
                        ) : (
                          <span className='text-red-600 font-medium'>Out of Stock</span>
                        )}
                      </span>
                    </div>
                    {product?.onSale && (
                      <div className='grid grid-cols-3 p-4 hover:bg-gray-50'>
                        <span className='font-medium text-gray-700'>Special Offer</span>
                        <span className='col-span-2 text-orange-600 font-medium'>✓ On Sale</span>
                      </div>
                    )}
                    <div className='grid grid-cols-3 p-4 hover:bg-gray-50'>
                      <span className='font-medium text-gray-700'>Product Type</span>
                      <span className='col-span-2 text-gray-600'>
                        {product?.productType ? product?.productType.replace(/_/g, ' ') : 'Standard'}
                      </span>
                    </div>
                    <div className='grid grid-cols-3 p-4 hover:bg-gray-50'>
                      <span className='font-medium text-gray-700'>Product ID</span>
                      <span className='col-span-2 text-gray-600'>{product?.productId}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-8'>
                <div className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'>
                  <h3 className='text-lg font-semibold mb-4 text-gray-800'>Shipping Information</h3>
                  <ul className='space-y-3 text-gray-600'>
                    <li className='flex items-start'>
                      <span className='text-green-600 mr-2 mt-0.5'>✓</span>
                      <span>Free shipping on orders over $50</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-green-600 mr-2 mt-0.5'>✓</span>
                      <span>Standard delivery: 3-5 business days</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-green-600 mr-2 mt-0.5'>✓</span>
                      <span>Express delivery available</span>
                    </li>
                  </ul>
                </div>

                <div className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'>
                  <h3 className='text-lg font-semibold mb-4 text-gray-800'>Returns & Warranty</h3>
                  <ul className='space-y-3 text-gray-600'>
                    <li className='flex items-start'>
                      <span className='text-green-600 mr-2 mt-0.5'>✓</span>
                      <span>30-day money-back guarantee</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-green-600 mr-2 mt-0.5'>✓</span>
                      <span>1-year manufacturer warranty</span>
                    </li>
                    <li className='flex items-start'>
                      <span className='text-green-600 mr-2 mt-0.5'>✓</span>
                      <span>Easy returns process</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Customer Reviews */}
              <div className='border border-gray-200 rounded-lg p-6'>
                <h2 className='text-2xl font-semibold mb-6 text-gray-800'>Customer Reviews</h2>
                {product?.rating_count && product.rating_count > 0 ? (
                  <div className='flex items-center gap-2 mb-6'>
                    <div className='flex'>
                      {Array.from({ length: Math.floor(Number(product.rating_count)) }, (_, i) => (
                        <span key={i} className='text-amber-400 text-2xl'>★</span>
                      ))}
                      {Number(product.rating_count) % 1 !== 0 && (
                        <span className='text-amber-400 text-2xl'>★</span>
                      )}
                    </div>
                    <span className='text-lg font-medium text-gray-700'>
                      {product.rating_count} out of 5
                    </span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 mb-6'>
                    <div className='flex'>
                      {Array.from({ length: 5 }, (_, i) => (
                        <span key={i} className='text-gray-300 text-2xl'>★</span>
                      ))}
                    </div>
                    <span className='text-gray-500'>No ratings yet</span>
                  </div>
                )}
                <div className='text-center py-8 bg-gray-50 rounded-lg'>
                  <p className='text-gray-500'>No reviews yet. Be the first to review this product!</p>
                </div>
              </div>
            </div>
    </div>
  );
}