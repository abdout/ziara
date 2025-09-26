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
      <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-800">
        Stylish. Bold. Comfort. Sleek.
      </h2>
    </div>
  );
};

export default HeroSection;