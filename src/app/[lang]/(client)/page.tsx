import ProductList from "@/components/client/ProductList";
import HeroSection from "@/components/client/HeroSection";
import type { Locale } from "@/components/local/config";

const Homepage = async ({
  searchParams,
  params,
}: {
  searchParams: Promise<{ category: string }>;
  params: Promise<{ lang: Locale }>;
}) => {
  const category = (await searchParams).category;
  const { lang } = await params;

  return (
    <div className="flex flex-col">
      <div className=" flex flex-col">
        <HeroSection locale={lang} />
      </div>
      <ProductList category={category} params="homepage" locale={lang} />
    </div>
  );
};

export default Homepage;
