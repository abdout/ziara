 import Image from "next/image";
import FeaturesSection from "./FeaturesSection";

const HeroSection = () => {
  const productImages = [
    "/client/Puffer Jacket.svg",
    "/client/Handbag.svg",
    "/client/Shoes.svg",
    "/client/Top Hat.svg"
  ];

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col justify-center items-center">
      <div className="w-full">
        {/* Hero Banner */}
        <div className="bg-amber-400 rounded-t-lg p-4 md:p-6">
        {/* Images in a row */}
        <div className="flex justify-center gap-3 md:gap-8 mb-6">
          {productImages.map((src, index) => (
            <div key={index} className="relative w-24 h-24 md:w-32 md:h-32">
              <Image
                src={src}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Text */}
        <h2 className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 pb-6">
          Stylish. Bold. Comfort. Sleek.
        </h2>
      </div>

        {/* Features Section - attached to hero */}
        <div className="bg-gray-100 rounded-b-lg">
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;