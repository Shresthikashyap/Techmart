import React from 'react';
import { Loader } from 'lucide-react';

export default function Loading() {
    return (
        <div className="flex items-center justify-center h-screen bakeground-gray-100">
        {/* <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        <p className="text-gray-500">Loading...</p> */}
            <div className="col-span-full py-20 text-center text-gray-500 flex-grow">
                <Loader className="w-16 h-16 mx-auto mb-4 text-gray-400"/>
                <p className="text-lg font-medium">
                ...Loading
                </p>
            </div>
        </div>
    );
}