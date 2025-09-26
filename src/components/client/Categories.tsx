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
    name: "Skirt",
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
    <div className="flex  border-b border-gray-100 justify-center gap-8 my-8 text-base">
      {categories.map((category) => (
        <div
          className={`flex items-center justify-center gap-1 cursor-pointer py-1 rounded-md ${
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
