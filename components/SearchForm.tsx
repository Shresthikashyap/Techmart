'use client';

import Form from 'next/form';
//import Dropdown from './Dropdown';
import { Search } from 'lucide-react';
import slugify from 'slugify';
import { useProductStore } from '@/store/productStore';
import { useState } from 'react';

export default function SearchForm({ query }: { query?:string }){

    const { products } = useProductStore();
    //const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredProducts, setFilteredProducts] = useState(products);


    const handleQueryChange = (value: string) => {
        console.log('Query changed:', value);
        setSearchQuery(value)

        const result = products.filter((product) =>
            product.name.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredProducts(result);
    }

    // const handleQuerySearch = () => {
    //     setIsOpen(true)
    // }

    return (
        <div className='flex flex-row gap-1 z-40'>
           <div>
               <Form action='/' scroll={false} className='transition-all'>
                    <div className='relative'>
                        <input 
                            name='query' 
                            defaultValue={searchQuery}
                            className=' w-54 h-9 rounded-full text-center border-gray-400 border-2'
                            placeholder='Search'
                            onChange={(e) => handleQueryChange(e.target.value)}
                        />
                        <div>
                            <Search size={20} className='absolute text-gray-400 top-1/4 left-2' />
                        </div>
                    </div>
               </Form>

               {(searchQuery !== '' && filteredProducts.length > 0) && 
               <div data-dui-role="menu" 
               className="mt-2 bg-white border border-stone-200 rounded-lg shadow-sm p-1 absolute top-10 -end-13 z-80 w-90">
                   {
                          filteredProducts.filter((product) =>
                            product.name.toLowerCase().includes(query?.toLowerCase() || '')
                          ).map((product, index) => (
                            <a
                                key={product.productId}
                                href={`/product/${slugify(product.name, {lower: true })}`}
                                className={`block px-4 py-2 text-sm text-stone-800 hover:bg-stone-100 rounded-md font-semibold ${
                                    index !== filteredProducts.length - 1 ? 'border-b border-stone-200' : ''
                                }`}
                            >
                                    {product.name}
                            </a>
                          ))
                   }
               </div>
               }
           </div>
           <div>
               {/* <Search size={24} className='mt-1'
                //onClick={handleQuerySearch} 
                /> */}
                {/* <Dropdown query={query || ''} /> */}
            </div>
        </div>
    )
}

// How Partial Pre-Rendering Works

// Initial Static Shell: During build time, Next.js generates a static HTML shell of your page that includes all the static parts.
// Streaming Holes: Within this static shell, Next.js creates "holes" where dynamic content will eventually go.
// Hydration Process: When a user visits the page:

// The static shell loads instantly (great for Core Web Vitals)
// The dynamic parts load asynchronously, streaming content into the holes
// These dynamic parts can come from server components, API calls, or database queries

// Benefits of PPR

// Improved Performance: Static content is immediately available to users
// Better SEO: Search engines see the static content right away
// Faster Time to Interactive: Users can interact with static parts while dynamic content loads
// Reduced Server Load: Only dynamic parts require server processing on each request