const fs = require('fs');
const path = require('path');

// Function to replace service URLs
function replaceServiceUrls(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Replace product service URL
  if (content.includes('process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL')) {
    content = content.replace(
      /\$\{process\.env\.NEXT_PUBLIC_PRODUCT_SERVICE_URL\}\/products/g,
      '${baseUrl}/api/products'
    );
    content = content.replace(
      /`\$\{process\.env\.NEXT_PUBLIC_PRODUCT_SERVICE_URL\}\/categories/g,
      '`${baseUrl}/api/categories'
    );
    // Add baseUrl declaration if not exists
    if (!content.includes('const baseUrl')) {
      content = content.replace(
        /const fetchData = async/g,
        "const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';\nconst fetchData = async"
      );
      content = content.replace(
        /const getData = async/g,
        "const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';\nconst getData = async"
      );
    }
    modified = true;
  }

  // Replace order service URL
  if (content.includes('process.env.NEXT_PUBLIC_ORDER_SERVICE_URL')) {
    content = content.replace(
      /\$\{process\.env\.NEXT_PUBLIC_ORDER_SERVICE_URL\}/g,
      '${baseUrl}/api'
    );
    if (!content.includes('const baseUrl')) {
      content = content.replace(
        /const fetchData = async/g,
        "const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';\nconst fetchData = async"
      );
    }
    modified = true;
  }

  // Replace payment service URL
  if (content.includes('process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL')) {
    content = content.replace(
      /\$\{process\.env\.NEXT_PUBLIC_PAYMENT_SERVICE_URL\}/g,
      '${baseUrl}/api/payments'
    );
    if (!content.includes('const baseUrl')) {
      content = content.replace(
        /const fetchClientSecret = async/g,
        "const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';\nconst fetchClientSecret = async"
      );
    }
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ Fixed service URLs in ${filePath}`);
  }
}

// Find and fix all files
const files = [
  'src/components/client/StripePaymentForm.tsx',
  'src/components/admin/CardList.tsx',
  'src/components/admin/AddProduct.tsx',
  'src/components/admin/AddCategory.tsx',
  'src/app/[lang]/(client)/return/page.tsx',
  'src/app/[lang]/(admin)/(dashboard)/page.tsx'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    replaceServiceUrls(filePath);
  }
});

console.log('\n✅ Service URL fixes complete!');