import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { producer } from '@/lib/kafka'
import { StripeProductType } from '@/types'
import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

// GET /api/products - Get all products with optional filters
export async function GET(request: NextRequest) {
  console.log('[API/products] GET request received');
  console.log('[API/products] Headers:', Object.fromEntries(request.headers.entries()));

  try {
    const searchParams = request.nextUrl.searchParams
    const sort = searchParams.get('sort')
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const limit = searchParams.get('limit')

    const orderBy = (() => {
      switch (sort) {
        case 'asc':
          return { price: Prisma.SortOrder.asc }
        case 'desc':
          return { price: Prisma.SortOrder.desc }
        case 'oldest':
          return { createdAt: Prisma.SortOrder.asc }
        default:
          return { createdAt: Prisma.SortOrder.desc }
      }
    })()

    const products = await prisma.product.findMany({
      where: {
        ...(category && {
          category: {
            slug: category,
          },
        }),
        ...(search && {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        }),
      },
      orderBy,
      take: limit ? Number(limit) : undefined,
      include: {
        category: true,
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product (Admin only)
export async function POST(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin (you may need to adjust this based on your Clerk setup)
    const userRole = (sessionClaims as any)?.metadata?.role
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data = await request.json()
    const { colors, images } = data

    if (!colors || !Array.isArray(colors) || colors.length === 0) {
      return NextResponse.json(
        { error: 'Colors array is required!' },
        { status: 400 }
      )
    }

    if (!images || typeof images !== 'object') {
      return NextResponse.json(
        { error: 'Images object is required!' },
        { status: 400 }
      )
    }

    const missingColors = colors.filter((color: string) => !(color in images))

    if (missingColors.length > 0) {
      return NextResponse.json(
        { error: 'Missing images for colors!', missingColors },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({ data })

    // Send event to Kafka (or mock Kafka)
    const stripeProduct: StripeProductType = {
      id: product.id.toString(),
      name: product.name,
      price: product.price,
    }

    await producer.send('product.created', { value: stripeProduct })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}