'use client';

import React from 'react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CartItem, ComparisonItem } from '@/types/types';
import { useWishlistStore } from '@/store/wishlistStore';
import Products from '@/components/Products';
import { Trash2, ShoppingCart } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';

export default function Wishlist() {
    const router = useRouter();
    const pathname = usePathname();
    const { wishlist, fetchWishlist, clearWishlist } = useWishlistStore();
    
    useEffect(()=>{
        fetchWishlist();
    },[fetchWishlist])

    const handleClearWishlist = () => {
        toast(
            (t) => (
                <span>
                    Are you sure you want to clear your entire wishlist?
                    <div className="mt-2 flex gap-2">
                        <button
                            className="px-3 py-1 bg-red-500 text-white rounded"
                            onClick={() => {
                                clearWishlist();
                                toast.dismiss(t.id);
                            }}
                        >
                            Yes
                        </button>
                        <button
                            className="px-3 py-1 bg-gray-300 rounded"
                            onClick={() => toast.dismiss(t.id)}
                        >
                            No
                        </button>
                    </div>
                </span>
            ),
            { duration: 6000 }
        );
    };

    return (
        <div>
            <div className="flex flex-col justify-center items-center bg-gray-100 text-orange-400 font-semibold text-4xl py-5">
                <h1>Wishlist</h1>
                
                <div className="flex flex-row gap-2 mt-2 text-gray-400 text-[20px]">
                    <p onClick={() => router.push('/')} className="hover:text-gray-600 cursor-pointer">Home</p>
                    <p className="hover:text-gray-600">{pathname
                        .replace(/\//g, "  > ")
                        .replace(/\b\w/g, (char) => char.toUpperCase())}</p>
                </div>
            </div>

            <div className="py-10 md:px-20 lg:px-32 xl:px-40 2xl:px-52">
                {/* Wishlist Actions Bar */}
                {wishlist.length > 0 && (
                    <div className="flex items-center justify-between mb-6">
                        <span className="text-gray-600 text-lg">
                            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                        </span>
                        <button
                            onClick={handleClearWishlist}
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            Clear All
                        </button>
                    </div>
                )}
                {wishlist.length > 0 ? (
                    <>
                        {/* Pass showRemoveButton prop to Products component */}
                        <Products 
                            products={wishlist as CartItem[] | ComparisonItem[]} 
                            showRemoveButton={true}
                        />
                        
                        {/* Additional Actions */}
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={() => router.push('/all-products')}
                                className="flex items-center gap-2 px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-md font-semibold transition-colors"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                Continue Shopping
                            </button>
                        </div>
                    </>
                ) : (
                    <div className='h-[41vh] flex flex-col justify-center items-center'>
                        <div className="text-center">
                            <div className="mb-4">
                                <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <p className="text-gray-500 text-xl mb-6">Your wishlist is empty</p>
                            <p className="text-gray-400 text-sm mb-8">Save items you love to your wishlist and shop them later!</p>
                            <button
                                onClick={() => router.push('/all-products')}
                                className="px-6 py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-md font-semibold transition-colors"
                            >
                                Start Shopping
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Add Toaster component */}
            <Toaster 
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
}   