const fs = require('fs');
const path = require('path');

// Files to update
const files = [
  'src/app/[lang]/(admin)/(dashboard)/orders/columns.tsx',
  'src/app/[lang]/(admin)/(dashboard)/orders/page.tsx',
  'src/app/[lang]/(admin)/(dashboard)/products/columns.tsx',
  'src/app/[lang]/(admin)/(dashboard)/products/page.tsx',
  'src/app/[lang]/(client)/cart/page.tsx',
  'src/app/[lang]/(client)/orders/page.tsx',
  'src/app/[lang]/(client)/products/[id]/page.tsx',
  'src/components/admin/AddCategory.tsx',
  'src/components/admin/AddProduct.tsx',
  'src/components/admin/AddUser.tsx',
  'src/components/admin/AppBarChart.tsx',
  'src/components/admin/CardList.tsx',
  'src/components/client/CheckoutForm.tsx',
  'src/components/client/ShippingForm.tsx',
  'src/components/client/StripePaymentForm.tsx',
  'src/components/order-service/middleware/authMiddleware.ts',
  'src/components/order-service/routes/order.ts',
  'src/components/order-service/utils/order.ts',
  'src/components/payment-service/middleware/authMiddleware.ts',
  'src/components/payment-service/routes/session.route.ts',
  'src/components/payment-service/utils/stripeProduct.ts',
  'src/components/product-service/controllers/product.controller.ts',
  'src/components/product-service/middleware/authMiddleware.ts',
  'src/middleware/authMiddleware.ts',
  'src/middleware.ts',
  'src/routes/order.ts',
  'src/utils/order.ts'
];

// Import replacements
const replacements = [
  { from: /@repo\/types/g, to: '@/types' },
  { from: /@repo\/product-db/g, to: '@/lib/prisma' },
  { from: /@repo\/order-db/g, to: '@/lib/prisma' },
  { from: /@repo\/kafka/g, to: '@/lib/kafka' },
  { from: /import\s+{\s*prisma,\s*Prisma\s*}\s+from\s+["']@\/lib\/prisma["'];?/g, to: "import prisma from '@/lib/prisma';\nimport { Prisma } from '@prisma/client';" },
  { from: /import\s+{\s*Prisma,\s*prisma\s*}\s+from\s+["']@\/lib\/prisma["'];?/g, to: "import prisma from '@/lib/prisma';\nimport { Prisma } from '@prisma/client';" },
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);

  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    replacements.forEach(({ from, to }) => {
      content = content.replace(from, to);
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed imports in ${file}`);
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});

console.log('\n✅ Import fixes complete!');