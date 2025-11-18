'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <head>
        <title>Something went wrong</title>
      </head>
      <body>
        <div className="text-center mt-20 text-red-500">
          <h2>{error.message || "Something went wrong!"}</h2>
          <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}