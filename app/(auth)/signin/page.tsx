"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { Button } from '@heroui/button';
import { parseJwt } from '@/utils/parseToken';

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signinFailed, setSigninFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setToken } = useAuthStore();

  useEffect(() => {
    if (email === '' || password === '') {
      setSigninFailed(false);
    }
  }, [email, password]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSigninFailed(false);

    try {
      setIsLoading(true);
      const user = { email, password };
      const response = await axios.post('/api/auth/signin', user);
      console.log('Response:', response);
      const token = response.data.token;
      
      const parsedToken = parseJwt(token);
      
      setToken(token);

      console.log(parsedToken);
      if (parsedToken) {
        router.push('/');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setSigninFailed(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
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
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>

          <div className="text-center text-sm text-gray-600 mt-2">
            <Link href="/forgetpassword" className="text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <p className="text-center text-sm text-gray-600 mt-2">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-indigo-600 hover:underline">
              Sign up
            </Link>
          </p>

          {signinFailed && (
            <div className="text-red-600 text-sm text-center mt-4">
              Invalid email or password. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SigninPage;