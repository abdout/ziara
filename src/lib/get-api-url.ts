/**
 * Get the API URL for client and server components
 * For server-side rendering, we need to use absolute URLs
 * For client-side, we can use relative URLs
 */
export function getApiUrl(endpoint: string) {
  // On the client side, always use relative URLs
  // This ensures it works with any domain
  if (typeof window !== 'undefined') {
    return endpoint;
  }

  // On the server side, we need absolute URLs
  // But during SSR, we don't have access to the request headers
  // So we'll return a marker that tells us to use client-side fetching

  // For local development
  if (process.env.NODE_ENV === 'development') {
    return `http://localhost:3000${endpoint}`;
  }

  // For production, we'll need to handle this differently
  // Return the endpoint as-is and let Next.js handle it
  return endpoint;
}