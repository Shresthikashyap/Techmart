"use client";

import { useRouter } from "next/navigation";
import { Loader, PackageX } from "lucide-react";
import { useProductStore } from "@/store/productStore";
import Products from "./Products";
import { useEffect } from "react";

export default function BestSellerProducts() {
  //const [productsWithSWR, setProductsWithSWR] = useState<Product[]>([]);
  const { trendingProducts, fetchTrendingProducts, error, isLoading } = useProductStore();
  const router = useRouter();

  useEffect(()=>{
    fetchTrendingProducts();
  }, [fetchTrendingProducts]);

  if (isLoading) {
    return (
      <div className="col-span-full py-20 text-center text-gray-500">
        <Loader className="w-8 h-8 mx-auto mb-4 text-gray-400"/>
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
        <h2 className="text-xl font-bold">Trending Products</h2>

        <p
          className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors cursor-pointer"
          onClick={() => router.push("/all-products?type=trending")}
        >
          View all
        </p>
        {/* </Link> */}
      </div>

      {trendingProducts.length > 0 &&
          <Products products={trendingProducts} limit={4} />
      }

    </div>
  );
}
