/**
 * Get the base URL for API calls in server components
 * This handles different environments correctly:
 * - Production on Vercel: uses VERCEL_URL
 * - Local development: uses NEXT_PUBLIC_APP_URL or localhost
 */
export function getBaseUrl() {
  // If we're on Vercel, use the automatic VERCEL_URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  // Otherwise use the configured app URL or localhost
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}