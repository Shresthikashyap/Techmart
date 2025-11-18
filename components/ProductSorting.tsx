import React from 'react'

interface ProductsProps {
  productsLength:number;
  currentProductsLength: number;
  handleChangeOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ProductSorting = ({productsLength, currentProductsLength, handleChangeOption}: ProductsProps) => {

  return (
            <div className="flex justify-between items-center mb-6">
              <div className="text-sm text-gray-500">
                {/* Showing {filteredProducts.length} of {products.length} products */}
                Showing {currentProductsLength} of {productsLength} products
              </div>
              <div className="flex items-center justify-center">
                <label htmlFor="sort" className="mr-2 text-sm">
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="border rounded py-1 px-2 text-sm"
                  onChange={handleChangeOption}
                >
                  <option>Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Name: A to Z</option>
                </select>
              </div>
            </div>
  )
}

export default ProductSorting