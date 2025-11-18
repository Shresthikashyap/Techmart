import { create } from "zustand";
import axios from "axios";
import { Product } from "@/types/types";

interface ProductState {
  bestsellerProducts: Product[];
  setBestsellerProducts: (products: Product[]) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  error: Error | null;
  setError: (error: Error | null) => void;

  fetchBestSellerProducts: () => Promise<void>;
}

export const useBestSellerStore = create<ProductState>((set) => ({
  bestsellerProducts: [],
  setBestsellerProducts: (products) => set({ bestsellerProducts: products }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  error: null,
  setError: (error) => set({ error }),

  fetchBestSellerProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/products/bestseller-products");
      set({ bestsellerProducts: response.data });
    } catch (err) {
      if (err instanceof Error) {
        set({ error: err });
      } else {
        set({ error: new Error("Unknown error occurred") });
      }
    } finally {
      set({ isLoading: false });
    }
  },
}));
