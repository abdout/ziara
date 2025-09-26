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
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-label="Toggle language"
    >
      <Languages className="w-4 h-4" />
      <span className="text-lg">
        {localeConfig[currentLocale]?.flag}
      </span>
    </button>
  );
}