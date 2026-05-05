import { Shield, Clock, DollarSign, HeartHandshake } from "lucide-react";
import { useNavigate } from "react-router";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const benefits = [
  {
    icon: Shield,
    title: "Trusted Professionals",
    description: "All service providers undergo thorough background checks and verification."
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book services at times that work for your schedule, including evenings and weekends."
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. Clear, upfront pricing for all our services."
  },
  {
    icon: HeartHandshake,
    title: "Satisfaction Guaranteed",
    description: "We stand behind our work with a 100% satisfaction guarantee."
  }
];

export function ForCustomers() {
  const navigate = useNavigate();

  return (
    <section id="for-customers" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">For Customers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the convenience of professional home care services that prioritize your peace of mind.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                  <benefit.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Join hundreds of satisfied customers who trust HCS for their home care needs.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => navigate("/book-service")}
          >
            Book a Service
          </Button>
        </div>
      </div>
    </section>
  );
}