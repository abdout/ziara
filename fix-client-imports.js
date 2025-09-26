const fs = require('fs');
const path = require('path');

// Files to update
const fixes = [
  {
    file: 'src/app/[lang]/(client)/products/page.tsx',
    from: 'import ProductList from "@/components/ProductList";',
    to: 'import ProductList from "@/components/client/ProductList";'
  },
  {
    file: 'src/app/[lang]/(client)/cart/page.tsx',
    from: 'import ShippingForm from "@/components/ShippingForm";',
    to: 'import ShippingForm from "@/components/client/ShippingForm";'
  },
  {
    file: 'src/app/[lang]/(client)/cart/page.tsx',
    from: 'import StripePaymentForm from "@/components/StripePaymentForm";',
    to: 'import StripePaymentForm from "@/components/client/StripePaymentForm";'
  },
  {
    file: 'src/app/[lang]/(client)/products/[id]/page.tsx',
    from: 'import ProductInteraction from "@/components/ProductInteraction";',
    to: 'import ProductInteraction from "@/components/client/ProductInteraction";'
  }
];

fixes.forEach(({ file, from, to }) => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(from, to);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed import in ${file}`);
  } else {
    console.log(`✗ File not found: ${file}`);
  }
});

console.log('\n✅ Import fixes complete!');