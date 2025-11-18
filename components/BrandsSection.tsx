import Image from 'next/image'

export default function BrandsSection() {
    const brands = [
        { src: '/emporio-armani.svg', alt: 'Emporio Armani', className: 'h-16 w-auto' },
        { src: '/gucci.svg', alt: 'Gucci', className: 'h-12 w-auto' },
        { src: '/lenovo.svg', alt: 'Lenovo', className: 'h-12 w-auto' },
        { src: '/calvin-klein.svg', alt: 'Calvin Klein', className: 'h-26 w-auto' },
        { src: '/h-m.svg', alt: 'H&M', className: 'h-14 w-auto' },
        { src: '/levis.svg', alt: "Levi's", className: 'h-16 w-auto' },
    ];

    return(
        <section className=''>
            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-pink-300 to-pink-400 w-full py-12 lg:py-20 text-center shadow-lg">
                <div className="container mx-auto px-4">
                    <p className="font-bold text-lg sm:text-xl lg:text-2xl text-white leading-relaxed max-w-4xl mx-auto">
                        It costs between $1.1 and $4 million a year to buy advertising space in Times Square.
                    </p>
                </div>
            </div>

            {/* Brands Section */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="font-semibold text-2xl lg:text-3xl mb-8 text-center lg:text-left text-gray-800">
                    Best Brands
                </h2>

                {/* Desktop Brands Grid */}
                <div className="hidden lg:flex items-center justify-between gap-8 mb-12">
                    {brands.map((brand, index) => (
                        <div key={index} className="flex items-center justify-center p-4 hover:scale-105 transition-transform duration-300">
                            <Image 
                                src={brand.src} 
                                alt={brand.alt} 
                                height={80} 
                                width={120} 
                                className={`${brand.className} transition-all duration-300 opacity-90 hover:opacity-100`}
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile/Tablet Brands Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-6 sm:gap-8">
                    {brands.map((brand, index) => (
                        <div key={index} className="flex items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300">
                            <Image 
                                src={brand.src} 
                                alt={brand.alt} 
                                height={60} 
                                width={90} 
                                className={`${brand.className} max-h-12 sm:max-h-14 w-auto hover:grayscale-0 transition-all duration-300`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}