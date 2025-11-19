"use client" 

import Image from 'next/image';
import { Button } from '@heroui/button';
import React, { useEffect, useState } from 'react';
import { Heart, User, ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import SearchForm from './SearchForm';
import ShoppingCartModal from './ShoppingCartModal';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const { cart, fetchCart } = useCartStore();
  const [showCartModal, setShowCartModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { token, clearToken } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchCart();
    return () => {
      // Cleanup if necessary
    };
  }, [fetchCart]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    closeMobileMenu();
  };

  return (
    <div className="sticky top-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 lg:px-16">
        {/* Main header */}
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <header className="flex-shrink-0">
            <Image 
              src="/logo.png"
              alt="logo"
              width={180}
              height={60}
              className='w-32 h-16 sm:w-40 lg:w-48'
              priority
            />
          </header>

          {/* Desktop Navigation */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8 cursor-pointer">
              <li 
                onClick={() => router.push('/')}
                className="hover:text-gray-600 transition-colors"
              >
                Home
              </li>
              <li 
                onClick={() => router.push('/about')}
                className="hover:text-gray-600 transition-colors"
              >
                About
              </li>
              <li 
                onClick={() => router.push('/contactus')}
                className="hover:text-gray-600 transition-colors"
              >
                Contact Us
              </li>
              <li 
                onClick={() => router.push('/compare')}
                className="hover:text-gray-600 transition-colors"
              >
                Compare
              </li>
            </ul>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <div className='sticky z-30'>
              <SearchForm />
            </div>

            <Heart 
              size={24} 
              className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors' 
              onClick={() => router.push('/wishlist')} 
            />

            {!token && (
              <Button className='border-2 border-gray-500 rounded-2xl' onPress={() => router.push('/signin')}>
                <User size={24} className='cursor-pointer'/> 
                <span>Sign In</span>
              </Button>
            )}

            <div className='relative'>
              {cart.length > 0 && (
                <div className='absolute -top-2 -end-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold'>
                  {cart.length}
                </div>
              )}
              
              <ShoppingCart 
                size={24} 
                className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors' 
                onClick={() => setShowCartModal(true)} 
              />
            </div>

            {token && 
              <LogOut 
                    className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors' 
                    size={20}
                    onClick={()=>clearToken()}
             />}
          </div>


          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-3">
            <Heart 
              size={20} 
              className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors' 
              onClick={() => router.push('/wishlist')} 
            />

            <div className='relative'>
              {cart.length > 0 && (
                <div className='absolute -top-2 -end-2 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold'>
                  {cart.length}
                </div>
              )}
              
              <ShoppingCart 
                size={20} 
                className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors' 
                onClick={() => setShowCartModal(true)} 
              />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Search */}
              <div className="mb-4">
                <SearchForm />
              </div>

              {/* Mobile Navigation */}
              <nav>
                <ul className="space-y-4">
                  <li 
                    onClick={() => handleNavigation('/')}
                    className="block py-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    Home
                  </li>
                  <li 
                    onClick={() => handleNavigation('/about')}
                    className="block py-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    About
                  </li>
                  <li 
                    onClick={() => handleNavigation('/contactus')}
                    className="block py-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    Contact Us
                  </li>
                  <li 
                    onClick={() => handleNavigation('/compare')}
                    className="block py-2 text-gray-700 hover:text-gray-900 cursor-pointer transition-colors"
                  >
                    Compare
                  </li>
                </ul>
              </nav>

              {/* Mobile Sign In */}
              {!token && (
                <div className="pt-4 border-t border-gray-200">
                  <Button 
                    className='w-full border-2 border-gray-500 rounded-2xl' 
                    onPress={() => {
                      router.push('/signin');
                      closeMobileMenu();
                    }}
                  >
                    <User size={20} className='cursor-pointer'/> 
                    <span>Sign In</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      <ShoppingCartModal 
        showModal={showCartModal}
        onClose={() => setShowCartModal(false)}
      />
    </div>
  );
}