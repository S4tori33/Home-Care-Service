import { useState } from "react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  TrendingUp,
  Settings,
  LogOut,
  Activity,
  Database,
  Server,
  Shield,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const systemMetrics = {
  totalUsers: 1248,
  totalAdmins: 12,
  totalProviders: 342,
  activeBookings: 89,
  totalRevenue: 145280,
  systemUptime: "99.9%",
  activeConnections: 456,
  serverLoad: 45
};

const userGrowthData = [
  { month: 'Oct', users: 890, providers: 245, admins: 10 },
  { month: 'Nov', users: 945, providers: 267, admins: 10 },
  { month: 'Dec', users: 1012, providers: 289, admins: 11 },
  { month: 'Jan', users: 1098, providers: 312, admins: 11 },
  { month: 'Feb', users: 1156, providers: 328, admins: 12 },
  { month: 'Mar', users: 1203, providers: 335, admins: 12 },
  { month: 'Apr', users: 1248, providers: 342, admins: 12 }
];

const revenueData = [
  { month: 'Oct', revenue: 112500 },
  { month: 'Nov', revenue: 118900 },
  { month: 'Dec', revenue: 125400 },
  { month: 'Jan', revenue: 132100 },
  { month: 'Feb', revenue: 136800 },
  { month: 'Mar', revenue: 141200 },
  { month: 'Apr', revenue: 145280 }
];

const recentActivities = [
  { id: 1, type: "user", message: "New user registered: john.doe@example.com", time: "2 mins ago", icon: Users, color: "text-blue-600" },
  { id: 2, type: "admin", message: "Platform Admin updated user permissions", time: "15 mins ago", icon: Shield, color: "text-purple-600" },
  { id: 3, type: "booking", message: "45 new bookings created today", time: "1 hour ago", icon: Calendar, color: "text-green-600" },
  { id: 4, type: "provider", message: "New service provider approved by HR", time: "2 hours ago", icon: Briefcase, color: "text-orange-600" },
  { id: 5, type: "alert", message: "System backup completed successfully", time: "3 hours ago", icon: CheckCircle2, color: "text-emerald-600" }
];

export default function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "system" | "analytics">("overview");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Super Admin Dashboard</h1>
                <p className="text-xs text-red-100">System Control Center</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-white text-red-600 hover:bg-white">
                🔴 Super Admin
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
              System Overview 🎯
            </h2>
            <p className="text-gray-600">
              Complete control and monitoring of the entire platform
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <LayoutDashboard className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("system")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "system"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Server className="w-4 h-4 inline mr-2" />
              System Health
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "analytics"
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TrendingUp className="w-4 h-4 inline mr-2" />
              Analytics
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Main Stats */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-lg border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{systemMetrics.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+127 this month</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-purple-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Shield className="w-8 h-8 text-purple-600" />
                      <Activity className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Total Admins</p>
                    <p className="text-3xl font-bold text-gray-900">{systemMetrics.totalAdmins}</p>
                    <p className="text-xs text-gray-600 mt-2">All roles</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-orange-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Briefcase className="w-8 h-8 text-orange-600" />
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Service Providers</p>
                    <p className="text-3xl font-bold text-gray-900">{systemMetrics.totalProviders}</p>
                    <p className="text-xs text-green-600 mt-2">+14 this month</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-l-4 border-l-emerald-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign className="w-8 h-8 text-emerald-600" />
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">${(systemMetrics.totalRevenue / 1000).toFixed(0)}K</p>
                    <p className="text-xs text-green-600 mt-2">+8.4% this month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-600" />
                    Recent System Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}>
                          <activity.icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Users className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Manage Users</h3>
                    <p className="text-sm text-gray-600">View and manage all user accounts</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Shield className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">Admin Controls</h3>
                    <p className="text-sm text-gray-600">Manage admin roles and permissions</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <Settings className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <h3 className="font-semibold text-gray-900 mb-2">System Settings</h3>
                    <p className="text-sm text-gray-600">Configure platform settings</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* System Health Tab */}
          {activeTab === "system" && (
            <div className="space-y-6">
              {/* System Metrics */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Server className="w-6 h-6 text-green-600" />
                      <h3 className="font-semibold text-gray-900">Uptime</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{systemMetrics.systemUptime}</p>
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">Excellent</Badge>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Activity className="w-6 h-6 text-blue-600" />
                      <h3 className="font-semibold text-gray-900">Active Sessions</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{systemMetrics.activeConnections}</p>
                    <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-100">Normal</Badge>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Database className="w-6 h-6 text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Server Load</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{systemMetrics.serverLoad}%</p>
                    <Badge className="mt-2 bg-purple-100 text-purple-800 hover:bg-purple-100">Optimal</Badge>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <AlertTriangle className="w-6 h-6 text-yellow-600" />
                      <h3 className="font-semibold text-gray-900">Alerts</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">All Clear</Badge>
                  </CardContent>
                </Card>
              </div>

              {/* System Status Details */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>System Components Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "API Server", status: "operational", uptime: "100%" },
                      { name: "Database", status: "operational", uptime: "99.9%" },
                      { name: "Authentication Service", status: "operational", uptime: "100%" },
                      { name: "Payment Gateway", status: "operational", uptime: "99.8%" },
                      { name: "Email Service", status: "operational", uptime: "100%" },
                      { name: "File Storage", status: "operational", uptime: "99.9%" }
                    ].map((component, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-gray-900">{component.name}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600">Uptime: {component.uptime}</span>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            {component.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              {/* User Growth Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>User Growth Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={userGrowthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis key="user-growth-axis" />
                      <Tooltip />
                      <Legend />
                      <Line key="users-line" type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} name="Users" />
                      <Line key="providers-line" type="monotone" dataKey="providers" stroke="#F59E0B" strokeWidth={2} name="Providers" />
                      <Line key="admins-line" type="monotone" dataKey="admins" stroke="#8B5CF6" strokeWidth={2} name="Admins" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Revenue Chart */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar key="revenue-bar" dataKey="revenue" fill="#10B981" name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
