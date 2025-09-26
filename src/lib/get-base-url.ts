/**
 * Get the base URL for API calls in server components
 * This handles different environments correctly:
 * - Production with custom domain: uses NEXT_PUBLIC_APP_URL
 * - Production on Vercel: uses VERCEL_URL
 * - Local development: uses localhost
 */
export function getBaseUrl() {
  // In production with custom domain, use the configured URL
  if (process.env.NEXT_PUBLIC_APP_URL && process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  // If we're on Vercel without custom domain, use the automatic VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Local development
  return 'http://localhost:3000';
}