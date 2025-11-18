"use client"

// import Image from "next/image";
// import { Button } from "@heroui/button";
// import Link from "next/link";
import { useRouter } from "next/navigation";
//import { redirect } from 'next/navigation'

import { Loader, PackageX } from "lucide-react";
//import axios from "axios";
// import { useState, useEffect } from "react";
import { useProductStore } from "@/store/productStore";
// import AddToCart from "./AddToCart";
// import AddToCompare from "./AddToComapre";
// import slugify from "slugify";
import Products from "./Products";
import { useEffect } from "react";

export default function NewArrivalsProducts() {
  //const [productsWithSWR, setProductsWithSWR] = useState<Product[]>([]);
  const { newArrivalProducts, error, isLoading, fetchNewArrivalProducts } = useProductStore();
  const router = useRouter();

  useEffect(()=>{
    fetchNewArrivalProducts();
  }, [fetchNewArrivalProducts]);

  if (isLoading) {
    return (
      <div className="col-span-full py-20 text-center text-gray-500">
        <Loader className="w-8 h-8 mx-auto mb-4 text-gray-400"/>
      {/* <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" /> */}
      <p className="text-lg font-medium">
        ...Loading
      </p>
    </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center text-gray-500 mt-10">
        <PackageX className="w-12 h-12 mb-2" />
      <p className="text-lg">No products available</p>
    </div>
    );
  }



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-bold">New Arrivals</h2>
        {/* <Button
          className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors cursor-pointer"
          onPress={() => (window.location.href = "/all-products")}
        >
          View all
        </Button> */}
        {/* <Link href={'/all-products'}> */}
        <p
          className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors cursor-pointer"
          onClick={() => router.push("/all-products?type=new-arrivals")}
        >
          View all
        </p>
        {/* </Link> */}
      </div>

      {//products.length>0 ?
      //     <Products products={products} />
      //  :(isLoading?(
      //   <div className="col-span-full py-20 text-center text-gray-500">
      //     <Loader className="w-8 h-8 mx-auto mb-4 text-gray-400"/>
      //     {/* <Monitor className="w-16 h-16 mx-auto mb-4 text-gray-400" /> */}
      //     <p className="text-lg font-medium">
      //       ...Loading
      //     </p>
      //   </div>
      //  ):(
      //   <div className="flex flex-col items-center text-gray-500 mt-10">
      //     <PackageX className="w-12 h-12 mb-2" />
      //     <p className="text-lg">No products available</p>
      //   </div>
      //  )
      //  )
       }

             {newArrivalProducts.length>0 &&
                 <Products products={newArrivalProducts} limit={4} />
              }
    </div>
  );
}
