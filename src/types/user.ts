import { z } from 'zod'

export interface User {
  id: string
  name: string
  email: string
  role: string
}

export interface UserType {
  id: string
  email: string
  name?: string | null
  role: 'USER' | 'ADMIN'
  createdAt: Date | string
  updatedAt: Date | string
}

export const UserFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
})

export interface CustomJwtSessionClaims {
  metadata?: {
    role?: string
  }
  userId?: string
  email?: string
}