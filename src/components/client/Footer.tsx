import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/components/local/config";
import { getShopDictionary } from "@/components/local/shop-dictionary";

const Footer = ({ locale }: { locale: Locale }) => {
  const dict = getShopDictionary(locale);
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start">
        <Link href="/" className="flex items-center">
          <Image src="/client/logo.png" alt="Ziara" width={36} height={36} />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            {locale === 'ar' ? 'زيارة' : 'ZIARA'}
          </p>
        </Link>
        <p className="text-sm text-gray-400">{dict.footer.copyright.replace('2024', '2025')}</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">{dict.navigation.categories}</p>
        <Link href="/">{dict.navigation.home}</Link>
        <Link href="/">{dict.footer.contactUs}</Link>
        <Link href="/">{dict.footer.termsOfService}</Link>
        <Link href="/">{dict.footer.privacyPolicy}</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">{dict.navigation.products}</p>
        <Link href="/">{dict.products.allProducts}</Link>
        <Link href="/">{dict.products.newArrivals}</Link>
        <Link href="/">{dict.products.featured}</Link>
        <Link href="/">{dict.products.popular}</Link>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">{dict.footer.customerService}</p>
        <Link href="/">{dict.footer.aboutUs}</Link>
        <Link href="/">{dict.footer.contactUs}</Link>
        <Link href="/">{dict.footer.faq}</Link>
        <Link href="/">{dict.footer.returnPolicy}</Link>
      </div>
    </div>
  );
};

export default Footer;
