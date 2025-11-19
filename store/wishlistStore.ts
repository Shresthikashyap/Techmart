import { create } from 'zustand';
import axios from 'axios';
import { CartItem } from '@/types/types';
import { toast } from 'react-toastify';
import { useAuthStore } from './authStore';

interface WishlistState {
  wishlist: CartItem[];
  loading: boolean;

  // Actions
  fetchWishlist: () => void;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (itemId: number | undefined) => void;
  clearWishlist: () => void;
  
  // Helper functions
  isInWishlist: (itemId: number) => boolean;
  getWishlistCount: () => number;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],
  loading: false,
  error: null,

  fetchWishlist: async () => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.get('/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      set({ 
        wishlist: data.wishlistItems,
        loading: false 
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error fetching wishlist:', error);
      } else {
        toast.error('Failed to fetch wishlist',{
          position: "bottom-center"
        });
      }
      set({ loading: false });
    }
  },

  addToWishlist: async (productId: number) => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      
      // Fix: Headers should be in the config object, not as data
      const { data } = await axios.post(`/api/wishlist/${productId}`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      // Refresh wishlist after adding item
      get().fetchWishlist();
      
      if(data.status === 200) {
        toast.info(`${data.name} is already in your wishlist!`, {
          position: "bottom-center",
          className: "whitespace-pre-wrap",
        });
      } else {
        toast.success(data.message || 'Item added to wishlist successfully', {
          position: "bottom-center",
          className: "whitespace-pre-wrap"
        });
      }
      
      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      if (error instanceof Error) {
        console.log('Error adding to wishlist:', error);
      } else {
        toast.error('Failed to add item to wishlist',{
          position: "bottom-center"
        });
      }
    }
  },

  removeFromWishlist: async (productId: number | undefined) => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      await axios.delete(`/api/wishlist/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      // Refresh wishlist after removing item
      get().fetchWishlist();
      
      toast.info(`Item removed from wishlist.`, {
        position: "bottom-center",
        className: "whitespace-pre-wrap",
      });
      
      set({ loading: false });
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error removing from wishlist:', error);
      } else {
        toast.error('Failed to remove item from wishlist',{
          position: "bottom-center"
        });
      }
      set({ loading: false });
    }
  },

  clearWishlist: async () => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      await axios.delete('/api/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      set({ 
        wishlist: [], 
        loading: false 
      });
      
      toast.info("Wishlist cleared.", {
        position: "bottom-center",
        className: "whitespace-pre-wrap",
      });
    } catch (error) {

      set({ loading: false });
      if (error instanceof Error) {
        
        toast.error('Failed to clear wishlist',{
          position: "bottom-center"
        });
      }
    }
  },

  // Helper functions
  isInWishlist: (itemId: number) => {
    const { wishlist } = get();
    return wishlist.some((item) => item.productId === itemId);
  },

  getWishlistCount: () => {
    const { wishlist } = get();
    return wishlist.length;
  },
}));