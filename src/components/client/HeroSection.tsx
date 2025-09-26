import Image from "next/image";

const HeroSection = () => {
  const productImages = [
    {
      icon: "/client/Puffer Jacket.svg",
      label: "Puffer Jacket"
    },
    {
      icon: "/client/Handbag.svg",
      label: "Handbag"
    },
    {
      icon: "/client/Shoes.svg",
      label: "Shoes"
    },
    {
      icon: "/client/Top Hat.svg",
      label: "Top Hat"
    }
  ];

  return (
    <div className="mb-16">
      {/* Product Images Row */}
      <div className="bg-yellow-50 rounded-lg p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {productImages.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-32 h-32 mx-auto">
                  <Image
                    src={product.icon}
                    alt={product.label}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stylish Text Banner */}
        <div className="bg-yellow-400 rounded-lg p-6 text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            Be Stylish, Be Confident, Be You
          </p>
          <p className="text-gray-800 mt-2">
            Elevate your wardrobe with our premium collection
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;