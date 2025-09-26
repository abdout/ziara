// Re-export all types for convenience
export * from './cart'
export * from './order'
export * from './product'
export * from './user'

// Common types used across the application
export interface StripeProductType {
  id: string
  name: string
  price: number
}

export interface OrderItem {
  productId: number
  name: string
  price: number
  quantity: number
  color?: string
  size?: string
  image?: string
}

export interface CreateOrderData {
  userId: string
  userEmail: string
  items: OrderItem[]
  shippingInfo: ShippingInfo
  total: number
  paymentIntentId?: string
}

// Re-export ShippingInfo from cart.ts
export type ShippingInfo = import('./cart').ShippingFormInputs