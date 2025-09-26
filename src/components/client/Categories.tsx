"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const categories = [
  {
    name: "Bowtie",
    icon: "/client/Bowtie.svg",
    slug: "bowtie",
  },
  {
    name: "Handbag",
    icon: "/client/Handbag 3.svg",
    slug: "handbag",
  },
  {
    name: "Scarf",
    icon: "/client/Scarf.svg",
    slug: "scarf",
  },
  {
    name: "Shorts",
    icon: "/client/Shorts 3.svg",
    slug: "shorts",
  },
  {
    name: "Tennis Skirt",
    icon: "/client/Tennis Skirt.svg",
    slug: "tennis-skirt",
  },
  {
    name: "Sweater",
    icon: "/client/Sweater.svg",
    slug: "sweater",
  },
  {
    name: "Waistcoat",
    icon: "/client/Waistcoat 3.svg",
    slug: "waistcoat",
  },
];

const Categories = () => {
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
    <div className="flex justify-center gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center gap-1 cursor-pointer px-2 py-1 rounded-md ${
            category.slug === selectedCategory ? "bg-white" : "text-gray-500"
          }`}
          key={category.name}
          onClick={() => handleChange(category.slug)}
        >
          <div className="relative w-10 h-10">
            <Image
              src={category.icon}
              alt={category.name}
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xs">{category.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Categories;
