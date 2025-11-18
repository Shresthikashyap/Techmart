"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { CircleX, ChevronRight, Loader, PackageX } from "lucide-react";
import { Button } from "@heroui/button";
import { useProductStore } from '@/store/productStore'
import { useCartStore } from "@/store/cartStore";
import { CartItem } from "@/types/types";
import { useRouter, usePathname } from "next/navigation";
import Products from "@/components/Products";
import { toast } from 'react-toastify'
import slugify from "slugify";

const steps = [
  { value: 1, label: "CHECK OUT" },
  { value: 2, label: "SHIPPING INFORMATION" },
  { value: 3, label: "PAYMENT" },
];

interface ShippingInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function Cart() {
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { fetchProducts, products, error, isLoading } = useProductStore();
  const router = useRouter();
  const pathname = usePathname();

  const { cart, fetchCart, addToCart,removeFromCart, clearCart, totalPrice } = useCartStore();

      useEffect(() => {
        fetchCart();
        fetchProducts();  
    }, [fetchCart, fetchProducts]);

  // Validation functions
  const validateStep1 = (): boolean => {
    if (cart.length === 0) {
      toast.error('Your cart is empty. Add some items to proceed.', {
        position: "bottom-center"
      });
      return false;
    }
    return true;
  };

  const validateStep2 = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!shippingInfo.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!shippingInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!shippingInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,}$/.test(shippingInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (at least 10 digits)';
    }

    if (!shippingInfo.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error('Please fill in all required shipping information', {
        position: "bottom-center"
      });
      return false;
    }

    return true;
  };

  const validateStep3 = (): boolean => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method', {
        position: "bottom-center"
      });
      return false;
    }
    return true;
  };

  const handleStepChange = (value: number) => {
    // Handle order completion
    if (value === 0) {
      if (validateStep3()) {
        clearCart();
        setShippingInfo({ name: '', email: '', phone: '', address: '' });
        setSelectedPaymentMethod('');
        toast.success(`Congratulations! Your order has been placed successfully.`, {
          position: "bottom-center",
          className: "whitespace-pre-wrap"
        });
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }
      return;
    }

    // Prevent moving to next step without validation
    if (value > (activeStep || 1)) {
      let canProceed = false;

      if (activeStep === 1 && value === 2) {
        canProceed = validateStep1();
      } else if (activeStep === 2 && value === 3) {
        canProceed = validateStep2();
      }

      if (!canProceed) {
        return;
      }
    }

    // Allow moving to previous steps without validation
    setActiveStep(value);
    setErrors({}); // Clear errors when changing steps
  };

  const handleShippingInfoChange = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };

  const handleNextStep = () => {
    if (activeStep && activeStep < 3) {
      handleStepChange(activeStep + 1);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-gray-100 text-orange-400 font-semibold text-4xl py-5">
        <div>Cart</div>
        <div className="flex flex-row gap-2 mt-2 text-gray-400 text-[20px]">
          <p onClick={() => router.push('/')} className="hover:text-gray-600 cursor-pointer">Home</p>
          <p className="hover:text-gray-600">{pathname
            .replace(/\//g, "  > ")
            .replace(/\b\w/g, (char) => char.toUpperCase())}</p>
        </div>
      </div>

      <div className="container mx-auto p-5 mb-16 w-7xl">
        {/* Navigation */}
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row justify-center items-center w-full">
            {steps.map((step) => (
              <div
                key={step.value}
                onClick={() => handleStepChange(step.value)}
                className={`flex-1 text-center px-5 py-3 font-medium text-base text-black cursor-pointer
              ${
                activeStep === step.value
                  ? `bg-white text-orange-300 border border-gray-200`
                  : `bg-gray-100 hover:bg-gray-300 border border-gray-200`
              } `}
              >
                {step.label}
              </div>
            ))}
          </div>

          <div className="w-full">
            {activeStep === 1 && (
              <div className="border border-gray-200 rounded-md ">
                <div className="p-4 overflow-y-auto max-h-96 cursor-default-hover px-6">
                  {cart.length > 0 ? (cart.map((cartItem: CartItem,index:number) => (
                    <div
                      key={cartItem.cartItemId}
                      className="py-4"
                    >
                      <div className={`${index === cart.length - 1?'':'border-b border-b-gray-300 pb-6'}`}>
                        <div className="flex flex-row justify-between items-center space-x-16">
                          <div 
                            className="w-35 h-27 relative mr-4 font-semibold cursor-pointer"
                            onClick={() =>
                              router.push(
                                `/product/${slugify(cartItem.product.name, { lower: true })}`
                              )
                            }
                          >
                            <Image
                              src={cartItem?.product?.image}
                              alt={cartItem?.product?.name}
                              fill
                              className="object-contain bg-gray-100 rounded p-2"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                              priority
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium">{cartItem?.product?.name}</h3>
                            <p className="text-sm text-red-400 font-semibold">
                              {cartItem?.product?.inStock?"In Stock": "Out of stock"}
                            </p>
                            
                          </div>
                          <div className="flex items-center space-x-8">
                            <div className="font-bold text-gray-400">
                              $ {cartItem?.product?.price}
                            </div>
                            <div className="flex items-center border rounded w-24 h-8">
                              <Button
                                className="px-2 py-1"
                                onPress={() => removeFromCart(cartItem.productId)}
                              >
                                -
                              </Button>
                              <input
                                type="text"
                                value={cartItem.quantity}
                                className="w-12 text-center"
                                readOnly
                              />
                              <Button
                                className="px-2 py-1"
                                onPress={() => addToCart(cartItem.productId, 1)}
                              >
                                +
                              </Button>
                            </div>
                            <div className="font-bold text-red-600">
                              ${" "}
                              {(
                                (cartItem.quantity ?? 1) * Number(cartItem?.product?.price)
                              ).toFixed(2)}
                            </div>
                          </div>
                          <CircleX
                            className="text-gray-400 w-8 h-8 cursor-pointer"
                            onClick={() => removeFromCart(cartItem.productId)}
                          />
                        </div>
                      </div>
                    </div>
                  )))
                  :(
                    <div className="flex flex-col items-center text-gray-500 my-25">
                      <PackageX className="w-12 h-12 mb-2" />
                      <p className="text-lg">No products available</p>
                    </div>
                  )
                  }
                </div>
                <div className="px-4">
                  <div className="flex flex-col items-center mb-2 mt-3 border-t border-t-gray-200 pt-4">
                    <div className="flex justify-between mb-8">
                      <p className="text-gray-500 w-1/2 font-semibold">
                        Odit optio, ad qui quaerat, vel atque blanditiis nobis
                        tenetur, amet facilis quis laboriosam reiciendis dolor
                        veritatis.
                      </p>

                      <div className="flex justify-between ml-49">
                        <span className="font-medium mr-8">Total value:</span>
                        <span className="font-bold text-red-600">
                          $ {totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-8">
                      <p className="font-semibold ">NEXT STEP</p>
                      <ChevronRight
                        className="text-red-600 text-sm font-semibold cursor-pointer"
                        onClick={handleNextStep}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 2 && (
              <div className="bg-white p-6 rounded-md shadow-sm">
                <h2 className="font-semibold text-xl text-black mb-4">
                  Shipping Information
                </h2>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.name}
                        onChange={(e) => handleShippingInfoChange('name', e.target.value)}
                        className={`w-full p-2 border rounded ${
                          errors.name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your full name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => handleShippingInfoChange('email', e.target.value)}
                        className={`w-full p-2 border rounded ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email address"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleShippingInfoChange('phone', e.target.value)}
                        className={`w-full p-2 border rounded ${
                          errors.phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-700">
                        Address *
                      </label>
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => handleShippingInfoChange('address', e.target.value)}
                        className={`w-full p-2 border rounded ${
                          errors.address ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your shipping address"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 mt-6">
                    <Button
                      className="cursor-pointer border border-amber-600 hover:bg-amber-600 px-4 py-2 text-center rounded-md"
                      onPress={() => handleStepChange(1)}
                    >
                      Back
                    </Button>

                    <Button
                      className="cursor-pointer border border-amber-600 hover:bg-amber-600 px-4 py-2 text-center rounded-md"
                      onPress={handleNextStep}
                    >
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {activeStep === 3 && (
              <div className="bg-white p-6 rounded-md shadow-sm">
                <h2 className="text-xl font-semibold text-black mb-4">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  <div className={`border rounded p-3 cursor-pointer transition-colors ${
                    selectedPaymentMethod === 'credit-card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodChange('credit-card')}>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={selectedPaymentMethod === 'credit-card'}
                        onChange={() => handlePaymentMethodChange('credit-card')}
                      />
                      <label className="cursor-pointer">Credit Card</label>
                    </div>
                  </div>

                  <div className={`border rounded p-3 cursor-pointer transition-colors ${
                    selectedPaymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                  onClick={() => handlePaymentMethodChange('paypal')}>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="radio" 
                        name="payment" 
                        checked={selectedPaymentMethod === 'paypal'}
                        onChange={() => handlePaymentMethodChange('paypal')}
                      />
                      <label className="cursor-pointer">PayPal</label>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Subtotal:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Shipping:</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-lg">Total:</span>
                        <span className="font-bold text-lg text-red-600">${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3">
                    <Button
                      className="cursor-pointer border border-amber-600 hover:bg-amber-600 px-4 py-2 rounded-md"
                      onPress={() => handleStepChange(2)}
                    >
                      Back
                    </Button>

                    <Button
                      className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700"
                      onPress={() => handleStepChange(0)}
                    >
                      Place Order
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-16">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-2xl">
              Customers who bought items in your cart also bought
            </h3>
            <p
              className="text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
              onClick={() => router.push("/all-products")}
            >
              View All
            </p>
          </div>

            {products.length>0 &&
                <Products products={products} limit={4}/>
            }
            {isLoading && (
              <div className="col-span-full py-20 text-center text-gray-500">
                <Loader className="w-8 h-8 mx-auto mb-4 text-gray-400"/>
                <p className="text-lg font-medium">
                  ...Loading
                </p>
              </div>
             )}

             {error && (
              <div className="flex flex-col items-center text-gray-500 mt-10">
                <PackageX className="w-12 h-12 mb-2" />
                <p className="text-lg">No products available</p>
              </div>
             )}
          
        </div>

      </div>
      
    </div>
  );
}