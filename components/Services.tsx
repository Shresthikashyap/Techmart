import {StarIcon, TruckIcon, MessageSquareIcon, CreditCard } from 'lucide-react';

export default function Services() {
    return (
        <div className="container mx-auto pt-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-gray-200 hover:border-gray-300 drop-shadow-md hover:scale-105 transition-transform rounded-lg">
                <div className="flex items-center justify-between p-6">
        
                    <div className="grid grid-cols-2 gap-4">
                    <TruckIcon className="w-10 h-10 text-orange-500"/>
                        <div className="grid grid-rows-2 gap-2">
                            <h5 className="font-semibold">World</h5>
                            <p className="text-sm text-gray-600">Shipping</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border border-gray-200 hover:border-gray-300 drop-shadow-md hover:scale-105 transition-transform rounded-lg">
                <div className="flex items-center justify-between p-6">

                    <div className="grid grid-cols-2 gap-4">
                        <StarIcon className="w-10 h-10 text-orange-500"/>
                        <div className="grid grid-rows-2 gap-2">
                            <h5 className="font-semibold">99% Customer</h5>
                            <p className="text-sm text-gray-600">Feedbacks</p>
                        </div>
                    </div>
                
                </div>
            </div>

            <div className="border border-gray-200 hover:border-gray-300 drop-shadow-md hover:scale-105 transition-transform rounded-lg">
                <div className="flex items-center justify-between p-6">

                        <div className="grid grid-cols-2 gap-4">
                            <MessageSquareIcon className="w-10 h-10 text-orange-500" />
                            <div className="grid grid-rows-2 gap-2">
                                <h5 className="font-semibold">24/7 Support</h5>
                                <p className="text-sm text-gray-600">Helpline - 121</p>
                            </div>
                        </div>

                </div>
            </div>

            <div className="border border-gray-200 hover:border-gray-300 drop-shadow-md hover:scale-105 transition-transform rounded-lg">
                <div className="flex items-center justify-between p-6">

                        <div className="grid grid-cols-2 gap-4">
                            <CreditCard className="w-10 h-10 text-orange-500" />
                            <div className="grid grid-rows-2 gap-2">
                                <h5 className="font-semibold">Secure Payment</h5>
                                <p className="text-sm text-gray-600">100% secure payment</p>
                            </div>
                        </div>
                    
                </div>

            </div>
        </div>
        </div>
    )
}