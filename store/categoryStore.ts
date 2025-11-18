import { create } from "zustand";
import axios from "axios";
import { Category } from "@/types/types";
import { useAuthStore } from "./authStore";

interface CategoryState {
  categories: Category[];
  setCategories: (categories: Category[]) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  error: Error | null;
  setError: (error: Error | null) => void;

  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),

  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  error: null,
  setError: (error) => set({ error }),

  fetchCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = useAuthStore.getState().token;
      console.log(token)
      const response = await axios.get("/api/categories",{
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      set({ categories: response.data });
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
