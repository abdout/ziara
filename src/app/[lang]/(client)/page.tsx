import ProductList from "@/components/client/ProductList";
import HeroSection from "@/components/client/HeroSection";

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) => {
  const category = (await searchParams).category;
  return (
    <div className="flex flex-col">
      <div className=" flex flex-col">
        <HeroSection />
      </div>
      <ProductList category={category} params="homepage"/>
    </div>
  );
};

export default Homepage;
