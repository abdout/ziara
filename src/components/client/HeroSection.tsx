import Image from "next/image";

const HeroSection = () => {
  const productCategories = [
    {
      icon: "/client/hoodie.svg",
      label: "Hoodies",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-900"
    },
    {
      icon: "/client/sweatshirt.svg",
      label: "Sweatshirts",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-900"
    },
    {
      icon: "/client/t-shirt.svg",
      label: "T-Shirts",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-900"
    },
    {
      icon: "/client/socks.png",
      label: "Socks",
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-900"
    }
  ];

  return (
    <div className="mb-16">
      {/* Hero Banner */}
      <div className="relative aspect-[3/1] mb-8 rounded-lg overflow-hidden">
        <Image
          src="/client/featured.png"
          alt="Featured Product"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-center">
          <div className="text-white px-8 lg:px-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              New Collection
            </h1>
            <p className="text-lg lg:text-xl mb-6 max-w-xl">
              Discover our latest arrivals and seasonal favorites
            </p>
            <button className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Product Categories Row */}
      <div className="bg-yellow-50 rounded-lg p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Shop by Category</h2>
          <p className="text-gray-600">Find your perfect style</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productCategories.map((category, index) => (
            <div
              key={index}
              className="group cursor-pointer transition-transform hover:scale-105"
            >
              <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <Image
                    src={category.icon}
                    alt={category.label}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className={`${category.bgColor} rounded-full px-4 py-2 text-center`}>
                  <span className={`font-semibold ${category.textColor}`}>
                    {category.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stylish Text Banner */}
        <div className="mt-8 bg-yellow-400 rounded-lg p-6 text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            ✨ Be Stylish, Be Confident, Be You ✨
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