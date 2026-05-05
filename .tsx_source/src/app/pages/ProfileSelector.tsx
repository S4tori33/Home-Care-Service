import { useNavigate } from "react-router";
import { 
  User, 
  Briefcase,
  ArrowRight,
  Star,
  Calendar,
  Award,
  Home as HomeIcon
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function ProfileSelector() {
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
                <p className="text-xs text-gray-600">Choose Your Profile</p>
              </div>
            </button>
            
            <Button 
              variant="outline"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <HomeIcon className="w-4 h-4" />
              Back to Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Select Your Profile Type
            </h2>
            <p className="text-xl text-gray-600">
              Are you looking for services or offering your expertise?
            </p>
          </div>

          {/* Profile Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* User Profile Card */}
            <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 hover:border-blue-600 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <User className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl">Customer Profile</CardTitle>
                <p className="text-gray-600 mt-2">
                  Book services and manage your appointments
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Manage Bookings</p>
                      <p className="text-gray-600">View and manage all your service appointments</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Star className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Favorite Providers</p>
                      <p className="text-gray-600">Save and rebook with your preferred professionals</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Award className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Loyalty Rewards</p>
                      <p className="text-gray-600">Earn points and enjoy exclusive benefits</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full gap-2 group-hover:bg-blue-700"
                  size="lg"
                  onClick={() => navigate("/profile/user")}
                >
                  View Customer Profile
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/dashboard")}
                >
                  Go to Dashboard
                </Button>
              </CardContent>
            </Card>

            {/* Jobseeker Profile Card */}
            <Card className="shadow-xl hover:shadow-2xl transition-shadow cursor-pointer border-2 hover:border-green-600 group">
              <CardHeader className="text-center pb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Briefcase className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-2xl">Jobseeker Profile</CardTitle>
                <p className="text-gray-600 mt-2">
                  Showcase your skills and find work opportunities
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-sm">
                    <Briefcase className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Professional Portfolio</p>
                      <p className="text-gray-600">Showcase your skills, certifications, and experience</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Star className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Build Your Reputation</p>
                      <p className="text-gray-600">Earn ratings and reviews from satisfied clients</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 text-sm">
                    <Calendar className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Flexible Scheduling</p>
                      <p className="text-gray-600">Set your availability and preferred working hours</p>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full gap-2 bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={() => navigate("/profile/jobseeker")}
                >
                  View Jobseeker Profile
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <Button 
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/profile/jobseeker")}
                >
                  Browse Job Opportunities
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="mt-12 text-center">
            <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-3">Not sure which profile you need?</h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  You can have both! As a customer, book the services you need. As a jobseeker, 
                  offer your skills and build your professional reputation. HCS creates a win-win 
                  for everyone in our community.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                    onClick={() => navigate("/about")}
                  >
                    Learn More About HCS
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => navigate("/")}
                  >
                    Back to Homepage
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
