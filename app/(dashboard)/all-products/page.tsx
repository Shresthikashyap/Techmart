//all-products/page.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
import { Product, Category} from "@/types/types";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import ProductsComponent from "@/components/Products";
import Pagination from "@/components/Pagination";
import ProductSorting from "@/components/ProductSorting";
import PriceFilter from "@/components/PriceFilter";

export default function ProductsPage() {
  const { products, fetchProducts,bestSellerProducts, fetchBestSellerProducts, newArrivalProducts, fetchNewArrivalProducts, trendingProducts,fetchTrendingProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();
  
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<number>(1000);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [showAllProducts, setShowAllProducts] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const allCheckboxRef = useRef<HTMLInputElement>(null);
  const productsPerPage = 8;
  
  const totalProductsPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const searchParams = useSearchParams();

  useEffect(() => {
    const productType = searchParams.get("type"); 

    // Apply product type filter from URL parameter
    if (productType === "bestseller") {
      fetchBestSellerProducts();
      setAllProducts(bestSellerProducts)
    } else if (productType === "new-arrivals") {
      fetchNewArrivalProducts();
      setAllProducts(newArrivalProducts);
    } else if (productType === "trending") {
      fetchTrendingProducts();
      setAllProducts(trendingProducts);
    } else {
      fetchProducts();
      setAllProducts(products);
    }
    fetchCategories();
  }, [searchParams, fetchBestSellerProducts, fetchNewArrivalProducts, fetchTrendingProducts, fetchProducts, fetchCategories, products, bestSellerProducts, newArrivalProducts, trendingProducts]);

  // Handle URL parameter for category - only on initial load
  useEffect(() => {

    const categorySearch = searchParams.get("category");
    
    
    // Only process URL params if we have products, categories, and a category search parameter
    if (allProducts?.length > 0 && categories?.length > 0 && categorySearch) {
      try {
        const productsCategory = categories.find(
          (category: Category) => category.slug === categorySearch
        );
        
        const categoryId = productsCategory ? productsCategory.categoryId : null;
        
        if (categoryId === null) {
          toast.error("Category not found for the given slug.",{
            position: "bottom-center"
          });
        } else {
          // Set selected category from URL param
          setSelectedCategories([categoryId]);
          setShowAllProducts(false);
          
          // Uncheck the "All" checkbox
          if (allCheckboxRef.current) {
            allCheckboxRef.current.checked = false;
          }
          
          // Filter products based on the URL parameter
          let filtered = allProducts.filter((product: Product) => {
            return categoryId === product.categoryId;
          });
          
          // Apply price filter
          filtered = filtered.filter((product: Product) => {
            const productPrice =product.price;
            return productPrice <= priceRange;
          });
          
          setFilteredProducts(filtered);
        }
      } catch (err) {
        toast.error("Error processing category. Please try again.",
          {
            position: "bottom-center"
          }
        );
        console.log(err);
      }
    }
    // This effect should only run once when products and categories are loaded
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts, categories, searchParams]);

  // Apply filters whenever selectedCategories, showAllProducts, or priceRange changes
  // This is separate from the URL parameter handling
  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;

    try {
      let result = [...allProducts];

      // If "All" is not selected and specific categories are selected
      if (!showAllProducts && selectedCategories.length > 0) {
        result = result.filter((product) =>
          product.categoryId !== undefined && selectedCategories.includes(product.categoryId)
        );
      }
      
      // Apply price filter
      result = result.filter((product) => {
        const productPrice = product.price;
        return productPrice <= priceRange;
      });
      
      // Update filteredProducts
      setFilteredProducts(result);
    } catch (err) {
      toast.error("Error filtering products. Please try again.",{
        position: "bottom-center"
      });
      console.log(err);
    }
  }, [selectedCategories, priceRange, allProducts, showAllProducts]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts]);

  const handlePageClick = (e: { selected: number }) => {
    setCurrentPage(e.selected + 1);
  };

  const handleAllCategories = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    
    if (isChecked) {
      // When "All" is checked, uncheck all other categories and show all products
      setSelectedCategories([]);
      setShowAllProducts(true);
    } else {
      // If "All" is unchecked but no categories are selected,
      // recheck "All" to ensure at least one filter is active
      if (selectedCategories.length === 0) {
        e.target.checked = true;
        setShowAllProducts(true);
      } else {
        setShowAllProducts(false);
      }
    }
  };

  const handleCheckedOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = parseInt(e.target.value, 10);
    const isChecked = e.target.checked;

    if (isChecked) {
      // When a category is checked
      if (showAllProducts) {
        // If "All" was active, uncheck it and start with just this category
        setShowAllProducts(false);
        if (allCheckboxRef.current) {
          allCheckboxRef.current.checked = false;
        }
        setSelectedCategories([categoryId]);
      } else {
        // Otherwise, add to existing selection
        setSelectedCategories(prev => [...prev, categoryId]);
      }
    } else {
      // Remove the category from selected categories
      const updatedCategories = selectedCategories.filter(id => id !== categoryId);
      setSelectedCategories(updatedCategories);
      
      // If no categories are selected, check "All" again
      if (updatedCategories.length === 0) {
        setShowAllProducts(true);
        if (allCheckboxRef.current) {
          allCheckboxRef.current.checked = true;
        }
      }
    }
  };

  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPriceRange(value);
  };

  const handleChangeOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const sortedProducts = [...filteredProducts];

    if (value === "Price: Low to High") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "Price: High to Low") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (value === "Name: A to Z") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(sortedProducts);
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-8 pb-2 border-b border-gray-200">
          Our Products
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Categories Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-20">
              <h2 className="font-bold text-xl mb-4 pb-2 border-b">
                Categories
              </h2>
              <ul className="space-y-2">
                <li>
                  <input
                    type="checkbox"
                    value="All"
                    id="All"
                    ref={allCheckboxRef}
                    onChange={handleAllCategories}
                    checked={showAllProducts}
                    className="mr-2 cursor-pointer"
                  />
                  <label
                    htmlFor="All"
                    className="py-2 px-3 w-full text-left font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                  >
                    All
                  </label>
                </li>

                {categories.map((category: Category) => (
                  <li key={category.categoryId} className="flex flex-row">
                    <input
                      type="checkbox"
                      value={category.categoryId}
                      id={`category-${category.categoryId}`}
                      onChange={handleCheckedOption}
                      checked={selectedCategories.includes(category.categoryId)}
                      className="mr-2 cursor-pointer"
                    />
                    <label
                      htmlFor={`category-${category.categoryId}`}
                      className="py-2 px-3 w-full text-left font-medium text-gray-700 hover:text-gray-900 cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </li>
                ))}
              </ul>

              {/* Price Filter */}
              <PriceFilter priceRange={priceRange} handleRange={handleRange} />
            </div>
          </div>

          {/* Products Sorting */}
          <div className="flex-1">
            <ProductSorting
              productsLength={allProducts.length}
              currentProductsLength={currentProducts.length}
              handleChangeOption={handleChangeOption}
            />

            {/* Products Grid */}
            <div className="">
              {currentProducts.length > 0 &&
                <ProductsComponent products={currentProducts} />
              }
            </div>

            {/* Pagination */}
            {currentProducts.length > 0 && (
              <Pagination 
                pageCount={totalProductsPages} 
                currentPage={currentPage} 
                onPageChange={handlePageClick} 
              />
            )}
          </div>
        </div>

      </div>
    </div>
  );
}