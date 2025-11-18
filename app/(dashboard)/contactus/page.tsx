'use client';
import React, { useState } from 'react';
import { Clock, Mail, MapPin, MessageCircleMore, Phone } from 'lucide-react';
import Image from 'next/image';

export default function ContactUs() {
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        category: 'general'
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate form submission
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                category: 'general'
            });
            
            // Clear success message after 5 seconds
            setTimeout(() => setSubmitStatus(''), 5000);
        }, 2000);
    };

    const contactInfo = [
        {
            icon: <MapPin size={24}/>,
            title: 'Visit Our Store',
            details: ['123 Commerce Street', 'Downtown Business District', 'New York, NY 10001'],
            link: 'https://maps.google.com'
        },
        {
            icon: <Phone size={24}/>,
            title: 'Call Us',
            details: ['Main: (555) 123-4567', 'Support: (555) 123-4568', 'Toll Free: 1-800-123-4567'],
            link: 'tel:+15551234567'
        },
        {
            icon: <Mail size={24}/>,
            title: 'Email Us',
            details: ['info@yourstore.com', 'support@yourstore.com', 'sales@yourstore.com'],
            link: 'mailto:info@yourstore.com'
        },
        {
            icon: <Clock size={24}/>,
            title: 'Business Hours',
            details: ['Mon - Fri: 9:00 AM - 8:00 PM', 'Saturday: 10:00 AM - 6:00 PM', 'Sunday: 12:00 PM - 5:00 PM'],
            link: null
        }
    ];

    const faqData = [
        {
            question: 'What are your shipping options?',
            answer: 'We offer standard shipping (5-7 business days), express shipping (2-3 business days), and overnight shipping. Free standard shipping on orders over $50.'
        },
        {
            question: 'What is your return policy?',
            answer: 'We accept returns within 30 days of purchase. Items must be in original condition with tags attached. Return shipping is free for defective items.'
        },
        {
            question: 'Do you offer international shipping?',
            answer: 'Yes, we ship to over 50 countries worldwide. International shipping costs and delivery times vary by destination.'
        },
        {
            question: 'How can I track my order?',
            answer: 'Once your order ships, you\'ll receive an email with tracking information. You can also track orders in your account dashboard.'
        },
        {
            question: 'Do you have a physical store?',
            answer: 'Yes! Visit our flagship store at 123 Commerce Street in downtown. We also have locations in major cities across the country.'
        },
        {
            question: 'What payment methods do you accept?',
            answer: 'We accept all major credit cards, PayPal, Apple Pay, Google Pay, and Buy Now Pay Later options through Klarna and Afterpay.'
        }
    ];

    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div>
            {/* Header */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-6 md:mt-20  text-center">
                    Contact Us
                </h1>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Intro Section */}
                <div className="text-center mb-16">
                    {/* <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2> */}
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Have questions about our products or need assistance? Our friendly customer service team is here to help. 
                        Reach out through any of the channels below or fill out our contact form.
                    </p>
                </div>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {contactInfo.map((info, index) => (
                        <div key={index} className="bg-white p-6 border border-gray-200 hover:border-gray-300 drop-shadow-md hover:scale-105 transition-transform rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="text-orange-500 mr-3">
                                    {info.icon}
                                </div>
                                <h3 className="font-semibold text-gray-900">{info.title}</h3>
                            </div>
                            <div className="space-y-1">
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="text-gray-600 text-sm">
                                        {info.link ? (
                                            <a href={info.link} className="hover:text-orange-500 transition-colors">
                                                {detail}
                                            </a>
                                        ) : (
                                            detail
                                        )}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact Form & Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    {/* Contact Form */}
                    <div className="bg-white p-8 border border-gray-200 hover:border-gray-300 drop-shadow-md rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                        
                        {submitStatus === 'success' && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Thank you! Your message has been sent successfully. We&apos;ll get back to you within 24 hours.
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="(555) 123-4567"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    >
                                        <option value="general">General Inquiry</option>
                                        <option value="support">Technical Support</option>
                                        <option value="sales">Sales Question</option>
                                        <option value="billing">Billing Issue</option>
                                        <option value="returns">Returns & Exchanges</option>
                                        <option value="partnership">Partnership Opportunity</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                    placeholder="Brief description of your inquiry"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                <textarea
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                                    placeholder="Please provide details about your inquiry..."
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                                        </svg>
                                        Sending...
                                    </div>
                                ) : (
                                    'Send Message'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Map/Additional Info */}
                    <div className="space-y-6">
                        {/* Map Placeholder */}

                        <div className="bg-gray-200 h-72 rounded-lg flex items-center justify-center ">
                            <Image src="/location.png" alt="Map" width={300} height={300} className=" w-full h-full object-cover rounded-lg" />
                    
                        </div>

                        {/* Quick Contact */}
                        <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                            <h4 className="font-semibold text-orange-900 mb-4">Need Immediate Help?</h4>
                            <div className="space-y-3">
                                <div className="flex items-center text-orange-800">
                                    <Phone size={20} className="w-5 h-5 mr-3" />
                                    <span>Call us at (555) 123-4567</span>
                                </div>
                                <div className="flex items-center text-orange-800">
                                    <MessageCircleMore size={20} className='w-5 h-5 mr-3' />
                                    <span>Live chat available 9AM-6PM</span>
                                </div>
                                <div className="flex items-center text-orange-800">
                                    <Mail size={20} className='w-5 h-5 mr-3' />
                                    <span>Average email response: 2 hours</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="bg-white p-6 border border-gray-200 hover:border-gray-300 drop-shadow-md transition-transform rounded-lg">
                            <h4 className="font-semibold text-gray-900 mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-blue-700 hover:text-blue-900 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-pink-600 hover:text-pink-800 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.343-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.163-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.001 12.017.001z"/>
                                    </svg>
                                </a>
                                <a href="#" className="text-red-600 hover:text-red-800 transition-colors">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="bg-gray-50 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h3>
                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqData.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm border">
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-medium text-gray-900">{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'transform rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {openFaq === index && (
                                    <div className="px-6 pb-4">
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}