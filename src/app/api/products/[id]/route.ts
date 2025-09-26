import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { producer } from '@/lib/kafka'
// import { auth } from '@clerk/nextjs/server'
import { Prisma } from '@prisma/client'

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update a product (Admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const { userId, sessionClaims } = await auth()
    const userId = 'temp-admin'
    const sessionClaims = { metadata: { role: 'admin' } }
    const { id } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const userRole = (sessionClaims as any)?.metadata?.role
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const data: Prisma.ProductUpdateInput = await request.json()

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data,
    })

    return NextResponse.json(updatedProduct)
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete a product (Admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // const { userId, sessionClaims } = await auth()
    const userId = 'temp-admin'
    const sessionClaims = { metadata: { role: 'admin' } }
    const { id } = await params

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const userRole = (sessionClaims as any)?.metadata?.role
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    })

    // Send event to Kafka
    await producer.send('product.deleted', { value: Number(id) })

    return NextResponse.json(deletedProduct)
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}