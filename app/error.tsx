'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center mt-20 text-red-500">
      <h2>{error.message || "Something went wrong!"}</h2>
      <button
        onClick={() => 
            reset() 
            // It attempts to re-render the component tree that threw the error
            // It doesn't refresh the entire page (not a full browser refresh/reload)
            // It tries to recover from the error by re-mounting the components and re-fetching any data
        }
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try Again
      </button>
    </div>
  );
}
