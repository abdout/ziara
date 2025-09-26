export interface OrderType {
  id: string
  userId: string
  userEmail: string
  items: any // JSON field containing order items
  shippingInfo: any // JSON field containing shipping information
  paymentIntentId?: string | null
  status: 'PENDING' | 'PROCESSING' | 'SUCCESS' | 'FAILED' | 'CANCELLED' | 'REFUNDED'
  total: number
  createdAt: Date
  updatedAt: Date
}