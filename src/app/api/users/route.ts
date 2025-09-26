import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth, currentUser } from '@clerk/nextjs/server'

// GET /api/users - Get all users (Admin only) or current user
export async function GET(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const all = searchParams.get('all')
    const userRole = (sessionClaims as any)?.metadata?.role

    if (all === 'true') {
      // Check if user is admin
      if (userRole !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
      }

      const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
      })

      return NextResponse.json(users)
    } else {
      // Get current user
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (!user) {
        // If user doesn't exist in our DB, create them
        const clerkUser = await currentUser()
        if (clerkUser) {
          const newUser = await prisma.user.create({
            data: {
              id: clerkUser.id,
              email: clerkUser.emailAddresses[0].emailAddress,
              name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null,
              role: 'USER',
            },
          })
          return NextResponse.json(newUser)
        }
      }

      return NextResponse.json(user)
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

// POST /api/users - Create or update user from Clerk webhook
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // This endpoint should be protected by webhook verification
    // For now, we'll use a simple secret check
    const webhookSecret = request.headers.get('x-webhook-secret')
    if (webhookSecret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id, email, firstName, lastName, role } = data

    const user = await prisma.user.upsert({
      where: { id },
      update: {
        email,
        name: `${firstName || ''} ${lastName || ''}`.trim() || null,
        ...(role && { role }),
      },
      create: {
        id,
        email,
        name: `${firstName || ''} ${lastName || ''}`.trim() || null,
        role: role || 'USER',
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    console.error('Error creating/updating user:', error)
    return NextResponse.json(
      { error: 'Failed to create/update user' },
      { status: 500 }
    )
  }
}