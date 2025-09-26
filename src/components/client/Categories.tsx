"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/components/local/config";
import { getShopDictionary } from "@/components/local/shop-dictionary";

const Categories = ({ locale }: { locale: Locale }) => {
  const dict = getShopDictionary(locale);

  const categories = [
    {
      name: dict.categories.bowtie,
      icon: "/client/Bowtie.svg",
      slug: "bowtie",
    },
    {
      name: dict.categories.handbag,
      icon: "/client/Handbag 3.svg",
      slug: "handbag",
    },
    {
      name: dict.categories.scarf,
      icon: "/client/Scarf.svg",
      slug: "scarf",
    },
    {
      name: dict.categories.shorts,
      icon: "/client/Shorts 3.svg",
      slug: "shorts",
    },
    {
      name: dict.categories.skirt,
      icon: "/client/Tennis Skirt.svg",
      slug: "tennis-skirt",
    },
    {
      name: dict.categories.sweater,
      icon: "/client/Sweater.svg",
      slug: "sweater",
    },
    {
      name: dict.categories.waistcoat,
      icon: "/client/Waistcoat 3.svg",
      slug: "waistcoat",
    },
  ];
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedCategory = searchParams.get("category");

  const handleChange = (value: string | null) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value || "all");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex border-b border-gray-100 gap-8 my-8 text-base overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center gap-1 cursor-pointer py-1 rounded-md flex-shrink-0 ${
            category.slug === selectedCategory ? "bg-white text-black font-bold" : "text-black font-semibold"
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          <div className="relative w-12 h-12">
            <Image
              src={category.icon}
              alt={category.name}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
