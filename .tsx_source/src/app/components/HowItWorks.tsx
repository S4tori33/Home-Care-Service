import { Search, UserCheck, Calendar, Star } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Choose Your Service",
    description: "Browse our range of home care services and select what you need."
  },
  {
    icon: UserCheck,
    title: "Get Matched",
    description: "We connect you with vetted, qualified professionals in your area."
  },
  {
    icon: Calendar,
    title: "Schedule",
    description: "Book a time that works for you with flexible scheduling options."
  },
  {
    icon: Star,
    title: "Enjoy Quality Care",
    description: "Relax and enjoy professional service with peace of mind."
  }
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Getting started is simple. Follow these easy steps to access quality home care services.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 mx-auto">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-blue-600">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center text-gray-900">{step.title}</h3>
                <p className="text-gray-600 text-center">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <div className="w-8 h-0.5 bg-blue-300"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
