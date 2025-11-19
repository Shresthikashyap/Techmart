"use client";

import Image from 'next/image';
import { Button } from '@heroui/button';
import { 
    Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Copyright 
} from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="container mx-auto px-4 lg:px-16">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Company Info */}
                    <div className="flex flex-col gap-4 col-span-1 md:col-span-2 lg:col-span-1">
                        <Image 
                            src="/logo.png" 
                            alt="logo" 
                            width={180} 
                            height={60} 
                            className='w-40 h-auto mb-2' 
                            priority
                        />
                        <div className='space-y-3'>
                            <div className='flex items-center gap-3'>
                                <Phone width={18} height={18} className='text-gray-400 flex-shrink-0'/>
                                <p className="text-gray-600 text-sm">+1 234 567 890</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <Mail width={18} height={18} className='text-gray-400 flex-shrink-0'/>
                                <p className="text-gray-600 text-sm">info@techmart.com</p>
                            </div>
                            <div className='flex items-start gap-3'>
                                <MapPin width={18} height={18} className='text-gray-400 flex-shrink-0 mt-0.5'/>
                                <p className="text-gray-600 text-sm">One way Ave 31, NYC, USA</p>
                            </div>
                        </div>
                    </div>

                    {/* How to Buy */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">How to Buy</h3>
                        <div className="space-y-2">
                            <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Making Payment</p>
                            <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Delivery Options</p>
                            <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Buyer Protection</p>
                            <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Return Policy</p>
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Service</h3>
                        <div className="space-y-2">
                            <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Help Center</p>
                            <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Track Your Order</p>
                            <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Customer Support</p>
                            <p className="text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors">Live Chat</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='flex flex-col gap-3'>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Quick Links</h3>
                        <div className="space-y-2">
                            <p className='text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors'>Contact Us</p>
                            <p className='text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors'>Blog</p>
                            <p className='text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors'>FAQ</p>
                            <p className='text-gray-600 text-sm hover:text-gray-800 cursor-pointer transition-colors'>About Us</p>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className='flex flex-col items-center text-center mb-12 px-4'>
                    <h2 className='font-bold text-xl lg:text-2xl mb-6 text-gray-800'>Subscribe to our newsletter</h2>
                    
                    <div className='flex flex-col sm:flex-row items-center w-full max-w-md gap-3 sm:gap-0'>
                        <input
                            type='email'
                            placeholder='Enter your email'
                            className='w-full sm:flex-1 px-6 py-1.5 rounded-full sm:rounded-l-full sm:rounded-r-none border border-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center sm:text-left'
                        />
                        <Button className='w-full sm:w-auto px-8 py-3 rounded-full sm:rounded-l-none sm:rounded-r-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-colors'>
                            Subscribe
                        </Button>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className='border-t border-gray-200'>
                    <div className='flex flex-col lg:flex-row justify-between items-center gap-6'>
                        {/* Social Media Icons */}
                        <div className='flex gap-6 order-2 lg:order-1'>
                            <Facebook className='w-5 h-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors'/>
                            <Instagram className='w-5 h-5 text-gray-400 hover:text-pink-600 cursor-pointer transition-colors'/>
                            <Twitter className='w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors'/>
                            <Youtube className='w-5 h-5 text-gray-400 hover:text-red-600 cursor-pointer transition-colors'/>
                        </div>

                        {/* Language and Copyright */}
                        <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-8 order-1 lg:order-2'>
                            <select className='text-gray-600 text-sm bg-transparent border-none focus:outline-none cursor-pointer'>
                                <option>English</option>
                                <option>Spanish</option>
                                <option>French</option>
                            </select>
                            <div className='flex items-center gap-2'>
                                <Copyright className='h-4 w-4 text-gray-500'/>
                                <p className='text-gray-500 text-sm'>2025 TechMart. All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}