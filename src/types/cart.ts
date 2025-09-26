import { z } from 'zod'
import { ProductType } from './product'

export interface CartItemType extends ProductType {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface CartStoreStateType {
  cart: CartItemType[]
  hasHydrated: boolean
}

export interface CartStoreActionsType {
  addToCart: (product: CartItemType) => void
  removeFromCart: (product: CartItemType) => void
  clearCart: () => void
}

export interface ShippingFormInputs {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
}

export interface CartItemsType {
  id: number
  name: string
  price: number
  quantity: number
  image?: string
  color?: string
  size?: string
}

export const shippingFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid zip code is required"),
  country: z.string().min(1, "Country is required"),
})