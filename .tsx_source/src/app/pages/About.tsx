import { useNavigate } from "react-router";
import { 
  ArrowLeft,
  Heart,
  Users,
  Target,
  Award,
  Shield,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Quote,
  Home,
  Leaf,
  PawPrint,
  Calendar
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const stats = [
  { icon: Users, value: "500+", label: "Happy Customers" },
  { icon: Award, value: "100+", label: "Trained Professionals" },
  { icon: CheckCircle2, value: "10,000+", label: "Services Completed" },
  { icon: TrendingUp, value: "4.9/5", label: "Average Rating" }
];

const values = [
  {
    icon: Heart,
    title: "Care & Compassion",
    description: "Every service we provide is delivered with genuine care and respect for our clients and their homes."
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "All our professionals are thoroughly vetted, background-checked, and insured for your peace of mind."
  },
  {
    icon: Award,
    title: "Quality Excellence",
    description: "We maintain the highest standards of service quality through continuous training and feedback."
  },
  {
    icon: Users,
    title: "Community Impact",
    description: "We create meaningful employment opportunities while serving our community's needs."
  }
];

const team = [
  {
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "15+ years in healthcare management, passionate about creating opportunities.",
    initials: "SJ"
  },
  {
    name: "Michael Chen",
    role: "Operations Director",
    bio: "Expert in service coordination and quality assurance.",
    initials: "MC"
  },
  {
    name: "Emily Rodriguez",
    role: "Training Manager",
    bio: "Dedicated to empowering our service providers with skills and confidence.",
    initials: "ER"
  },
  {
    name: "David Thompson",
    role: "Customer Relations",
    bio: "Ensuring every customer has an exceptional experience.",
    initials: "DT"
  }
];

const testimonials = [
  {
    name: "Jennifer Martinez",
    role: "Customer",
    content: "HCS has been a lifesaver! The house cleaning service is impeccable, and I love knowing I'm also supporting local job seekers.",
    rating: 5
  },
  {
    name: "Robert Williams",
    role: "Service Provider",
    content: "Finding work through HCS changed my life. The flexible hours and supportive team made all the difference.",
    rating: 5
  },
  {
    name: "Lisa Anderson",
    role: "Customer",
    content: "The elderly care service for my mother has been wonderful. Professional, caring, and reliable every single time.",
    rating: 5
  }
];

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HCS</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Home Care Service</h1>
                <p className="text-xs text-gray-600">About Us</p>
              </div>
            </button>
            
            <Button 
              variant="ghost"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transforming Lives Through Service
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              We're more than a home care service – we're a bridge connecting quality care with meaningful employment opportunities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/book-service")}
              >
                Book a Service
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
                onClick={() => navigate("/home")}
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Home Care Service was founded in 2024 with a simple yet powerful vision: to create a service that not only provides exceptional home care but also serves as a pathway to employment for job seekers in our community.
              </p>
              <p>
                We recognized a dual need in our society – families struggling to find reliable, trustworthy help for their homes, and talented individuals seeking meaningful work opportunities with flexible schedules. HCS bridges this gap by connecting these two groups in a mutually beneficial relationship.
              </p>
              <p>
                Today, we're proud to serve hundreds of families while providing stable employment and training to over 100 service providers. Every booking you make doesn't just improve your home – it changes someone's life.
              </p>
            </div>

            <Card className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 border-0">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Target className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To deliver exceptional home care services while creating sustainable employment opportunities, 
                      fostering dignity, growth, and community connection for both our customers and service providers.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600">The principles that guide everything we do</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <value.icon className="w-7 h-7 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
              <p className="text-lg text-gray-600">Comprehensive care solutions for your home and family</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">House Cleaning</h3>
                  <p className="text-sm text-gray-700">
                    Professional cleaning services to keep your home spotless
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-green-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Garden Maintenance</h3>
                  <p className="text-sm text-gray-700">
                    Expert care for beautiful, healthy outdoor spaces
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-amber-50 to-amber-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <PawPrint className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Pet Care</h3>
                  <p className="text-sm text-gray-700">
                    Loving, attentive care for your furry family members
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-br from-rose-50 to-rose-100">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-rose-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Elderly Care</h3>
                  <p className="text-sm text-gray-700">
                    Compassionate support and companionship for seniors
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
              <p className="text-lg text-gray-600">Dedicated professionals committed to our mission</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">{member.initials}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What People Say</h2>
              <p className="text-lg text-gray-600">Hear from our satisfied customers and service providers</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-8">
                    <Quote className="w-10 h-10 text-blue-600 mb-4" />
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <CheckCircle2 key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Impact</h2>
            <p className="text-xl text-blue-100 mb-12">
              Every service we provide creates a ripple effect of positive change
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <Home className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">For Customers</h3>
                <ul className="text-left space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Peace of mind with vetted professionals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Flexible scheduling to fit your life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Supporting local employment</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
                <Users className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-3">For Service Providers</h3>
                <ul className="text-left space-y-2 text-blue-100">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Stable income with flexible hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Professional training and development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Supportive community network</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/book-service")}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Your First Service
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
                onClick={() => navigate("/home")}
              >
                Learn More About Our Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Home Care Service. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
