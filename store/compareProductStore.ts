import {create} from 'zustand';
import {ComparisonItem} from '@/types/types';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthStore } from './authStore';

interface CompareState {
    compareProducts: ComparisonItem[],
    fetchCompareProducts: () => void;
    addToCompare: (productId: number) => void;
    removeFromCompare: (productId: number) => void;
    loading: boolean;
}

export const useCompareStore = create<CompareState>((set, get) => ({
    
    compareProducts: [],
    loading: false,

    fetchCompareProducts: async() => {
        // This function can be implemented to fetch compare products from an API if needed
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.get('/api/compare', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      set({ 
        compareProducts: data.compareItems,
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
      if (error instanceof Error) {
        toast.error(error.message,{
          position: "bottom-center"
        });
      } else {
        toast.error('Failed to fetch compare products',{
          position: "bottom-center"
        });
      }
    }
    }, 

    addToCompare: async (productId: number) => {
        set({ loading: true });
        try {
        const token = useAuthStore.getState().token;
        
        // Fix: Headers should be in the config object, not as data
        const { data } = await axios.post(`/api/compare/${productId}`, {}, {
            headers: {
            'Authorization': `Bearer ${token}`,
            }
        });
        
        // Refresh compare after adding item
        get().fetchCompareProducts();

        if(data.status === 200) {
            toast.info(`${data.name} is already in your compare list!`, {
            position: "bottom-center",
            className: "whitespace-pre-wrap",
            });
        } else {
            toast.success(data.message || 'Item added to compare successfully', {
            position: "bottom-center",
            className: "whitespace-pre-wrap"
            });
        }
        
        set({ loading: false });
        } catch (error) {
          if (error instanceof Error) {
            toast.error(error.message,{
              position: "bottom-center"
            });
          } else {
            toast.error('Failed to add item to compare',{
              position: "bottom-center"
            });
          }
          set({ loading: false });
        }
    },

    removeFromCompare: async (productId: number) => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      await axios.delete(`/api/compare/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });

      // Refresh compare after removing item
      get().fetchCompareProducts();

      toast.info(`Item removed from compare.`, {
        position: "bottom-center",
        className: "whitespace-pre-wrap",
      });
      
      set({ loading: false });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message,{
          position: "bottom-center"
        });
      } else {
        toast.error('Failed to remove item from compare',{
          position: "bottom-center"
        });
      }
      set({ loading: false });
    }
    },
}));

