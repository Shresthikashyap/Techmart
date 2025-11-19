"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@heroui/button';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [signupFailed, setSignupFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (name ==='' || email === '' || password === '') {
      setSignupFailed(false);
      setErrorMessage('');
    }
  }, [name, email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    setSignupFailed(false);
    setErrorMessage('');
    
    if (password !== confirmPassword) {
      setSignupFailed(true);
      setErrorMessage("Passwords don't match");
      return;
    }

    try {
      setIsLoading(true);
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      // Handle non-JSON responses to prevent parsing errors
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned an unexpected response');
      }
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      console.log('Signup successful:', data);
      setSignupSuccess(true);
      
      // Navigate to signin page after successful registration
      setTimeout(() => {
        router.push('/signin');
      }, 1500);
      
    } catch (error) {
      console.error('Error signing up:', error);
      setSignupFailed(true);
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-8">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        
        <div className="flex flex-col items-center mb-6">
          <Image 
            src="/logo.png" 
            alt="TechMart Logo" 
            width={60} 
            height={60}
            className="mb-3 w-36 h-12"
          />
          <h1 className="text-3xl font-bold text-gray-800">Join TechMart</h1>
          <p className="text-sm text-gray-500 mt-1">Create your account to start shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </Button>

          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account?{' '}
            <Link href="/signin" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>

          {signupSuccess && !signupFailed && (
            <div className="text-green-600 text-sm text-center mt-4">
              You have signed up successfully! Redirecting to sign in...
            </div>
          )}

          {signupFailed && (
            <div className="text-red-600 text-sm text-center mt-4">
              {errorMessage || "Something went wrong!"}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;