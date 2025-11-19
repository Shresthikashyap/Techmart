// store/authStore.ts
import { create } from 'zustand';
//import { Token } from '@/types/types';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { useCartStore } from './cartStore';
import { useWishlistStore } from './wishlistStore';
import { useCompareStore } from './compareProductStore';

interface UserState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<UserState>()(
  persist(       //middleware provided by Zustand that saves your store's state to persistent storage (like localStorage, sessionStorage, or cookies)
    (set) => ({
      token: null,
      
      setToken: (token: string) => {
        Cookies.set('auth_token', token, {
          expires: 7, // 7 days expiry
          path: '/' 
        });
        set({ token });
      },
      
      clearToken: () => {
        Cookies.remove('auth_token');
        set({ token: null });
        useCartStore.getState().cart=[];
        useWishlistStore.getState().wishlist = [];
        useCompareStore.getState().compareProducts = [];
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);