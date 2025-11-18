
import Image from "next/image";

export default function About() {
    return (
        <div className="container mx-auto px-4 py-10">
            <div className="flex flex-col justify-center gap-8 lg:gap-6 items-center">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6 md:mt-10  text-center">
                    About Us
                </h1>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 justify-center items-center text-gray-400 text-lg md:text-xl">
                    <div className="order-2 lg:order-1 lg:mt-28">
                        <h2 className="font-semibold text-gray-800 text-xl md:text-2xl italic text-center lg:text-left">
                            One destination for everything you love — tech, fashion & lifestyle.
                        </h2>

                        <p className="text-gray-600 mt-6 md:mt-10 text-base md:text-lg max-w-2xl lg:max-w-none lg:w-[50ch] xl:w-[60ch] leading-relaxed">
                            At <span className="font-semibold text-gray-800">TechMart</span>, we believe shopping should be simple, 
                            exciting, and trustworthy. That’s why we bring together a wide variety of products — 
                            from cutting-edge gadgets and gaming gear to stylish clothing, accessories, and lifestyle essentials.
                            <br /><br />
                            Whether you’re upgrading your wardrobe, setting up your dream gaming desk, or 
                            looking for the latest in everyday tech, we’re here to provide you with quality, style, 
                            and convenience — all under one roof.
                            <br /><br />
                            Our goal is to deliver more than just products; we deliver experiences that make 
                            your life smarter, trendier, and more enjoyable.
                        </p>
                    </div>
                    
                    <div className="order-1 lg:order-2 flex-shrink-0">
                        <Image 
                            src="/tech-mart.jpeg"
                            alt="About TechMart"
                            width={450}
                            height={400}
                            className="rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none lg:w-[450px] h-auto"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}