'use client'

import { Button } from '@heroui/button'
import { Heart } from 'lucide-react';
import { CartItem } from "@/types/types";
import { useRouter } from 'next/navigation';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AddToWishlist({ item }: { item: CartItem }) {
    const { addToWishlist } = useWishlistStore();
    const {token} = useAuthStore();
    const router = useRouter();

    const handleAddToWishlist = () => {
        try {
            if (!token) {
                toast.error(
                    <div className="cursor-pointer" 
                    //onClick={() => router.push('/signin')}
                      onClick={(e) => {
                        e.stopPropagation(); // stops the event from reaching parent
                        router.push('/signin');
                    }}>
                        Please sign in to add to wishlist. Click to sign in.
                    </div>, 
                    {
                        position: "bottom-center",
                        autoClose: 5000, // 5 seconds
                        closeOnClick: false,
                        pauseOnHover: true,
                        draggable: true,
                    }
                );
                return;
            }  

            if (typeof item.productId === 'number') {
                addToWishlist(item.productId);
                console.log("Added to wishlist: ", item);
            } else {
                toast.error("Failed to add to wishlist"
                ,{
                    position: "bottom-center"
                });
            }
        } catch (err) {
            console.error("Error adding to wishlist: ", err);
        }
    }

    return (

        <div>
            
            <Button
                className="text-red-500 hover:text-red-600 "
                onPress={handleAddToWishlist}
            >
                <Heart
                    className="w-5 h-5 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                />
            </Button>
            <ToastContainer />
        </div>
    )
}