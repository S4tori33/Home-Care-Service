import { CheckCircle2, Home, Users, Award } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function Hero() {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
              🏠 Trusted Home Care Solutions
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-gray-900">
              Quality Care for Your Home & Loved Ones
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Comprehensive home care services that improve your quality of life while creating 
              meaningful employment opportunities for dedicated professionals.
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-700">Reliable & Trustworthy Service Providers</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-700">Background-Checked Professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="text-green-600 w-6 h-6 flex-shrink-0" />
                <span className="text-gray-700">Flexible Scheduling & Affordable Rates</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => scrollToSection("services")}
              >
                Explore Services
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8"
                onClick={() => navigate("/book-service")}
              >
                Book Now
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-12 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <Home className="w-20 h-20 text-white mb-2" />
                  <span className="text-white text-sm">Home Care</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                  <Users className="w-20 h-20 text-white mb-2" />
                  <span className="text-white text-sm">Trusted Team</span>
                </div>
                <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-8 rounded-xl col-span-2">
                  <Award className="w-20 h-20 text-white mb-2" />
                  <span className="text-white text-sm">Quality Service</span>
                </div>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-3xl font-bold text-green-600">4.9★</div>
              <div className="text-gray-600">Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}