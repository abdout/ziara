import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Clothing',
        slug: 'clothing',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Accessories',
        slug: 'accessories',
      },
    }),
  ])

  console.log('Created categories:', categories)

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        name: 'Classic T-Shirt',
        shortDescription: 'Comfortable cotton t-shirt',
        description: 'A classic comfortable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton.',
        price: 29.99,
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['black', 'white', 'gray', 'navy'],
        images: {
          black: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
            'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=500',
          ],
          white: [
            'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=500',
            'https://images.unsplash.com/photo-1622445275463-afa2ab738c34?w=500',
          ],
          gray: [
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
          ],
          navy: [
            'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500',
          ],
        },
        categorySlug: 'clothing',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Wireless Headphones',
        shortDescription: 'Premium noise-cancelling headphones',
        description: 'Experience premium sound quality with active noise cancellation. Battery life up to 30 hours.',
        price: 199.99,
        sizes: ['One Size'],
        colors: ['black', 'white', 'blue'],
        images: {
          black: [
            'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
          ],
          white: [
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
          ],
          blue: [
            'https://images.unsplash.com/photo-1545127398-14699f92334b?w=500',
          ],
        },
        categorySlug: 'electronics',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Leather Wallet',
        shortDescription: 'Genuine leather bifold wallet',
        description: 'Handcrafted genuine leather wallet with multiple card slots and bill compartments.',
        price: 49.99,
        sizes: ['One Size'],
        colors: ['brown', 'black'],
        images: {
          brown: [
            'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500',
          ],
          black: [
            'https://images.unsplash.com/photo-1624823629396-d0c4e2b87e75?w=500',
          ],
        },
        categorySlug: 'accessories',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Running Shoes',
        shortDescription: 'Lightweight athletic running shoes',
        description: 'Professional running shoes with advanced cushioning technology for maximum comfort.',
        price: 89.99,
        sizes: ['7', '8', '9', '10', '11'],
        colors: ['black', 'white', 'red'],
        images: {
          black: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          ],
          white: [
            'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
          ],
          red: [
            'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
          ],
        },
        categorySlug: 'clothing',
      },
    }),
    prisma.product.create({
      data: {
        name: 'Smart Watch',
        shortDescription: 'Fitness tracker with heart rate monitor',
        description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.',
        price: 299.99,
        sizes: ['One Size'],
        colors: ['black', 'silver'],
        images: {
          black: [
            'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
          ],
          silver: [
            'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
          ],
        },
        categorySlug: 'electronics',
      },
    }),
  ])

  console.log('Created products:', products.length, 'products')

  // Create a test user (Note: In production, users would be created via Clerk)
  const user = await prisma.user.create({
    data: {
      id: 'test-user-1',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
    },
  })

  console.log('Created test user:', user)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })