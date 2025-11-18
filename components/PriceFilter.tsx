import React from 'react'

interface PriceFilterProps {
  priceRange: number;   
    handleRange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PriceFilter = ({priceRange, handleRange}: PriceFilterProps ) => {
  return (
        <div className="mt-8">
            <h2 className="font-bold text-xl mb-4 pb-2 border-b">Price</h2>
            <div className="px-2">
                <input
                type="range"
                min="0"
                max="100"
                value={priceRange}
                className="w-full"
                onChange={handleRange}
                />
                <div className="flex justify-between mt-2">
                <span>$0</span>
                <span>${priceRange}</span>
                </div>
            </div>
        </div>
  )
}

export default PriceFilter