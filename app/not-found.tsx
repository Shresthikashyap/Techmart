'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-[52vh] bg-gray-50">
      <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 text-center">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => router.push('/')}
        className="px-6 py-3 text-orange-500 border-2 border-orange-500 font-semibold rounded-lg hover:bg-orange-500 hover:text-white transition"
      >
        Go Back to Home
      </button>
    </div>
  );
}



// Root Cause: No "type" field in your package.json
// By default, Node assumes CommonJS module type when you don’t explicitly set:

// "type": "module"
// But you're using Next.js with ECMAScript Modules (import/export) in .tsx files — and that mismatch is exactly what’s triggering this:

// Specified module format (CommonJs) is not matching the module format of the source code (EcmaScript Modules)