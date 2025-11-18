"use client";

import Image from "next/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import slugify from "slugify";
import Services from "./Services";

export default function HeroBanner() {
    const router = useRouter();

    const handleBuyNow = (product: string) => {
        router.push(`/product/${slugify(product, { lower: true })}`);
    };

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 border-b ">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 gap-6 lg:gap-8">
                    
        {/* Main Banner - NIKE Blue Shoes */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[300px] md:min-h-[400px] xl:min-h-[500px] md:col-span-2 xl:col-span-2 xl:row-span-2 xl:col-start-1 xl:row-start-1">
            <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/shoe.jpg"
                alt="NIKE Blue Shoes"
                width={800}
                height={600}
                priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-16 max-w-[90%] lg:max-w-[70%]">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                    NIKE Blue Shoes
                </h2>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-md drop-shadow-md hidden sm:block">
                    Step into comfort and style with our premium collection
                </p>
                <Button
                    color="primary"
                    className="w-fit px-8 py-4 rounded-full bg-white hover:bg-gray-50 text-amber-500 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg text-base lg:text-lg"
                    onPress={() => handleBuyNow("nike-red-shoes")}
                >
                    Buy now
                </Button>
            </div>
        </div>

        {/* Secondary Banner 1 - Women Latin Shoes */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[250px] md:min-h-[300px]">
            <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/women-shoe.jpg"
                alt="Women Latin Shoe"
                width={400}
                height={300}
                priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 max-w-[90%]">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                    Women Latin Shoes
                </h3>
                <Button 
                    color="primary" 
                    className="w-fit px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-amber-500 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
                    onPress={() => handleBuyNow("women-latin-shoes")}
                >
                    Buy now
                </Button>
            </div>
        </div>

        {/* Secondary Banner 2 - Outlier Headphone */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[250px] md:min-h-[300px] xl:row-start-2">
            <Image
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                src="/headphone.jpg"
                alt="Outlier Headphone"
                width={400}
                height={300}
                priority
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
            <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 max-w-[90%]">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                    Outlier Headphone
                </h3>
                <Button 
                    color="primary" 
                    className="w-fit px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-amber-500 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
                    onPress={() => handleBuyNow("Wireless Bluetooth Headphones")}
                >
                    Buy now
                </Button>
            </div>
        </div>
      </div>

      <Services />

     
    </div>
  );
}
