import { Sparkles, Leaf, PawPrint, Heart } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const services = [
  {
    icon: Sparkles,
    title: "House Cleaning",
    description: "Professional cleaning services to keep your home spotless and hygienic. From regular maintenance to deep cleaning.",
    color: "blue"
  },
  {
    icon: Leaf,
    title: "Garden Maintenance",
    description: "Expert garden care including lawn mowing, pruning, planting, and landscape design to keep your outdoor spaces beautiful.",
    color: "green"
  },
  {
    icon: PawPrint,
    title: "Pet Care",
    description: "Loving care for your furry friends including dog walking, pet sitting, feeding, and companionship when you're away.",
    color: "amber"
  },
  {
    icon: Heart,
    title: "Elderly Care and Support",
    description: "Compassionate care for seniors including companionship, medication reminders, mobility assistance, and daily living support.",
    color: "rose"
  }
];

const colorClasses = {
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  amber: "bg-amber-100 text-amber-600",
  rose: "bg-rose-100 text-rose-600"
};

const backgroundColorClasses = {
  blue: "bg-gradient-to-br from-blue-500 to-blue-600",
  green: "bg-gradient-to-br from-green-500 to-green-600",
  amber: "bg-gradient-to-br from-amber-500 to-amber-600",
  rose: "bg-gradient-to-br from-rose-500 to-rose-600"
};

export function Services() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">Our Services</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive home care solutions tailored to meet your needs and exceed your expectations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className={`relative h-48 flex items-center justify-center ${backgroundColorClasses[service.color as keyof typeof backgroundColorClasses]}`}>
                <service.icon className="w-24 h-24 text-white" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-full ${colorClasses[service.color as keyof typeof colorClasses]}`}>
                    <service.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
                </div>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}