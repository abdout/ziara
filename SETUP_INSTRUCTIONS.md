# Setup Instructions for E-Commerce Shop

## ✅ Migration Status

The microservices monorepo has been successfully refactored into a unified Next.js application. All services have been converted to API routes and the application is ready to run.

## 📋 Quick Setup

### 1. Install Dependencies

```bash
# Remove any existing node_modules and lock files
rm -rf node_modules package-lock.json

# Install dependencies
npm install
```

If you encounter dependency conflicts, use:
```bash
npm install --legacy-peer-deps
```

### 2. Environment Configuration

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/shop_db?schema=public"

# Clerk Authentication (Required)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Stripe Payment (Required)
STRIPE_SECRET_KEY=sk_test_your_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional webhook secret for user sync
WEBHOOK_SECRET=your_webhook_secret_here
```

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init

# (Optional) Open Prisma Studio to manage data
npx prisma studio
```

### 4. Run the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🏗️ What Was Migrated

### API Routes Created
- ✅ `/api/products` - Product CRUD operations
- ✅ `/api/categories` - Category management
- ✅ `/api/orders` - Order processing
- ✅ `/api/orders/chart` - Order analytics
- ✅ `/api/payments/create-session` - Stripe checkout
- ✅ `/api/payments/webhook` - Payment webhooks
- ✅ `/api/payments/verify` - Payment verification
- ✅ `/api/users` - User management

### Database Schema
- ✅ Unified Prisma schema with Product, Category, Order, and User models
- ✅ PostgreSQL database configuration
- ✅ Type-safe database queries

### Authentication
- ✅ Clerk authentication integrated
- ✅ Protected routes for admin and users
- ✅ Role-based access control

### Frontend Components
- ✅ Product listing and detail pages
- ✅ Shopping cart with Zustand
- ✅ Checkout flow with Stripe
- ✅ Admin dashboard
- ✅ Order management

### Type System
- ✅ Complete TypeScript types for all entities
- ✅ Form validation schemas with Zod
- ✅ Type-safe API calls

## 🚀 Key Features

- **Product Management**: Browse, search, and filter products
- **Shopping Cart**: Add/remove items, persist cart state
- **Checkout**: Integrated Stripe payment flow
- **Order Tracking**: View order history and status
- **Admin Dashboard**: Manage products, categories, and orders
- **Authentication**: Secure user authentication with Clerk
- **Responsive Design**: Works on desktop and mobile

## 📝 Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Type checking
npm run check-types

# Linting
npm run lint

# Database migrations
npm run prisma:migrate

# Database studio
npm run prisma:studio
```

## 🔧 Troubleshooting

### Dependency Issues
If you encounter dependency conflicts:
```bash
npm install --legacy-peer-deps
```

### Database Connection
Ensure PostgreSQL is running and the DATABASE_URL is correct.

### Clerk Authentication
1. Sign up at [clerk.com](https://clerk.com)
2. Create a new application
3. Copy your API keys to `.env.local`

### Stripe Integration
1. Get test keys from [stripe.com/dashboard](https://stripe.com/dashboard)
2. Add keys to `.env.local`
3. Set up webhook endpoint for local testing using Stripe CLI

## 📁 Project Structure

```
src/
├── app/
│   ├── api/              # API routes (migrated microservices)
│   │   ├── products/     # Product service endpoints
│   │   ├── categories/   # Category management
│   │   ├── orders/       # Order processing
│   │   ├── payments/     # Payment handling
│   │   └── users/        # User management
│   └── [lang]/
│       ├── (admin)/      # Admin dashboard pages
│       └── (client)/     # Customer-facing pages
├── components/           # React components
│   ├── admin/           # Admin UI components
│   └── client/          # Client UI components
├── lib/                 # Utilities and configurations
│   ├── prisma.ts        # Database client
│   └── kafka.ts         # Event system (mock)
├── types/               # TypeScript definitions
│   ├── cart.ts
│   ├── order.ts
│   ├── product.ts
│   └── user.ts
└── stores/              # Zustand state management
    └── cartStore.ts     # Shopping cart state
```

## ✨ Next Steps

1. **Set up Clerk**: Create an account and add your API keys
2. **Set up Stripe**: Get test keys and configure webhooks
3. **Create database**: Set up PostgreSQL and run migrations
4. **Add sample data**: Use Prisma Studio or create seed data
5. **Test the application**: Run the dev server and test all features

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)

## 🤝 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all environment variables are set
3. Verify database connection
4. Check that all dependencies are installed

The migration from microservices to a unified Next.js app is complete and ready for development!