 import Image from "next/image";
import FeaturesSection from "./FeaturesSection";
import type { Locale } from "@/components/local/config";
import { getShopDictionary } from "@/components/local/shop-dictionary";

const HeroSection = ({ locale }: { locale: Locale }) => {
  const dict = getShopDictionary(locale);
  const productImages = [
    "/client/Puffer Jacket.svg",
    "/client/Handbag.svg",
    "/client/Shoes.svg",
    "/client/Top Hat.svg"
  ];

  return (
    <div className="h-[calc(100vh-120px)] md:h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <div className="w-full">
        {/* Hero Banner */}
        <div className="bg-amber-400 rounded-t-lg p-3 md:p-6">
        {/* Images - 4 in a row on all screens */}
        <div className="flex justify-center gap-2 md:gap-8 mb-4 md:mb-6">
          {productImages.map((src, index) => (
            <div key={index} className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Text - formatted for mobile and desktop */}
        <h2 className="text-center text-4xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 pb-4 md:pb-6">
          {locale === 'en' ? (
            <>
              <span className="md:hidden">
                <span className="block">Stylish. Bold.</span>
                <span className="block">Comfort. Sleek.</span>
              </span>
              <span className="hidden md:inline">{dict.hero.slogan}</span>
            </>
          ) : (
            <>
              <span className="md:hidden">
                <span className="block">أنيق. جريء.</span>
                <span className="block">مريح. أملس.</span>
              </span>
              <span className="hidden md:inline">{dict.hero.slogan}</span>
            </>
          )}
        </h2>
      </div>

        {/* Features Section - attached to hero */}
        <div className="bg-gray-100 rounded-b-lg">
          <FeaturesSection locale={locale} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;