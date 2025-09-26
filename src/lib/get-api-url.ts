/**
 * Get the API URL for client and server components
 * Handles all environments correctly without needing configuration
 */
export function getApiUrl(endpoint: string) {
  // On the client side, use relative URLs
  // This will automatically use the current domain
  if (typeof window !== 'undefined') {
    return endpoint;
  }

  // On the server side during SSR/SSG
  // Check if we have a custom domain configured
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${endpoint}`;
  }

  // Fallback to VERCEL_URL (preview deployments)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}${endpoint}`;
  }

  // Local development
  return `http://localhost:3000${endpoint}`;
}