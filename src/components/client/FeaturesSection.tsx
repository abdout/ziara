import Image from "next/image";

export function FeaturesSection() {
  const features = [
    {
      icon: "/client/box.svg",
      title: "Discount",
      description: "Every week",
    },
    {
      icon: "/client/delivery-truck.svg",
      title: "Free Delivery",
      description: "100% Free",
    },
    {
      icon: "/client/24-hours.svg",
      title: "Great Support",
      description: "Great experiences",
    },
    {
      icon: "/client/shield.svg",
      title: "Secure Payment",
      description: "100% Secure",
    },
  ];

  return (
    <section className="py-8 mx-20 flex items-center justify-center">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="relative w-5 h-5">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-xs leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[10px] text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;