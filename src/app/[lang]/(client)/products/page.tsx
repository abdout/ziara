import ProductList from "@/components/client/ProductList";
import type { Locale } from "@/components/local/config";

const ProductsPage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ category: string; sort: string; search: string }>;
  params: Promise<{ lang: Locale }>;
}) => {
  const category = (await searchParams).category;
  const sort = (await searchParams).sort;
  const search = (await searchParams).search;
  const { lang } = await params;

  return (
    <div className="">
      <ProductList
        category={category}
        sort={sort}
        search={search}
        params="products"
        locale={lang}
      />
    </div>
  );
};

export default ProductsPage;
