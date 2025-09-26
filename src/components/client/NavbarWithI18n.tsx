import Link from "next/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "./ShoppingCartIcon";
import ProfileButton from "./ProfileButton";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/components/local/config";
import { getShopDictionary } from "@/components/local/shop-dictionary";

interface NavbarProps {
  locale: Locale;
}

export default function NavbarWithI18n({ locale }: NavbarProps) {
  const dict = getShopDictionary(locale);

  return (
    <nav className="flex items-center justify-between my-4" dir="auto">
      {/* Logo Section */}
      <div className="flex items-center gap-6">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <Image src="/client/logo.png" alt="Logo" width={32} height={32} />
          <span className="text-xl font-semibold">{dict.common.shop}</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href={`/${locale}`}
            className="hover:text-primary transition-colors"
          >
            {dict.navigation.home}
          </Link>
          <Link
            href={`/${locale}/products`}
            className="hover:text-primary transition-colors"
          >
            {dict.navigation.products}
          </Link>
          <Link
            href={`/${locale}/categories`}
            className="hover:text-primary transition-colors"
          >
            {dict.navigation.categories}
          </Link>
        </div>
      </div>

      {/* Search Bar - Center */}
      <div className="hidden lg:block flex-1 max-w-md mx-8">
        <SearchBar />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 sm:gap-4">
        <LanguageSwitcher />
        <ShoppingCartIcon />
        <ProfileButton />
      </div>

      {/* Mobile Search Bar */}
      <div className="lg:hidden fixed bottom-20 left-4 right-4 z-10 bg-white shadow-lg rounded-lg p-2">
        <SearchBar />
      </div>
    </nav>
  );
}