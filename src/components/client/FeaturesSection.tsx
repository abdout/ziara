import Image from "next/image";
import type { Locale } from "@/components/local/config";
import { getShopDictionary } from "@/components/local/shop-dictionary";

export function FeaturesSection({ locale }: { locale: Locale }) {
  const dict = getShopDictionary(locale);

  const features = [
    {
      icon: "/client/box.svg",
      title: dict.features.discount.title,
      description: dict.features.discount.description,
    },
    {
      icon: "/client/delivery-truck.svg",
      title: dict.features.freeDelivery.title,
      description: dict.features.freeDelivery.description,
    },
    {
      icon: "/client/24-hours.svg",
      title: dict.features.greatSupport.title,
      description: dict.features.greatSupport.description,
    },
    {
      icon: "/client/shield.svg",
      title: dict.features.securePayment.title,
      description: dict.features.securePayment.description,
    },
  ];

  return (
    <section className="py-8 mx-20 flex items-center justify-center">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-1 sm:gap-3">
              <div className="flex-shrink-0">
                <div className="relative w-5 h-5">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-xs leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[10px] text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;