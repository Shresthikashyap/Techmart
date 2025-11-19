import { Diff } from "lucide-react"
import { Button } from "@heroui/button"
import { useRouter } from "next/navigation";  
import { useAuthStore } from '@/store/authStore';
import { useCompareStore } from "@/store/compareProductStore";
import { ComparisonItem } from "@/types/types";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function AddToCompare({item}: {item: ComparisonItem }){

    const { addToCompare} = useCompareStore();
    const {token} = useAuthStore();
    const router = useRouter();

    const handleAddToCompare = () => {

      try{

        if (!token) {
          //console.error("User is not logged in. Cannot add to compare.");
          <div className="cursor-pointer" 
                      //onClick={() => router.push('/signin')}
              onClick={(e) => {
                e.stopPropagation(); // stops the event from reaching parent
                router.push('/signin');
            }}>
            Please sign in to add to compare. Click to sign in.
          </div>
          toast.error("Please sign in to add to compare", {
            position: "bottom-center",
            autoClose: 5000,
            pauseOnHover: true,
            draggable: true,
          });
          return;
        }
          if (typeof item.productId === "number") {
            addToCompare(item.productId);
          } else {
            toast.error("Failed to add to compare.", {
              position: "bottom-center",
              autoClose: 5000,
              pauseOnHover: true,
              draggable: true,
            });
            return;
          }
      }
      catch(err){
        console.log(err, 'error in adding to compare');
        toast.error("Something Went Wrong !", {
          position: "bottom-center"
        });
      }
    }

    return(
      <div>
        <Button 
        className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
        onPress={handleAddToCompare}
        >
          <Diff className="w-5 h-5" />
        </Button>
        <ToastContainer />
      </div>
      
    )
}