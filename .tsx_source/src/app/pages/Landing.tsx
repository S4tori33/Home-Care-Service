import { useNavigate } from "react-router";
import { ArrowRight, Home, Users, Shield, Sparkles, Leaf, PawPrint, Heart, Star, CheckCircle2, User, Plus } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800">
      {/* Top Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-end gap-4">
            <Button 
              variant="ghost"
              onClick={() => navigate("/profile")}
              className="gap-2 text-white hover:bg-white/10"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">My Profile</span>
            </Button>
            <Button 
              variant="ghost"
              onClick={() => navigate("/dashboard")}
              className="gap-2 text-white hover:bg-white/10"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-blue-600 font-bold text-3xl">HCS</span>
              </div>
              <div className="text-left">
                <h1 className="font-bold text-3xl text-white">Home Care Service</h1>
                <p className="text-blue-200 text-sm">Quality Care, Quality Life</p>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Home<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                Transform Lives
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
              Professional home care services that bring comfort to families while creating meaningful employment opportunities
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button 
                size="lg"
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50 shadow-2xl"
                onClick={() => navigate("/home")}
              >
                Explore Services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10"
                onClick={() => navigate("/book-service")}
              >
                Book Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">500+</div>
                <div className="text-blue-200 text-sm">Happy Clients</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                <div className="text-blue-200 text-sm">Average Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">100+</div>
                <div className="text-blue-200 text-sm">Service Providers</div>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-blue-200 text-sm">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Preview Section */}
      <div className="relative bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Care Solutions
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From everyday tasks to specialized care, we're here to help
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">House Cleaning</h4>
              <p className="text-gray-600 text-sm">Professional cleaning for a spotless home</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Garden Care</h4>
              <p className="text-gray-600 text-sm">Expert maintenance for beautiful outdoor spaces</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-amber-600 rounded-xl flex items-center justify-center mb-4">
                <PawPrint className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Pet Care</h4>
              <p className="text-gray-600 text-sm">Loving care for your furry companions</p>
            </div>

            <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-rose-600 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Elderly Care</h4>
              <p className="text-gray-600 text-sm">Compassionate support for seniors</p>
            </div>
          </div>
        </div>
      </div>

      {/* Value Propositions */}
      <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* For Customers */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <Home className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Customers</h3>
                <p className="text-gray-600 mb-6">
                  Experience reliable, professional care that brings peace of mind to you and your family.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Background-checked professionals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Flexible scheduling options</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Trusted and insured service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Affordable, transparent pricing</span>
                  </li>
                </ul>
                <Button 
                  className="w-full"
                  onClick={() => navigate("/home")}
                >
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>

              {/* For Job Seekers */}
              <div className="bg-white rounded-2xl p-8 shadow-xl">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">For Job Seekers</h3>
                <p className="text-gray-600 mb-6">
                  Build a rewarding career with flexible hours and competitive pay in a growing industry.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Choose your own schedule</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Competitive wages & bonuses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Training and development programs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Supportive community network</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                  onClick={() => navigate("/home")}
                >
                  Join Our Team
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Shield className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h3>
            <p className="text-xl text-blue-100 mb-8">
              Join hundreds of satisfied customers who trust HCS for their home care needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/book-service")}
              >
                Book a Service Now
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/10"
                onClick={() => navigate("/home")}
              >
                Explore Website
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-center md:text-left">
              © {new Date().getFullYear()} Home Care Service. All rights reserved.
            </p>
            <div className="flex gap-6">
              <button 
                onClick={() => navigate("/about")}
                className="text-sm hover:text-white transition"
              >
                About Us
              </button>
              <button 
                onClick={() => navigate("/home")}
                className="text-sm hover:text-white transition"
              >
                Services
              </button>
              <button 
                onClick={() => navigate("/dashboard")}
                className="text-sm hover:text-white transition"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}