'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Product page error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <h2 className="text-2xl font-semibold">Something went wrong!</h2>
      <p className="text-gray-600">Unable to load this product.</p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
        >
          Try again
        </button>
        <Link
          href="/products"
          className="px-4 py-2 bg-gray-100 text-black rounded-md hover:bg-gray-200"
        >
          Back to products
        </Link>
      </div>
    </div>
  );
}