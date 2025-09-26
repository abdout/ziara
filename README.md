# E-Commerce Shop - Next.js Application

A modern e-commerce application built with Next.js, migrated from a microservices architecture to a monolithic Next.js app with API routes.

## Tech Stack

- **Framework:** Next.js 15 with App Router
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Clerk
- **Payment:** Stripe
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **UI Components:** Radix UI
- **Type Safety:** TypeScript

## Features

- 🛍️ Product catalog with categories
- 🛒 Shopping cart functionality
- 💳 Stripe payment integration
- 🔐 User authentication with Clerk
- 👤 User and Admin dashboards
- 📊 Order management and analytics
- 🎨 Responsive design

## Prerequisites

- Node.js 18+ and npm/pnpm
- PostgreSQL database
- Clerk account for authentication
- Stripe account for payments

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Environment Setup

Copy the `.env.example` file to `.env.local` and fill in your credentials:

```bash
cp .env .env.local
```

Required environment variables:
- Database URL for PostgreSQL
- Clerk API keys
- Stripe API keys

### 3. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Optional: Open Prisma Studio to view/edit data
npm run prisma:studio
```

### 4. Clerk Configuration

1. Create a Clerk application at [clerk.com](https://clerk.com)
2. Add your Clerk keys to `.env.local`
3. Configure webhook endpoint (optional) for user sync

### 5. Stripe Configuration

1. Get your Stripe keys from [stripe.com](https://stripe.com)
2. Add keys to `.env.local`
3. Set up webhook endpoint for payment confirmations

### 6. Run Development Server

```bash
npm run dev
# Application will be available at http://localhost:3000
```

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes (migrated services)
│   │   ├── products/
│   │   ├── orders/
│   │   ├── payments/
│   │   ├── users/
│   │   └── categories/
│   └── [lang]/       # Internationalized pages
│       ├── (admin)/  # Admin dashboard
│       └── (client)/ # Customer-facing pages
├── components/       # React components
├── lib/             # Utility functions and configurations
├── types/           # TypeScript type definitions
└── stores/          # Zustand state stores
```

## API Routes

The application exposes the following API endpoints:

### Products
- `GET /api/products` - List products with filters
- `POST /api/products` - Create product (Admin)
- `GET /api/products/[id]` - Get product details
- `PUT /api/products/[id]` - Update product (Admin)
- `DELETE /api/products/[id]` - Delete product (Admin)

### Categories
- `GET /api/categories` - List all categories
- `POST /api/categories` - Create category (Admin)

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/chart` - Order analytics (Admin)

### Payments
- `POST /api/payments/create-session` - Create Stripe checkout session
- `POST /api/payments/webhook` - Stripe webhook handler
- `POST /api/payments/verify` - Verify payment session

### Users
- `GET /api/users` - Get user info
- `PUT /api/users/[id]` - Update user (Admin)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run check-types` - TypeScript type checking
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Migration Notes

This application was migrated from a microservices architecture with the following services:
- auth-service → Clerk authentication
- product-service → `/api/products` routes
- order-service → `/api/orders` routes
- payment-service → `/api/payments` routes
- email-service → Can be integrated with webhooks

The Kafka messaging system has been simplified to an optional event emitter for development, but can be re-enabled for production use.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT
