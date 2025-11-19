"use client";

import {PackageX} from 'lucide-react'
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Diff, X, ChevronRight, ChevronLeft, Star, StarHalf, Check } from "lucide-react";
import { useCompareStore } from "@/store/compareProductStore";
import { useCategoryStore } from '@/store/categoryStore';
import "react-toastify/dist/ReactToastify.css";
import slugify from "slugify";
import { useEffect } from 'react';

export default function Compare() {
  const { compareProducts, fetchCompareProducts, removeFromCompare } = useCompareStore();
  const { categories, fetchCategories } = useCategoryStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    fetchCompareProducts();
    fetchCategories();
    // console.log('------> ',compareProducts);
  }, [fetchCategories, fetchCompareProducts]);

  const handleLeftScroll = () => {
    const container = document.querySelector(".overflow-x-auto") as HTMLElement;
    const scrollAmount = 250;
    container.scrollLeft -= scrollAmount;
  };

  const handleRightScroll = () => {
    const container = document.querySelector(".overflow-x-auto") as HTMLElement;
    const scrollAmount = 250;
    container.scrollLeft += scrollAmount;
  };


  const getCategory = (categoryId: number) => {
    if (typeof categoryId !== 'number') return undefined;
    const category = categories.find((c) => c.categoryId === categoryId);
    console.log('dfshfi   ====> ', category);
    return category?.name;
  }

  return (
    <div>
      <div className="bg-gray-100 w-full flex flex-col justify-center items-center py-5 font-semibold ">
        <p className=" text-3xl text-orange-400">Compare</p>
        <div className="text-gray-400 mt-2 text-[20px] cursor-pointer">
          <span onClick={()=>router.push('/')}>Home{" "}</span>
          {pathname
            .replace(/\//g, " > ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}
        </div>
      </div>
     
      <div className="container mx-auto px-4 py-8">
       {compareProducts.length > 0 ? ( 
        <div className="flex flex-row">
          {/* Left Column - Labels */}
          <div className="flex flex-col border border-gray-200 bg-white">
            <div className="h-[60px] flex items-center justify-center bg-gray-100 border border-gray-200">
              <Diff className="text-gray-600" />
            </div>
            <div className="flex-1 flex flex-col border w-[250px] border-gray-200 bg-white p-4">
              <div className="pt-9 text-center">
                <span className="font-semibold text-green-700 text-2xl">
                  {compareProducts.length}
                </span>
              </div>

              <div className="p-8 text-center">
                <div className="text-[17px] font-semibold text-gray-700">
                  Products to compare
                </div>
              </div>

              <div className="flex justify-center gap-2 pb-24 pt-6 border-b border-gray-200">
                <div className="py-1 px-1 border border-gray-300 shadow-gray-600 shadow-md hover:shadow-lg transition-shadow rounded-full">
                  <ChevronLeft
                    className="text-black bg-white p-0.5 cursor-pointer"
                    onClick={handleLeftScroll}
                  />
                </div>

                <div className="py-1 px-1 border border-gray-300 shadow-gray-600 shadow-md hover:shadow-lg transition-shadow rounded-full">
                  <ChevronRight
                    className="text-black bg-white p-0.5 cursor-pointer"
                    onClick={handleRightScroll}
                  />
                </div>
              </div>

              <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">
                Category
              </div>
              <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">
                Weight (kg)
              </div>
              <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">
                On Sale
              </div>
              <div className="p-4 border-b border-gray-200 font-semibold text-gray-700">
                In Stock
              </div>
              <div className="p-4 font-semibold text-gray-700">Description</div>
            </div>
          </div>

          {/* Right Column - Products */}
          <div className="overflow-hidden">
            <div
              className="flex flex-row border border-gray-200 bg-white overflow-x-auto"
              style={{
                scrollbarWidth: "none" /* Firefox */,
                msOverflowStyle: "none" /* IE and Edge */,
              }}
            >
              {compareProducts.length > 0 &&
                compareProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="flex flex-col"
                  >
                    <div className="h-[60px] flex items-center justify-center bg-gray-100 border border-gray-200 cursor-pointer hover:bg-gray-200">
                      <X
                        className="text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (typeof product.productId === 'number') {
                            removeFromCompare(product.productId);
                          }
                        }}
                      />
                    </div>
                    <div className="p-4 border border-gray-200 flex-1 flex flex-col items-center gap-2 w-[280px]">
                      <div 
                        className="p-4 text-center cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/product/${slugify(product.product?.name, { lower: true })}`
                          )
                        }
                      >
                        <h4 className="font-semibold">
                          {product?.product?.name.length > 20 
                            ? product.product.name.substring(0, 20) + "..." 
                            : product.product.name
                          }
                        </h4>
                        <p className="text-red-600 font-bold">
                          $ {product.product?.price}
                        </p>
                      </div>

                      {/* Fixed-size image container */}
                      <div className="relative w-full h-48 mb-4">
                        <Image
                          src={product?.product?.image}
                          alt={product?.product?.name || "Product"}
                          className="object-contain"
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          priority
                        />
                      </div>

                      {product.product?.rating_count && product.product?.rating_count > 0 ? (
                        <div className="pt-4 flex flex-col items-center gap-2">
                          <div className="flex gap-1">
                            {Array.from(
                              {
                                length: Math.floor(
                                  Number(product.product?.rating_count)
                                ),
                              },
                              (_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 text-amber-400 fill-current"
                                />
                              )
                            )}
                            {Number(product.product?.rating_count) % 1 !== 0 && (
                              <StarHalf className="w-4 h-4 text-amber-400 fill-current" />
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="pt-4 flex flex-col items-center gap-2">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star key={i} className="w-4 h-4 text-gray-300" />
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="p-3 border-b border-gray-200 w-full text-center text-gray-500 font-semibold">
                        {/* Fix: Safely render category name */}
                        {typeof product.product?.categoryId === 'number' ? getCategory(product.product.categoryId) : 'N/A'}
                      </div>
                      <div className="p-3 border-b border-gray-200 w-full text-center text-gray-500 font-semibold">
                        {product.product?.weight || 'N/A'}
                      </div>
                      <div className="p-[15px] border-b border-gray-200 w-full text-center font-semibold">
                        {product.product?.onSale === true ? (
                          <Check className="w-5 h-5 text-green-700 mx-auto" />
                        ) : (
                          <span className="text-gray-700">-</span>
                        )}
                      </div>
                      <div className="p-3 border-b border-gray-200 w-full text-center font-semibold">
                        {product.product?.inStock === true ? (
                          <Check className="w-5 h-5 text-green-700 mx-auto" />
                        ) : (
                          <span className=" text-gray-700">-</span>
                        )}
                      </div>
                      <div className="p-3 text-center text-gray-500 font-semibold">
                        {product.product?.description
                          ? product.product?.description
                              .replace(/<[^>]+>/g, "")
                              .replace(/â†'/g, "")
                              .replace(/&nbsp;/g, " ")
                              .split(" ")
                              .slice(0, 10)
                              .join(" ") + "..."
                          : 'No description available'
                        }
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        ):(
          <div className="flex flex-col items-center text-gray-500 py-40">
            <PackageX className="w-12 h-12 mb-2" />
            <p className="text-lg">No products available to compare</p>
          </div>
        )
        }
       
      </div>
    </div>
  );
}