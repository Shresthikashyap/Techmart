import { create } from "zustand";
import axios from "axios";
import { Product } from "@/types/types";

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  newArrivalProducts: Product[];
  setNewArrivalProducts: (products: Product[]) => void;
  bestSellerProducts: Product[];
  setBestSellerProducts: (products: Product[]) => void;
  trendingProducts: Product[];
  setTrendingProducts: (products: Product[]) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  error: Error | null;
  setError: (error: Error | null) => void;

  fetchProducts: () => Promise<void>;
  fetchBestSellerProducts: () => Promise<void>;
  fetchNewArrivalProducts: () => Promise<void>;
  fetchTrendingProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  newArrivalProducts: [],
  setNewArrivalProducts: (products) => set({ newArrivalProducts: products }),
  bestSellerProducts: [],
  setBestSellerProducts: (products) => set({ bestSellerProducts: products }),
  trendingProducts: [],
  setTrendingProducts: (products) => set({ trendingProducts: products }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  error: null,
  setError: (error) => set({ error }),

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/products");
      set({ products: response.data });
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

  fetchBestSellerProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/products/bestseller-products");
      set({ bestSellerProducts: response.data });
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

  fetchNewArrivalProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/products/arrival-products");
      set({ newArrivalProducts: response.data });
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
  fetchTrendingProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/products/trending-products");
      set({ trendingProducts: response.data });
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
