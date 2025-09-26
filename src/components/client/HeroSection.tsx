import Image from "next/image";

const HeroSection = () => {
  const productImages = [
    "/client/Puffer Jacket.svg",
    "/client/Handbag.svg",
    "/client/Shoes.svg",
    "/client/Top Hat.svg"
  ];

  return (
    <div className="bg-amber-400 rounded-lg p-4 md:p-6 mb-8">
      {/* Images in a row */}
      <div className="flex justify-center gap-2 md:gap-6 mb-4">
        {productImages.map((src, index) => (
          <div key={index} className="relative w-16 h-16 md:w-20 md:h-20">
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
      <h2 className="text-center text-lg md:text-xl font-bold text-gray-800">
        Stylish. Bold. Comfort. Sleek.
      </h2>
    </div>
  );
};

export default HeroSection;