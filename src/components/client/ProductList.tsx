import Categories from "./Categories";
import Filter from "./Filter";
import ProductListClient from "./ProductListClient";

const ProductList = ({
  category,
  sort,
  search,
  params,
}: {
  category: string;
  sort?: string;
  search?: string;
  params: "homepage" | "products";
}) => {
  return (
    <div className="w-full">
      <Categories />
      <Filter />
      <ProductListClient
        category={category}
        sort={sort}
        search={search}
        params={params}
      />
    </div>
  );
};

export default ProductList;