import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  CreditCard,
  Bell,
  Shield,
  Edit,
  Save,
  X,
  Home,
  Settings,
  ArrowLeft,
  Check,
  Star,
  Award,
  Clock,
  Heart,
  Sparkles
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Switch } from "../components/ui/switch";
import { Separator } from "../components/ui/separator";

// Mock user data
const initialUserData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  phone: "(555) 123-4567",
  address: "123 Main Street, Apt 4B",
  city: "New York",
  state: "NY",
  zipCode: "10001",
  memberSince: "January 2024",
  totalBookings: 12,
  loyaltyPoints: 450,
  preferredServices: ["House Cleaning", "Pet Care"],
  notifications: {
    email: true,
    sms: false,
    promotions: true
  },
  paymentMethods: [
    { id: "1", type: "Visa", last4: "4242", isDefault: true },
    { id: "2", type: "Mastercard", last4: "8888", isDefault: false }
  ]
};

export default function UserProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  const [editedData, setEditedData] = useState(initialUserData);

  const handleSave = () => {
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setEditedData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                <p className="text-sm text-gray-600">Manage your personal information and preferences</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} className="gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button variant="outline" onClick={handleCancel} className="gap-2">
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                  <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Card & Stats */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Card */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-5xl font-bold text-white">
                        {userData.firstName[0]}{userData.lastName[0]}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {userData.firstName} {userData.lastName}
                    </h2>
                    <p className="text-sm text-gray-600 mb-2">Premium Member</p>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                      <Calendar className="w-3 h-3 mr-1" />
                      Member since {userData.memberSince}
                    </Badge>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-gray-900">Total Bookings</span>
                      </div>
                      <span className="text-xl font-bold text-blue-600">{userData.totalBookings}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-600" />
                        <span className="font-medium text-gray-900">Loyalty Points</span>
                      </div>
                      <span className="text-xl font-bold text-purple-600">{userData.loyaltyPoints}</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-gray-900">Rating</span>
                      </div>
                      <span className="text-xl font-bold text-green-600">5.0</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/dashboard")}
                  >
                    <Home className="w-5 h-5 mr-3" />
                    Go to Dashboard
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={() => navigate("/book-service")}
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    Book a Service
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    Favorite Providers
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={editedData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="mt-2"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-2">
                          <span className="text-gray-900">{userData.firstName}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={editedData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="mt-2"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-2">
                          <span className="text-gray-900">{userData.lastName}</span>
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <div className="relative mt-2">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            value={editedData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-2">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{userData.email}</span>
                        </div>
                      )}
                    </div>

                    <div className="sm:col-span-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      {isEditing ? (
                        <div className="relative mt-2">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            value={editedData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            className="pl-10"
                          />
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-2">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-900">{userData.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Service Address
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          value={editedData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          className="mt-2"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg mt-2">
                          <span className="text-gray-900">{userData.address}</span>
                        </div>
                      )}
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        {isEditing ? (
                          <Input
                            id="city"
                            value={editedData.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            className="mt-2"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg mt-2">
                            <span className="text-gray-900">{userData.city}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="state">State</Label>
                        {isEditing ? (
                          <Input
                            id="state"
                            value={editedData.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            className="mt-2"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg mt-2">
                            <span className="text-gray-900">{userData.state}</span>
                          </div>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        {isEditing ? (
                          <Input
                            id="zipCode"
                            value={editedData.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            className="mt-2"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg mt-2">
                            <span className="text-gray-900">{userData.zipCode}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notification Preferences */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="w-5 h-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Email Notifications</p>
                      <p className="text-sm text-gray-600">Receive booking confirmations and updates via email</p>
                    </div>
                    <Switch
                      checked={isEditing ? editedData.notifications.email : userData.notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange("email", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">SMS Notifications</p>
                      <p className="text-sm text-gray-600">Get text messages for important updates</p>
                    </div>
                    <Switch
                      checked={isEditing ? editedData.notifications.sms : userData.notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange("sms", checked)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Promotional Emails</p>
                      <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                    </div>
                    <Switch
                      checked={isEditing ? editedData.notifications.promotions : userData.notifications.promotions}
                      onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
                      disabled={!isEditing}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Payment Methods
                    </CardTitle>
                    <Button variant="outline" size="sm">
                      Add New
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {userData.paymentMethods.map((method) => (
                    <div 
                      key={method.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{method.type} •••• {method.last4}</p>
                          {method.isDefault && (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 mt-1">
                              <Check className="w-3 h-3 mr-1" />
                              Default
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security & Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-5 h-5 mr-3" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-5 h-5 mr-3" />
                    Two-Factor Authentication
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="w-5 h-5 mr-3" />
                    Login History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
