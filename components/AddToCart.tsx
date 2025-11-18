import { Button } from '@heroui/button';
import { ShoppingCart } from 'lucide-react';
import { CartItem } from "@/types/types";
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { ToastContainer,toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AddToCart({ item }: { item: CartItem }) {
    const { addToCart } = useCartStore();
    const {token} = useAuthStore();
    const router = useRouter();

    const handleAddToCart = () => {
        try {
            
            if (!token) {
                toast.error(
                    <div className="cursor-pointer" 
                    //onClick={() => router.push('/signin')}
                      onClick={(e) => {
                        e.stopPropagation(); // stops the event from reaching parent
                        router.push('/signin');
                    }}>
                        Please sign in to add to cart. Click to sign in.
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

            addToCart(item.productId, 1);
            console.log("Added to cart: ", item);
        } catch (err) {
            console.error("Error adding to cart: ", err);
        }
    }

    return (

        <div>
            <Button 
                className="bg-white text-orange-500 hover:bg-orange-50 border-2 border-orange-500 rounded-full px-4 py-1 text-sm font-medium"
                onPress={() => handleAddToCart()}
            >
                  {/* Show text only on large screens */}
  <span className="hidden lg:block ">Add To Cart</span>

  {/* Show icon only on medium and small screens */}
  <ShoppingCart className="block lg:hidden" size={18} />
            </Button>
            <ToastContainer />
        </div>
    )
}

// import { Button } from '@heroui/button'
// import { CartItem} from "@/types/types";
// import { useCartStore } from '@/store/cartStore';
// import { ToastContainer, toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";

// export default function AddToCart({ item }: { item: CartItem }) {
//     const { cart, setCartProducts } = useCartStore();

//     const handleAddToCart = () => {

//         try{
//             // Check if the item is already in the cart
//             const existingItemIndex = cart.findIndex(( cartItem: CartItem ) => cartItem.id === item.id);

//             if (existingItemIndex >= 0) {
//                 const updatedCart = [...cart];
//                 updatedCart[existingItemIndex].quantity = (updatedCart[existingItemIndex].quantity || 1) + 1;
//                 setCartProducts(updatedCart);
//             }
//             else {
//                 setCartProducts([...cart, {
//                     ...item,
//                     quantity: 1,
//                 }]);
//             }

//             toast.success(`${item.name} Added to Cart!`, {
//                 position: "bottom-center",
//                 className: "whitespace-pre-wrap"
//             });
//             console.log("Added to cart: ", item);
//         }
//         catch(err){

//             toast.error("Something's Wrong !", {
//               position: "bottom-center"
//             });

//             console.log(err)
//         }
//     }

//     return (
//         <div>
//             <Button 
//             className="bg-white text-orange-500 hover:bg-orange-50 border-2 border-orange-500 rounded-full px-4 py-1 text-sm font-medium cursor-pointer"
//             onPress={() => handleAddToCart()}
//             >
//                 Add To Cart
//             </Button>
//             <ToastContainer />
//         </div>
//     )
// }