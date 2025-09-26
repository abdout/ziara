# 🌍 Internationalization (i18n) Setup for Arabic & English

Your e-commerce project now has full internationalization support for Arabic and English languages!

## ✅ What Has Been Set Up

### 1. **Core i18n Configuration**
- ✅ Language configuration in `/src/components/local/config.ts`
- ✅ Support for English (en) and Arabic (ar)
- ✅ RTL (Right-to-Left) support for Arabic
- ✅ Language persistence via cookies

### 2. **Translation System**
- ✅ E-commerce specific translations in `en-ecommerce.json` and `ar-ecommerce.json`
- ✅ Dictionary system for loading translations
- ✅ Type-safe translation access

### 3. **Middleware Integration**
- ✅ Automatic locale detection from browser
- ✅ URL-based locale routing (`/en/products`, `/ar/products`)
- ✅ Cookie-based locale persistence
- ✅ Redirect to detected locale

### 4. **UI Components**
- ✅ Language Switcher component with flags
- ✅ RTL-aware layouts
- ✅ Arabic font (Noto Sans Arabic) integration
- ✅ Example NavbarWithI18n component

### 5. **RTL Support**
- ✅ Automatic `dir="rtl"` for Arabic
- ✅ RTL CSS utilities
- ✅ Mirrored layouts for Arabic
- ✅ Proper text alignment

## 📁 File Structure

```
src/components/local/
├── config.ts              # i18n configuration
├── dictionaries.ts        # Dictionary loader
├── use-locale.ts         # React hooks for locale
├── shop-dictionary.ts    # Shop-specific translations
├── en-ecommerce.json     # English translations
├── ar-ecommerce.json     # Arabic translations
├── middleware.ts         # i18n middleware logic
└── README.md            # Documentation

src/components/client/
├── LanguageSwitcher.tsx  # Language selector component
└── NavbarWithI18n.tsx    # Example i18n component

src/app/[lang]/
├── (client)/
│   ├── layout.tsx        # RTL-aware layout
│   └── rtl.css          # RTL styles
└── (admin)/
    └── layout.tsx        # Admin layout with i18n
```

## 🚀 How to Use

### 1. **In Server Components**

```tsx
// app/[lang]/products/page.tsx
import { getShopDictionary } from '@/components/local/shop-dictionary';
import type { Locale } from '@/components/local/config';

export default async function ProductsPage({
  params: { lang }
}: {
  params: { lang: Locale }
}) {
  const dict = getShopDictionary(lang);

  return (
    <div>
      <h1>{dict.products.title}</h1>
      <button>{dict.products.addToCart}</button>
    </div>
  );
}
```

### 2. **In Client Components**

```tsx
'use client';
import { useLocale } from '@/components/local/use-locale';
import { getShopDictionary } from '@/components/local/shop-dictionary';

export default function ProductCard() {
  const { locale, isRTL } = useLocale();
  const dict = getShopDictionary(locale);

  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      <button>{dict.cart.addToCart}</button>
    </div>
  );
}
```

### 3. **Creating Links with Locale**

```tsx
import Link from 'next/link';

// Always include locale in links
<Link href={`/${locale}/products`}>
  {dict.navigation.products}
</Link>
```

### 4. **Using the Language Switcher**

Simply import and use the LanguageSwitcher component:

```tsx
import LanguageSwitcher from '@/components/client/LanguageSwitcher';

export default function Header() {
  return (
    <header>
      <LanguageSwitcher />
    </header>
  );
}
```

## 🎨 RTL Styling Guidelines

### Use Logical Properties
Instead of `left/right`, use logical properties:

```css
/* ❌ Avoid */
.element {
  margin-left: 1rem;
  text-align: left;
}

/* ✅ Use */
.element {
  margin-inline-start: 1rem;
  text-align: start;
}
```

### Tailwind Classes for RTL

```tsx
// Use RTL-aware Tailwind classes
<div className="ms-4 me-2">  // margin-start, margin-end
<div className="ps-6 pe-4">  // padding-start, padding-end
<div className="text-start"> // text alignment
```

## 🔄 URL Structure

Your app now follows this URL structure:
- `/en` - English homepage
- `/ar` - Arabic homepage
- `/en/products` - English products page
- `/ar/products` - Arabic products page
- `/en/admin` - English admin dashboard
- `/ar/admin` - Arabic admin dashboard

## 📝 Translation Structure

Each translation file contains:

```json
{
  "common": {
    "shop": "Shop",
    "cart": "Cart",
    // Common terms
  },
  "navigation": {
    "home": "Home",
    "products": "Products",
    // Navigation items
  },
  "products": {
    "title": "Products",
    "addToCart": "Add to Cart",
    // Product-related translations
  },
  // ... more sections
}
```

## 🔧 Adding New Translations

1. Add the translation key to both `en-ecommerce.json` and `ar-ecommerce.json`
2. Access it using the dictionary:
   ```tsx
   const dict = getShopDictionary(locale);
   const translation = dict.section.key;
   ```

## 🌐 Browser Language Detection

The app automatically detects the user's preferred language from:
1. Previously saved cookie
2. Browser's Accept-Language header
3. Falls back to English if no preference found

## 📱 Mobile Considerations

- Language switcher is responsive
- RTL layouts work on all screen sizes
- Arabic font loads only when needed

## ⚡ Performance

- Translations are loaded on the server
- No client-side translation loading
- Static generation works with i18n
- Efficient caching of translations

## 🔍 SEO

Each page now has locale-specific metadata:
- Proper `lang` attribute on HTML
- Locale-specific titles and descriptions
- Correct `dir` attribute for RTL languages

## 🎯 Next Steps to Complete Integration

1. **Update all components** to use translations instead of hardcoded text
2. **Update API responses** to include locale-aware content if needed
3. **Add locale-specific images** if required (e.g., banners with text)
4. **Test RTL layouts** thoroughly
5. **Add more languages** if needed (follow the same pattern)

## 🤝 Tips

- Always pass `locale` to components that need translations
- Use the `useLocale` hook in client components
- Remember to update both language files when adding new text
- Test both LTR and RTL layouts when making UI changes
- Use logical CSS properties for better RTL support

Your internationalization setup is ready to use! The app will now automatically redirect users to their preferred language and display all content in the selected language with proper RTL support for Arabic.