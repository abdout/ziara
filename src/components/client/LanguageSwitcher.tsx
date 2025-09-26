'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useSwitchLocaleHref } from '@/components/local/use-locale';
import { localeConfig, i18n } from '@/components/local/config';
import type { Locale } from '@/components/local/config';
import { Languages } from 'lucide-react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale: currentLocale } = useLocale();
  const switchLocaleHref = useSwitchLocaleHref();

  const handleToggleLanguage = () => {
    // Toggle between 'en' and 'ar'
    const newLocale: Locale = currentLocale === 'en' ? 'ar' : 'en';
    const newPath = switchLocaleHref(newLocale);

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};max-age=31536000;path=/`;

    // Navigate to new locale path
    router.push(newPath);
    router.refresh();
  };

  return (
    <button
      onClick={handleToggleLanguage}
      className="p-2 text-gray-700 hover:text-gray-900 transition-colors"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5" />
    </button>
  );
}