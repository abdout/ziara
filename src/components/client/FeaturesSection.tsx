import Image from "next/image";

export function FeaturesSection() {
  const features = [
    {
      icon: "/client/box.svg",
      title: "Discount",
      description: "Every week new sales",
    },
    {
      icon: "/client/delivery-truck.svg",
      title: "Free Delivery",
      description: "100% Free for all orders",
    },
    {
      icon: "/client/24-hours.svg",
      title: "Great Support 24/7",
      description: "We care your experiences",
    },
    {
      icon: "/client/shield.svg",
      title: "Secure Payment",
      description: "100% Secure Payment Method",
    },
  ];

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="relative w-12 h-12">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;