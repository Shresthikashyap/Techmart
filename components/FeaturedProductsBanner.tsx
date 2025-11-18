
"use client";

import Image from "next/image";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function FeaturedProductsBanner() {
    const router = useRouter();

    const handleBuyNow = (productId: string) => {
        router.push(`/product/${productId}`);
    };

    return (
        <section className="container mx-auto px-4 py-8 lg:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-2 gap-6 lg:gap-8">

                {/* Remote Control Drone */}
                <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[250px] md:min-h-[300px]">
                    <Image
                        className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        src="/remote-control-drone.webp"
                        alt="Remote Control Drone"
                        width={200}
                        height={100}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 max-w-[90%]">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                            Remote Control Drone
                        </h3>
                        <Button 
                            color="primary" 
                            className="w-fit px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-amber-500 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
                            onPress={() => handleBuyNow("remote-control-drone")}
                        >
                            Buy now
                        </Button>
                    </div>
                </div>
        
                {/* PC Gaming Controller */}
                <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[250px] md:min-h-[300px] xl:row-start-2">
                    <Image
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src="/PC Gaming Controller.jpg"
                        alt="PC Gaming Controller"
                        width={200}
                        height={100}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-12 max-w-[90%]">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 sm:mb-4 leading-tight drop-shadow-lg">
                            PC Gaming Controller
                        </h3>
                        <Button 
                            color="primary" 
                            className="w-fit px-6 py-3 rounded-full bg-white hover:bg-gray-50 text-amber-500 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg"
                            onPress={() => handleBuyNow("pc-gaming-controller")}
                        >
                            Buy now
                        </Button>
                    </div>
                </div>
            
                {/* Mechanical Gaming Keyboard */}
                <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-h-[300px] md:min-h-[400px] xl:min-h-[500px] md:col-span-2 xl:col-span-2 xl:row-span-2 xl:col-start-2 xl:row-start-1">
                    <Image
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src="/Mechanical Gaming Keyboard.jpeg"
                        alt="Mechanical Gaming Keyboard"
                        width={400}
                        height={300}
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300"></div>
                    <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-8 lg:px-16 max-w-[90%] lg:max-w-[70%]">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight drop-shadow-lg">
                            Mechanical Gaming Keyboard
                        </h2>
                        <p className="text-white/90 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-md drop-shadow-md hidden sm:block">
                            Enhance your setup with precision keys and RGB backlighting for the ultimate gaming experience.
                        </p>
                        <Button
                            color="primary"
                            className="w-fit px-8 py-4 rounded-full bg-white hover:bg-gray-50 text-amber-500 font-semibold cursor-pointer transition-all duration-300 hover:scale-105 shadow-lg text-base lg:text-lg"
                            onPress={() => handleBuyNow("gaming-mechanical-keyboard")}
                        >
                            Buy now
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
