import Categories from "./Categories";
import Filter from "./Filter";
import ProductListClient from "./ProductListClient";
import type { Locale } from "@/components/local/config";

const ProductList = ({
  category,
  sort,
  search,
  params,
  locale,
}: {
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
  locale: Locale;
}) => {
  return (
    <div className="w-full">
      <Categories locale={locale} />
      <Filter locale={locale} />
      <ProductListClient
        category={category}
        sort={sort}
        search={search}
        params={params}
        locale={locale}
      />
    </div>
  );
};

export default ProductList;