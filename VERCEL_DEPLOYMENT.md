# Vercel Deployment Guide

## Environment Variables Required

When deploying to Vercel, you need to set the following environment variables in your Vercel project settings:

### Required Variables

1. **DATABASE_URL**
   - Your PostgreSQL connection string from Neon
   - Example: `postgresql://user:pass@host/database?sslmode=require`

2. **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**
   - Your Clerk publishable key
   - Get from: https://clerk.dev

3. **CLERK_SECRET_KEY**
   - Your Clerk secret key
   - Get from: https://clerk.dev

4. **NEXT_PUBLIC_CLERK_SIGN_IN_URL**
   - Value: `/sign-in`

5. **NEXT_PUBLIC_CLERK_SIGN_UP_URL**
   - Value: `/sign-up`

6. **NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL**
   - Value: `/`

7. **NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL**
   - Value: `/`

### Optional Variables (for full functionality)

8. **STRIPE_SECRET_KEY**
   - Your Stripe secret key for payments
   - Get from: https://stripe.com

9. **STRIPE_WEBHOOK_SECRET**
   - Your Stripe webhook secret
   - Set up webhook at: https://dashboard.stripe.com/webhooks

## Deployment Steps

1. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository

2. **Configure Environment Variables**
   - Go to Project Settings > Environment Variables
   - Add all required variables listed above

3. **Deploy**
   - Vercel will automatically deploy your main branch
   - Future pushes to main will trigger automatic deployments

## Important Notes

- The app automatically uses `VERCEL_URL` for API calls in production
- No need to set `NEXT_PUBLIC_APP_URL` manually - it's handled automatically
- Make sure your Neon database allows connections from Vercel's IP addresses
- Set up Clerk webhook endpoints if using advanced features

## Database Setup

After deployment, you may need to:

1. Run database migrations:
   ```bash
   npx prisma db push
   ```

2. Seed the database with sample data:
   ```bash
   npx prisma db seed
   ```

## Troubleshooting

- If you see "fetch failed" errors, ensure all environment variables are set correctly
- Check Vercel function logs for API route errors
- Verify database connection string includes `?sslmode=require`