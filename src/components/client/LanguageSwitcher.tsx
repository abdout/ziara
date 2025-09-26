'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale, useSwitchLocaleHref } from '@/components/local/use-locale';
import { localeConfig, i18n } from '@/components/local/config';
import type { Locale } from '@/components/local/config';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale: currentLocale } = useLocale();
  const switchLocaleHref = useSwitchLocaleHref();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (newLocale: Locale) => {
    const newPath = switchLocaleHref(newLocale);

    // Set cookie for persistence
    document.cookie = `NEXT_LOCALE=${newLocale};max-age=31536000;path=/`;

    // Navigate to new locale path
    router.push(newPath);
    router.refresh();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">
          {localeConfig[currentLocale]?.flag} {localeConfig[currentLocale]?.nativeName}
        </span>
        <span className="sm:hidden">
          {localeConfig[currentLocale]?.flag}
        </span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {i18n.locales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`
                  flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100
                  ${currentLocale === locale ? 'bg-gray-50 font-semibold' : 'font-normal'}
                `}
                role="menuitem"
              >
                <span className="mr-3">{localeConfig[locale]?.flag}</span>
                <span className="flex-1 text-left">
                  {localeConfig[locale]?.nativeName}
                </span>
                {currentLocale === locale && (
                  <svg
                    className="w-4 h-4 text-indigo-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}