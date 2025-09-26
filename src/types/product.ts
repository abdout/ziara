import { z } from 'zod'

export interface ProductType {
  id: number
  name: string
  shortDescription: string
  description: string
  price: number
  sizes: string[]
  colors: string[]
  images: Record<string, string[]>
  categorySlug: string
  createdAt: string | Date
  updatedAt: string | Date
  category?: CategoryType
}

export interface ProductsType {
  products: ProductType[]
  total?: number
}

export interface CategoryType {
  id: number
  name: string
  slug: string
  products?: ProductType[]
}

// Form validation schemas
export const ProductFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  shortDescription: z.string().min(1, "Short description is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be positive"),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  images: z.record(z.string(), z.array(z.string())),
  categorySlug: z.string().min(1, "Category is required"),
})

export const CategoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens only"),
})

// Constants
export const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'] as const
export const colors = [
  'black',
  'white',
  'gray',
  'red',
  'blue',
  'green',
  'yellow',
  'orange',
  'purple',
  'pink',
  'brown',
  'navy',
] as const

export type SizeType = typeof sizes[number]
export type ColorType = typeof colors[number]