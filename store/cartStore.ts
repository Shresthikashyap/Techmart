import { create } from 'zustand';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useAuthStore } from "./authStore";
import { CartItem } from '@/types/types';

interface CartState {
  cart: CartItem[];
  totalPrice: number;
  totalItems: number;
  loading: boolean;
  
  fetchCart: () => Promise<void>;
  addToCart: (productId: number | undefined, quantity?: number) => Promise<void>;
  removeFromCart: (productId: number | undefined) => Promise<void>;
  updateQuantity: (productId: number | undefined, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  totalPrice: 0,
  totalItems: 0,
  loading: false,

  fetchCart: async () => {
    set({ loading: true});
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.get('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      set({ 
        cart: data.cartItems, 
        totalPrice: data.totalPrice, 
        totalItems: data.totalItems,
        loading: false 
      });
    } catch (error) {
      if (error instanceof Error) {
      set({ loading: false });
      toast.error('Failed to fetch cart',{
        position: "bottom-center"
      });
    }
    }
  },

  addToCart: async (productId: number | undefined, quantity = 1) => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.post(`/api/cart/${productId}`, {
        productId,
        quantity
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      // Refresh cart after adding item
      await get().fetchCart();
      
      toast.success(data.message || 'Item added to cart successfully', {
        position: "bottom-center",
        className: "whitespace-pre-wrap"
      });
    } catch (error) {
      set({ loading: false });
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to add item to cart',{
          position: "bottom-center"
        });
      }
    }
  },

  removeFromCart: async (productId: number | undefined) => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.delete(`/api/cart/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      // Refresh cart after removing item
      await get().fetchCart();
      
      toast.success(data.message || 'Item removed from cart successfully',{
        position: "bottom-center"
      });
    } catch (error) {
      set({ loading: false });
      if (error instanceof Error) {
        toast.error(error.message,{
          position: "bottom-center"
        });
      } else {
        toast.error('Failed to remove item from cart',{
          position: "bottom-center"
        });
      }
    }
  },

  updateQuantity: async (productId: number | undefined, quantity: number) => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      const { data } = await axios.put(`/api/cart/${productId}`, { quantity }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      // Refresh cart after updating quantity
      await get().fetchCart();
      
      toast.success(data.message || 'Quantity updated successfully');
    } catch (error) {
      set({ loading: false });
      if (error instanceof Error) {
        toast.error(error.message,{
          position: "bottom-center"
        });
      } else {
        toast.error('Failed to update item quantity',{
          position: "bottom-center"
        });
      }
    }
  },

  clearCart: async () => {
    set({ loading: true });
    try {
      const token = useAuthStore.getState().token;
      await axios.delete('/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      
      set({ 
        cart: [], 
        totalPrice: 0, 
        totalItems: 0, 
        loading: false 
      });
      
      toast.success('Cart cleared successfully');
    } catch (error) {
      set({ loading: false });
      if (error instanceof Error) {
        toast.error(error.message,{
          position: "bottom-center"
        });
      } else {
        toast.error('Failed to clear cart',{
          position: "bottom-center"
        });
      }
    }
  }
}));