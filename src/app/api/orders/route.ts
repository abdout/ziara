import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { CreateOrderData } from '@/types'

// GET /api/orders - Get orders (user's own or all for admin)
export async function GET(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const limit = searchParams.get('limit')
    const userRole = (sessionClaims as any)?.metadata?.role

    let orders

    if (userRole === 'admin') {
      // Admin can see all orders
      orders = await prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit ? Number(limit) : undefined,
      })
    } else {
      // Regular users can only see their own orders
      orders = await prisma.order.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      })
    }

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data: CreateOrderData = await request.json()

    // Validate required fields
    if (!data.items || data.items.length === 0) {
      return NextResponse.json(
        { error: 'Order must contain items' },
        { status: 400 }
      )
    }

    if (!data.shippingInfo) {
      return NextResponse.json(
        { error: 'Shipping information is required' },
        { status: 400 }
      )
    }

    const order = await prisma.order.create({
      data: {
        userId,
        userEmail: data.userEmail,
        items: data.items as any,
        shippingInfo: data.shippingInfo as any,
        total: data.total,
        paymentIntentId: data.paymentIntentId,
        status: 'PENDING',
      },
    })

    return NextResponse.json(order, { status: 201 })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}