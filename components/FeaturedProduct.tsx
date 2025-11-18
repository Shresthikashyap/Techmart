import React from 'react'
import Image from 'next/image';
import { Button } from '@heroui/button';

const FeaturedProduct = () => {
  return (
    <div className="bg-gray-300 p-4 md:p-6 lg:p-8 rounded-lg shadow-md mt-8">
      <div className="flex flex-col lg:flex-row justify-between gap-6 lg:gap-8 items-center lg:items-start mx-auto max-w-7xl">
        <div className="flex flex-col items-center lg:items-start gap-4 w-full lg:w-auto lg:flex-1">
          <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-center lg:text-left w-full lg:w-auto">
            Organic Fertilizer
          </h1>
          <p className="text-sm sm:text-base text-center lg:text-left">
            Palm Tree Condensed Blended Fertilizer 15L (1.5kg).
          </p>
          <p className="text-sm sm:text-base text-center lg:text-left">
            Perfect for all types of plants, ensuring healthy growth and vibrant blooms.
          </p>
          <p className="text-sm sm:text-base text-center lg:text-left">
            Rich in essential nutrients and minerals for optimal plant health.
          </p>
          
          <div className="flex flex-row gap-4 justify-center lg:justify-start w-full lg:w-auto">
            <span className="font-bold text-red-600 text-lg sm:text-xl">$ 6.500</span>
            <span className="font-bold text-gray-400 line-through text-lg sm:text-xl">$ 14.500</span>
          </div>

          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <Button className="text-base sm:text-lg font-semibold bg-white px-6 sm:px-8 py-4 sm:py-6 flex justify-center items-center shadow-gray-600 shadow-lg hover:shadow-lg transition-shadow rounded-full">
              Buy now
            </Button>
          </div>
        </div>
        
        
        <div className="relative flex flex-col sm:flex-row lg:flex-row gap-8 sm:gap-16 lg:gap-36 items-center justify-center lg:justify-end w-full lg:w-auto lg:flex-shrink-0">
          <div className="relative">
            <Image
              src={'/single-featured-product.webp'}
              alt="product"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-64 lg:h-64 object-contain"
              width={220}
              height={220}
            />
             <div className="absolute top-0.5 right-1.5 bg-red-600 rounded-full w-12 h-12 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center text-white text-sm sm:text-base lg:text-lg font-bold shadow-lg">
            20%
          </div> 
        

           
        </div>

        </div>
      </div>
    </div>
  )
}

export default FeaturedProduct