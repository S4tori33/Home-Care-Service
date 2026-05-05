import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Home,
  Calendar,
  Plus,
  LogOut,
  Sparkles,
  Leaf,
  PawPrint,
  Heart,
  CheckCircle2,
  Clock,
  MapPin,
  MessageSquare,
  Star,
  Search
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

const userStats = {
  activeBookings: 2,
  completedBookings: 12,
  totalSpent: 1440
};

const mockBookings = [
  { id: "1", service: "House Cleaning", icon: Sparkles, provider: "Maria Garcia", date: "2026-05-06", time: "10:00 AM", address: "123 Main St", status: "confirmed", price: "$120" },
  { id: "2", service: "Garden Maintenance", icon: Leaf, provider: "James Taylor", date: "2026-05-08", time: "2:00 PM", address: "123 Main St", status: "confirmed", price: "$150" },
  { id: "3", service: "Pet Care", icon: PawPrint, provider: "Robert Martinez", date: "2026-04-28", time: "8:00 AM", address: "123 Main St", status: "completed", price: "$80" }
];

const services = [
  { name: "House Cleaning", icon: Sparkles, color: "text-yellow-600", bg: "bg-yellow-100" },
  { name: "Garden Maintenance", icon: Leaf, color: "text-green-600", bg: "bg-green-100" },
  { name: "Pet Care", icon: PawPrint, color: "text-purple-600", bg: "bg-purple-100" },
  { name: "Elderly Care", icon: Heart, color: "text-red-600", bg: "bg-red-100" }
];

export default function RegularUserDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"active" | "history">("active");

  const activeBookings = mockBookings.filter(b => b.status === "confirmed");
  const completedBookings = mockBookings.filter(b => b.status === "completed");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="font-bold text-xl">My Dashboard</h1>
                <p className="text-xs text-blue-100">Book & Manage Services</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => navigate("/book-service")}
                className="bg-white text-blue-600 hover:bg-blue-50 gap-2"
              >
                <Plus className="w-4 h-4" />
                Book Service
              </Button>
              <Badge className="bg-white text-blue-600 hover:bg-white">
                👤 Regular User
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-white hover:bg-white/20"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back! 🏠
            </h2>
            <p className="text-gray-600">
              Manage your bookings and browse available services
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{userStats.activeBookings}</p>
                <p className="text-xs text-blue-600 mt-2">Upcoming services</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Completed</p>
                <p className="text-3xl font-bold text-gray-900">{userStats.completedBookings}</p>
                <p className="text-xs text-gray-600 mt-2">All time</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Sparkles className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900">${userStats.totalSpent}</p>
                <p className="text-xs text-gray-600 mt-2">Lifetime value</p>
              </CardContent>
            </Card>
          </div>

          {/* Browse Services */}
          <Card className="shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Browse Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-4">
                {services.map((service, idx) => (
                  <Card key={idx} className="cursor-pointer hover:shadow-lg transition">
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 ${service.bg} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <service.icon className={`w-8 h-8 ${service.color}`} />
                      </div>
                      <h3 className="font-semibold text-gray-900">{service.name}</h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("active")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "active"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Active Bookings ({activeBookings.length})
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "history"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              History ({completedBookings.length})
            </button>
          </div>

          {/* Bookings List */}
          <div className="grid gap-6">
            {(activeTab === "active" ? activeBookings : completedBookings).map((booking) => (
              <Card key={booking.id} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <booking.icon className="w-7 h-7 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{booking.service}</h3>
                          {booking.status === "confirmed" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Confirmed
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Provider: {booking.provider}</p>
                        <div className="grid md:grid-cols-3 gap-3 text-sm text-gray-600">
                          <p className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            {new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-600" />
                            {booking.time}
                          </p>
                          <p className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            {booking.address}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900 mb-3">{booking.price}</p>
                      {booking.status === "confirmed" && (
                        <Button size="sm" variant="outline" className="gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Message Provider
                        </Button>
                      )}
                      {booking.status === "completed" && (
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span>5.0</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
