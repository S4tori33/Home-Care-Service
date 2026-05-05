import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Briefcase,
  LogOut,
  CheckCircle2,
  Clock,
  XCircle,
  User,
  MapPin,
  Phone,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  MessageSquare
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";

type ProviderType = "caregiver" | "pet_care" | "garden_maintenance" | "house_cleaning";

const providerConfig: Record<ProviderType, { title: string; icon: string; color: string; bgGradient: string }> = {
  caregiver: { title: "Caregiver", icon: "💙", color: "text-blue-600", bgGradient: "from-blue-600 to-indigo-600" },
  pet_care: { title: "Pet Care Provider", icon: "🐾", color: "text-purple-600", bgGradient: "from-purple-600 to-pink-600" },
  garden_maintenance: { title: "Garden Maintenance", icon: "🌿", color: "text-green-600", bgGradient: "from-green-600 to-emerald-600" },
  house_cleaning: { title: "House Cleaning", icon: "✨", color: "text-yellow-600", bgGradient: "from-yellow-600 to-orange-600" }
};

const mockJobs = {
  caregiver: [
    { id: "1", customer: "Emily Davis", address: "321 Elm St, Houston", date: "2026-05-05", time: "11:00 AM - 3:00 PM", payment: "$200", status: "assigned" },
    { id: "2", customer: "Robert Johnson", address: "789 Oak Ave, Dallas", date: "2026-05-06", time: "9:00 AM - 1:00 PM", payment: "$180", status: "assigned" }
  ],
  pet_care: [
    { id: "1", customer: "Sarah Johnson", address: "456 Oak Ave, Los Angeles", date: "2026-05-05", time: "2:00 PM - 4:00 PM", payment: "$80", status: "assigned" },
    { id: "2", customer: "Mike Chen", address: "234 Pine St, San Diego", date: "2026-05-06", time: "10:00 AM - 12:00 PM", payment: "$75", status: "completed" }
  ],
  garden_maintenance: [
    { id: "1", customer: "Michael Brown", address: "789 Pine Rd, Chicago", date: "2026-05-06", time: "9:00 AM - 12:00 PM", payment: "$150", status: "assigned" },
    { id: "2", customer: "Lisa Anderson", address: "456 Maple Dr, Denver", date: "2026-05-07", time: "1:00 PM - 4:00 PM", payment: "$160", status: "assigned" }
  ],
  house_cleaning: [
    { id: "1", customer: "John Doe", address: "123 Main St, New York", date: "2026-05-05", time: "10:00 AM - 12:00 PM", payment: "$120", status: "completed" },
    { id: "2", customer: "David Wilson", address: "654 Maple Dr, Phoenix", date: "2026-05-07", time: "3:00 PM - 5:00 PM", payment: "$130", status: "assigned" }
  ]
};

export default function ServiceProviderDashboard() {
  const navigate = useNavigate();
  const [providerType, setProviderType] = useState<ProviderType>("caregiver");
  const [activeTab, setActiveTab] = useState<"assigned" | "completed">("assigned");

  useEffect(() => {
    const role = localStorage.getItem("userRole") as ProviderType;
    if (role && providerConfig[role]) {
      setProviderType(role);
    }
  }, []);

  const config = providerConfig[providerType];
  const jobs = mockJobs[providerType] || [];
  const assignedJobs = jobs.filter(j => j.status === "assigned");
  const completedJobs = jobs.filter(j => j.status === "completed");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className={`bg-gradient-to-r ${config.bgGradient} text-white shadow-lg`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Briefcase className={`w-6 h-6 ${config.color}`} />
              </div>
              <div>
                <h1 className="font-bold text-xl">{config.title} Dashboard</h1>
                <p className="text-xs opacity-90">Your Jobs & Assignments</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-white hover:bg-white" style={{ color: config.color.replace('text-', '') }}>
                {config.icon} {config.title}
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
              Welcome Back! 👋
            </h2>
            <p className="text-gray-600">
              Manage your assigned jobs and communicate with customers
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Assigned Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{assignedJobs.length}</p>
                <p className="text-xs text-blue-600 mt-2">Active assignments</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Completed Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{completedJobs.length}</p>
                <p className="text-xs text-green-600 mt-2">This week</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Rating</p>
                <p className="text-3xl font-bold text-gray-900">4.8</p>
                <p className="text-xs text-gray-600 mt-2">Based on 45 reviews</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <DollarSign className="w-8 h-8 text-emerald-600" />
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Earnings (Week)</p>
                <p className="text-3xl font-bold text-gray-900">$540</p>
                <p className="text-xs text-green-600 mt-2">+12% from last week</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("assigned")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "assigned"
                  ? `${config.color} border-b-2 border-current`
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Assigned Jobs ({assignedJobs.length})
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "completed"
                  ? `${config.color} border-b-2 border-current`
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Completed Jobs ({completedJobs.length})
            </button>
          </div>

          {/* Jobs List */}
          <div className="grid gap-6">
            {(activeTab === "assigned" ? assignedJobs : completedJobs).map((job) => (
              <Card key={job.id} className="shadow-lg hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">{job.customer}</h3>
                          <p className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {job.address}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span>{new Date(job.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span>{job.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-emerald-600" />
                        <span className="text-2xl font-bold text-gray-900">{job.payment}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {job.status === "assigned" ? (
                        <>
                          <Button size="sm" className="gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Accept Job
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                            <XCircle className="w-4 h-4" />
                            Decline
                          </Button>
                          <Button size="sm" variant="outline" className="gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Message
                          </Button>
                        </>
                      ) : (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {(activeTab === "assigned" ? assignedJobs : completedJobs).length === 0 && (
              <Card className="shadow-lg">
                <CardContent className="p-12 text-center">
                  <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">
                    {activeTab === "assigned" ? "No assigned jobs at the moment" : "No completed jobs yet"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
