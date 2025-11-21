import axios from "axios";
import { useCategoryStore } from "@/store/categoryStore";
import { useEffect } from "react";

export const useProductCategories = () => {
  const { categories, setCategories, error, setError, isLoading, setIsLoading } = useCategoryStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/categories");
        setCategories(response.data);
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

    fetchCategories();
  }, [setCategories, setError, setIsLoading]);

  return {
    categories,
    isLoading,
    error,
  };
};