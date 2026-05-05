import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  Home, 
  Calendar, 
  Clock, 
  User, 
  Settings, 
  LogOut, 
  Plus,
  Sparkles,
  Leaf,
  PawPrint,
  Heart,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Edit,
  Trash2,
  ArrowRight
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

// Mock user data
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  address: "123 Main Street, Apt 4B",
  city: "New York",
  zipCode: "10001",
  memberSince: "January 2024",
  totalBookings: 12
};

// Mock bookings data
const mockBookings = [
  {
    id: "1",
    service: "house-cleaning",
    serviceName: "House Cleaning",
    icon: Sparkles,
    date: "2026-03-20",
    time: "10:00 AM - 12:00 PM",
    status: "confirmed",
    address: "123 Main Street, Apt 4B, New York",
    price: "$120"
  },
  {
    id: "2",
    service: "garden-maintenance",
    serviceName: "Garden Maintenance",
    icon: Leaf,
    date: "2026-03-22",
    time: "2:00 PM - 4:00 PM",
    status: "pending",
    address: "123 Main Street, Apt 4B, New York",
    price: "$150"
  },
  {
    id: "3",
    service: "pet-care",
    serviceName: "Pet Care",
    icon: PawPrint,
    date: "2026-03-18",
    time: "8:00 AM - 10:00 AM",
    status: "completed",
    address: "123 Main Street, Apt 4B, New York",
    price: "$80"
  },
  {
    id: "4",
    service: "house-cleaning",
    serviceName: "House Cleaning",
    icon: Sparkles,
    date: "2026-03-10",
    time: "10:00 AM - 12:00 PM",
    status: "completed",
    address: "123 Main Street, Apt 4B, New York",
    price: "$120"
  },
  {
    id: "5",
    service: "elderly-care",
    serviceName: "Elderly Care",
    icon: Heart,
    date: "2026-03-05",
    time: "12:00 PM - 2:00 PM",
    status: "completed",
    address: "123 Main Street, Apt 4B, New York",
    price: "$200"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "confirmed":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle2 className="w-3 h-3 mr-1" /> Confirmed</Badge>;
    case "pending":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><AlertCircle className="w-3 h-3 mr-1" /> Pending</Badge>;
    case "completed":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><CheckCircle2 className="w-3 h-3 mr-1" /> Completed</Badge>;
    case "cancelled":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" /> Cancelled</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "bookings" | "profile">("overview");

  const upcomingBookings = mockBookings.filter(b => b.status === "confirmed" || b.status === "pending");
  const completedBookings = mockBookings.filter(b => b.status === "completed");

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
                <p className="text-xs text-gray-600">User Dashboard</p>
              </div>
            </button>
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline"
                onClick={() => navigate("/book-service")}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">New Booking</span>
              </Button>
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {mockUser.firstName}! 👋
            </h2>
            <p className="text-gray-600">
              Manage your bookings and profile information
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Home className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "bookings"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Calendar className="w-4 h-4 inline mr-2" />
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "profile"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profile
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-7 h-7 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Upcoming</p>
                        <p className="text-3xl font-bold text-gray-900">{upcomingBookings.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-3xl font-bold text-gray-900">{completedBookings.length}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total Bookings</p>
                        <p className="text-3xl font-bold text-gray-900">{mockUser.totalBookings}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Bookings */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab("bookings")}
                    >
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {upcomingBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No upcoming bookings</p>
                      <Button onClick={() => navigate("/book-service")}>
                        <Plus className="w-4 h-4 mr-2" />
                        Book a Service
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div 
                          key={booking.id}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <booking.icon className="w-6 h-6 text-blue-600" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900">{booking.serviceName}</h4>
                                  {getStatusBadge(booking.status)}
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {new Date(booking.date).toLocaleDateString('en-US', { 
                                      weekday: 'long', 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {booking.time}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    {booking.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-gray-900 mb-2">{booking.price}</p>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold mb-2">Need a service?</h3>
                      <p className="text-blue-100">Book your next appointment in just a few clicks</p>
                    </div>
                    <Button 
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-blue-50"
                      onClick={() => navigate("/book-service")}
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Book Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">All Bookings</h3>
                <Button onClick={() => navigate("/book-service")}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Booking
                </Button>
              </div>

              {/* Upcoming Bookings */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Upcoming</h4>
                {upcomingBookings.length === 0 ? (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No upcoming bookings</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid gap-4">
                    {upcomingBookings.map((booking) => (
                      <Card key={booking.id} className="shadow-lg hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-4 flex-1">
                              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                <booking.icon className="w-7 h-7 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                  <h4 className="text-xl font-semibold text-gray-900">{booking.serviceName}</h4>
                                  {getStatusBadge(booking.status)}
                                </div>
                                <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-600">
                                  <p className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-blue-600" />
                                    {new Date(booking.date).toLocaleDateString('en-US', { 
                                      weekday: 'long', 
                                      year: 'numeric', 
                                      month: 'long', 
                                      day: 'numeric' 
                                    })}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-blue-600" />
                                    {booking.time}
                                  </p>
                                  <p className="flex items-center gap-2 sm:col-span-2">
                                    <MapPin className="w-4 h-4 text-blue-600" />
                                    {booking.address}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-gray-900 mb-3">{booking.price}</p>
                              <div className="flex flex-col gap-2">
                                <Button size="sm" variant="outline" className="gap-2">
                                  <Edit className="w-4 h-4" />
                                  Edit
                                </Button>
                                <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              {/* Booking History */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">History</h4>
                <div className="grid gap-4">
                  {completedBookings.map((booking) => (
                    <Card key={booking.id} className="shadow-md opacity-75 hover:opacity-100 transition-opacity">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <booking.icon className="w-6 h-6 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{booking.serviceName}</h4>
                                {getStatusBadge(booking.status)}
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  {new Date(booking.date).toLocaleDateString('en-US', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" />
                                  {booking.time}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-semibold text-gray-900 mb-2">{booking.price}</p>
                            <Button size="sm" variant="outline">
                              Book Again
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/profile/user")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="md:col-span-1 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl font-bold text-white">
                        {mockUser.firstName[0]}{mockUser.lastName[0]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {mockUser.firstName} {mockUser.lastName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">Member since {mockUser.memberSince}</p>
                    <div className="flex justify-center gap-2">
                      <Button size="sm" className="flex-1">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="md:col-span-2 shadow-lg">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">First Name</label>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{mockUser.firstName}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</label>
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                          <User className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{mockUser.lastName}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Mail className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{mockUser.email}</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Phone Number</label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <Phone className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{mockUser.phone}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Address Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Default Service Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Street Address</label>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-900">{mockUser.address}</span>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">City</label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">{mockUser.city}</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-2 block">ZIP Code</label>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-900">{mockUser.zipCode}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-5 h-5 mr-3" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mail className="w-5 h-5 mr-3" />
                    Email Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                    <Trash2 className="w-5 h-5 mr-3" />
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}