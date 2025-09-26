import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  console.log('[API/test] GET request received');

  return NextResponse.json({
    message: 'API is working',
    timestamp: new Date().toISOString(),
    headers: Object.fromEntries(request.headers.entries()),
    env: {
      hasDatabase: !!process.env.DATABASE_URL,
      hasClerkKey: !!process.env.CLERK_SECRET_KEY,
      nodeEnv: process.env.NODE_ENV,
    }
  });
}