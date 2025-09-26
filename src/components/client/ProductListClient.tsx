'use client';

import { useEffect, useState } from 'react';
import { ProductType } from "@/types";
import ProductCard from "./ProductCard";
import Link from "next/link";

interface ProductListClientProps {
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}

const ProductListClient = ({ category, sort, search, params }: ProductListClientProps) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = `/api/products?${category ? `category=${category}` : ""}${search ? `&search=${search}` : ""}&sort=${sort || "newest"}${params === "homepage" ? "&limit=8" : ""}`;
        const res = await fetch(endpoint);

        if (!res.ok) {
          console.error(`Failed to fetch products: ${res.status} ${res.statusText}`);
          setProducts([]);
          return;
        }

        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, sort, search, params]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(params === "homepage" ? 8 : 12)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 aspect-[2/3] rounded-md mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500"
      >
        View all products
      </Link>
    </>
  );
};

export default ProductListClient;