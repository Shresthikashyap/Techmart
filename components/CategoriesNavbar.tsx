"use client"

import Link from "next/link";
import { useProductStore } from "@/store/productStore";
import { useCategoryStore } from "@/store/categoryStore";
//import { useEffect, useState } from "react";
import { Loader, PackageX } from "lucide-react";
import { Category } from "@/types/types";
import { useEffect } from "react";

export default function CategoriesNavbar() {

    //const {categories, fetchCategories} = useProductStore();
    //const [ productCategories, setProductCategory ] = useState<Category[]>([]);
    const { categories, error, isLoading, fetchCategories } = useCategoryStore();
    const { fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, [fetchProducts, fetchCategories]);

    console.log(categories.length, 'categories-- ', categories);
    // useEffect(()=>{
    //     //fetchCategories();
    //    if(categories.length !== 0){
    //     console.log('categories ', categories);
    //     setProductCategory(categories);
    //    }

    // }, [categories]);

    return(
        <div className="font-semibold bg-gray-100 py-4">
            <ul className="flex flex-wrap justify-center items-center gap-4 lg:gap-x-14 mx-auto">
                {categories.length > 0 && categories.map((category: Category) => {
                    console.log('Rendering category: ', category);
                    return (
                        <li key={category.categoryId} className="cursor-pointer text-center text-gray-950 hover:text-black hover:font-bold transition-all duration-200">
                            <Link href={`/all-products?category=${category.slug}`}>
                                <div>{category.slug.replace(/-/g, ' ')}</div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
                {isLoading && 
                    <div className="col-span-full py-8 text-center text-gray-500">
                            <Loader className="w-8 h-8 mx-auto mb-4 text-gray-400"/>
                        {/* <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" /> */}
                        <p className="text-lg font-medium">
                            ...Loading
                        </p>
                    </div>
                }

                {error &&
                    <div className="flex flex-col items-center text-gray-500 mt-10">
                        <PackageX className="w-12 h-12 mb-2" />
                        <p className="text-lg">No products available</p>
                    </div>
                }
        </div>
    )
}