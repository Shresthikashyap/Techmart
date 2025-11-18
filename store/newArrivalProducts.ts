import { create } from "zustand";
import axios from "axios";
import { Product } from "@/types/types";

interface ProductState {
  newArrivalProducts: Product[];
  setNewArrivalProducts: (products: Product[]) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  error: Error | null;
  setError: (error: Error | null) => void;

  fetchNewArrivalProducts: () => Promise<void>;
}

export const useNewArrivalProductStore = create<ProductState>((set) => ({
  newArrivalProducts: [],
  setNewArrivalProducts: (products) => set({ newArrivalProducts: products }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  error: null,
  setError: (error) => set({ error }),

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
}));
