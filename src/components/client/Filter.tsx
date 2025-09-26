"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Locale } from "@/components/local/config";
import { getShopDictionary } from "@/components/local/shop-dictionary";

const Filter = ({ locale }: { locale: Locale }) => {
  const dict = getShopDictionary(locale);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center justify-end gap-2 text-base text-black font-medium mb-4">
      <span>{dict.products.sortBy}:</span>
      <select
        name="sort"
        id="sort"
        className="ring-1 ring-gray-300 shadow-md p-2 rounded-md text-base font-medium text-black"
        onChange={(e) => handleFilter(e.target.value)}
      >
        <option value="newest">{dict.products.sortOptions.newest}</option>
        <option value="oldest">{dict.products.sortOptions.oldest}</option>
        <option value="asc">{dict.products.sortOptions.priceLowToHigh}</option>
        <option value="desc">{dict.products.sortOptions.priceHighToLow}</option>
      </select>
    </div>
  );
};

export default Filter;
