import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { startOfMonth, subMonths } from 'date-fns'
// Removed unused import

// GET /api/orders/chart - Get order statistics for admin dashboard
export async function GET(request: NextRequest) {
  try {
    const { userId, sessionClaims } = await auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if user is admin
    const userRole = (sessionClaims as any)?.metadata?.role
    if (userRole !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const now = new Date()
    const sixMonthsAgo = startOfMonth(subMonths(now, 5))

    // Get orders from the last 6 months grouped by month
    const orders = await prisma.order.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo,
          lte: now,
        },
      },
      select: {
        createdAt: true,
        status: true,
      },
    })

    // Process data for chart
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]

    const results: any[] = []
    const monthlyData = new Map<string, { total: number; successful: number }>()

    // Group orders by month
    orders.forEach((order) => {
      const year = order.createdAt.getFullYear()
      const month = order.createdAt.getMonth()
      const key = `${year}-${month}`

      if (!monthlyData.has(key)) {
        monthlyData.set(key, { total: 0, successful: 0 })
      }

      const data = monthlyData.get(key)!
      data.total++
      if (order.status === 'SUCCESS') {
        data.successful++
      }
    })

    // Create results for last 6 months
    for (let i = 5; i >= 0; i--) {
      const d = subMonths(now, i)
      const year = d.getFullYear()
      const month = d.getMonth()
      const key = `${year}-${month}`

      const data = monthlyData.get(key) || { total: 0, successful: 0 }

      results.push({
        month: monthNames[month],
        total: data.total,
        successful: data.successful,
      })
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error fetching order chart data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order chart data' },
      { status: 500 }
    )
  }
}