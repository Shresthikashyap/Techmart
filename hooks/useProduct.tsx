import axios from "axios";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export const useProducts = () => {
  const { products, setProducts, isLoading, setIsLoading, error, setError } = useProductStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try { 
        setIsLoading(true);
        console.log("Fetching products...");
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(new Error(err.message || "An unknown error occurred"));
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [setProducts, setError, setIsLoading]);

  return {
    products,
    isLoading,
    error,
  };
};