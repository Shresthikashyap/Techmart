"use client"

import { useRef } from 'react';
import Image from 'next/image';
import { ShoppingCart, X, Trash2 } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { useEffect } from 'react';

interface ShoppingCartModalProps {
  showModal: boolean;
  onClose: () => void;
}

export default function ShoppingCartModal({ showModal, onClose }: ShoppingCartModalProps) {
  const { cart, addToCart, removeFromCart, updateQuantity, totalPrice } = useCartStore();
  const router = useRouter();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showModal) return;

    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal, onClose]);

  if (!showModal) return null;

  const handleCheckout = () => {
    router.push('/cart');  
    onClose();
  }

  return (
    <>
      {/* Backdrop overlay */}
      <div className='fixed inset-0 backdrop-blur-xs  z-40 lg:hidden' onClick={onClose} />
      
      {/* Modal container */}
      <div className='fixed lg:absolute top-0 lg:top-14 right-0 lg:right-40 bottom-0 lg:bottom-auto z-50 lg:shadow-lg w-full sm:w-6/12 lg:w-auto'>
        <div className="h-full lg:h-auto" ref={modalRef}> 
          <div className="flex flex-col bg-white border-0 lg:border border-gray-200 shadow-2xl lg:shadow-2xs rounded-none lg:rounded-xl h-full lg:h-auto lg:w-96">
            
            {/* Header */}
            <div className="flex justify-between items-center py-4 px-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800 text-xl sm:text-2xl">
                Cart
              </h3>
              <X
                className='text-gray-600 hover:text-gray-950 transition-colors cursor-pointer'
                size={24}
                onClick={onClose}
              />
            </div>
            
            {/* Cart Items */}
            <div className="p-4 overflow-y-auto flex-1 lg:max-h-96">
              <div className="mt-1 text-gray-800">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <div key={item.productId} className='flex flex-row items-center justify-between gap-3 border-b border-gray-200 py-4 last:border-b-0'>
                      
                      {/* Product Image */}
                      <div className='flex-shrink-0'>
                        <Image
                          src={item?.product?.image}
                          alt={item?.product?.name}
                          width={80}
                          height={80}
                          className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded'
                        />
                      </div>
                      
                      {/* Product Details */}
                      <div className='flex flex-col items-start justify-start gap-1 flex-1 min-w-0'>
                        <p className='text-sm font-semibold text-gray-800 truncate w-full'>
                          {item.product?.name}
                        </p>
                        <p className='text-sm font-bold text-gray-700'>
                          ${item?.product?.price}
                        </p>
                        <p className='text-xs text-gray-600'>
                          Qty: {item.quantity}
                        </p>
                        <p className='text-sm font-semibold text-orange-600'>
                          ${(Number(item?.product?.price) * (item.quantity ?? 1)).toFixed(2)}
                        </p>
                      </div>
                      
                      {/* Actions */}
                      <div className='flex flex-col items-end justify-between gap-3 h-full'>
                        <Trash2 
                          onClick={() => removeFromCart(item.productId)}
                          className='cursor-pointer text-gray-400 hover:text-red-600 transition-colors'
                          size={18}
                        />
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                          <Button 
                            className="px-2 py-1 min-w-0 h-7 bg-white hover:bg-gray-100 text-gray-700 rounded-none border-r border-gray-300" 
                            onPress={() => updateQuantity(item.productId, (item.quantity ?? 1) - 1)}
                          >
                            -
                          </Button>
                          <input
                            type="text"
                            value={item.quantity}
                            className="w-10 text-center text-sm bg-white"
                            readOnly
                          />
                          <Button 
                            className="px-2 py-1 min-w-0 h-7 bg-white hover:bg-gray-100 text-gray-700 rounded-none border-l border-gray-300" 
                            onPress={() => addToCart(item.productId, 1)}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='flex flex-col items-center justify-center py-12'>
                    <ShoppingCart className='text-gray-400 w-16 h-16 mb-3' />
                    <div className='text-center text-gray-600'>
                      <p className='font-medium'>Your cart is empty</p>
                      <p className='text-sm mt-1'>Add items to it now</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 py-4 px-4 border-t border-gray-200 bg-gray-50">
              <Button 
                type="button" 
                className="w-full sm:w-auto py-2 px-4 inline-flex items-center justify-center font-medium rounded-lg border-2 text-orange-500 border-orange-500 hover:bg-orange-100 hover:text-orange-600 transition-colors"
                onPress={handleCheckout}
                isDisabled={cart.length === 0}
              >
                Proceed to Checkout
              </Button>
              <div className='font-bold text-gray-800 text-lg'>
                Total: ${Number(totalPrice).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}