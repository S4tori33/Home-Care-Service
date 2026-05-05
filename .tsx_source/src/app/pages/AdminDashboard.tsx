import { useState } from "react";
import { useNavigate } from "react-router";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  DollarSign,
  TrendingUp,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  UserPlus,
  Settings,
  LogOut,
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Mock admin data
const adminUser = {
  name: "Admin User",
  email: "admin@homecare.com",
  role: "Super Admin"
};

// Mock statistics data
const stats = {
  totalUsers: 1248,
  totalJobseekers: 342,
  activeBookings: 89,
  monthlyRevenue: 45280,
  newUsersThisMonth: 127,
  completedBookings: 1456
};

// Mock chart data
const monthlyBookingsData = [
  { month: 'Oct', bookings: 45, revenue: 5400 },
  { month: 'Nov', bookings: 62, revenue: 7440 },
  { month: 'Dec', bookings: 78, revenue: 9360 },
  { month: 'Jan', bookings: 91, revenue: 10920 },
  { month: 'Feb', bookings: 85, revenue: 10200 },
  { month: 'Mar', bookings: 103, revenue: 12360 },
  { month: 'Apr', bookings: 89, revenue: 10680 }
];

const serviceDistributionData = [
  { name: 'House Cleaning', value: 435, color: '#3B82F6' },
  { name: 'Garden Maintenance', value: 289, color: '#10B981' },
  { name: 'Pet Care', value: 234, color: '#F59E0B' },
  { name: 'Elderly Care', value: 312, color: '#EF4444' },
  { name: 'Handyman', value: 186, color: '#8B5CF6' }
];

// Mock users data
const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    city: "New York",
    bookings: 12,
    totalSpent: 1440,
    memberSince: "2024-01-15",
    status: "active"
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@example.com",
    phone: "(555) 234-5678",
    city: "Los Angeles",
    bookings: 8,
    totalSpent: 960,
    memberSince: "2024-02-20",
    status: "active"
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Brown",
    email: "m.brown@example.com",
    phone: "(555) 345-6789",
    city: "Chicago",
    bookings: 15,
    totalSpent: 1800,
    memberSince: "2023-11-10",
    status: "active"
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@example.com",
    phone: "(555) 456-7890",
    city: "Houston",
    bookings: 5,
    totalSpent: 600,
    memberSince: "2024-03-05",
    status: "active"
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Wilson",
    email: "david.w@example.com",
    phone: "(555) 567-8901",
    city: "Phoenix",
    bookings: 2,
    totalSpent: 240,
    memberSince: "2024-04-12",
    status: "inactive"
  }
];

// Mock jobseekers data
const mockJobseekers = [
  {
    id: "1",
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.g@example.com",
    phone: "(555) 111-2222",
    city: "Miami",
    skills: ["House Cleaning", "Pet Care"],
    rating: 4.8,
    completedJobs: 45,
    joinedDate: "2023-09-15",
    status: "active",
    availability: "Full-time"
  },
  {
    id: "2",
    firstName: "James",
    lastName: "Taylor",
    email: "j.taylor@example.com",
    phone: "(555) 222-3333",
    city: "Seattle",
    skills: ["Garden Maintenance", "Handyman"],
    rating: 4.9,
    completedJobs: 67,
    joinedDate: "2023-07-20",
    status: "active",
    availability: "Full-time"
  },
  {
    id: "3",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.a@example.com",
    phone: "(555) 333-4444",
    city: "Boston",
    skills: ["Elderly Care"],
    rating: 5.0,
    completedJobs: 89,
    joinedDate: "2023-05-10",
    status: "active",
    availability: "Part-time"
  },
  {
    id: "4",
    firstName: "Robert",
    lastName: "Martinez",
    email: "robert.m@example.com",
    phone: "(555) 444-5555",
    city: "Denver",
    skills: ["House Cleaning", "Garden Maintenance"],
    rating: 4.6,
    completedJobs: 34,
    joinedDate: "2023-12-01",
    status: "active",
    availability: "Full-time"
  },
  {
    id: "5",
    firstName: "Jennifer",
    lastName: "Lee",
    email: "jennifer.l@example.com",
    phone: "(555) 555-6666",
    city: "Portland",
    skills: ["Pet Care"],
    rating: 4.7,
    completedJobs: 28,
    joinedDate: "2024-01-18",
    status: "inactive",
    availability: "Part-time"
  }
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "jobseekers">("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredJobseekers = mockJobseekers.filter(jobseeker => {
    const matchesSearch =
      jobseeker.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobseeker.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobseeker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      jobseeker.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || jobseeker.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
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
                <p className="text-xs text-gray-600">Admin Dashboard</p>
              </div>
            </button>

            <div className="flex items-center gap-4">
              <div className="hidden md:block text-right">
                <p className="font-semibold text-gray-900">{adminUser.name}</p>
                <p className="text-xs text-gray-600">{adminUser.role}</p>
              </div>
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
              Welcome back, {adminUser.name} 👋
            </h2>
            <p className="text-gray-600">
              Manage users, monitor activity, and view platform statistics
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
              <LayoutDashboard className="w-4 h-4 inline mr-2" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "users"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Users ({stats.totalUsers})
            </button>
            <button
              onClick={() => setActiveTab("jobseekers")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "jobseekers"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Briefcase className="w-4 h-4 inline mr-2" />
              Job Seekers ({stats.totalJobseekers})
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Total Users</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+{stats.newUsersThisMonth} this month</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-purple-600" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Job Seekers</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalJobseekers}</p>
                    <p className="text-xs text-gray-600 mt-2">Active workers</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <Clock className="w-5 h-5 text-orange-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
                    <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
                    <p className="text-xs text-gray-600 mt-2">{stats.completedBookings} completed</p>
                  </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <DollarSign className="w-6 h-6 text-emerald-600" />
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                    <p className="text-3xl font-bold text-gray-900">${stats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600 mt-2">+12% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Charts Section */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Bookings & Revenue Trend */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Bookings & Revenue Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyBookingsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis key="left-axis" yAxisId="left" />
                        <YAxis key="right-axis" yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Legend />
                        <Line
                          key="bookings-line"
                          yAxisId="left"
                          type="monotone"
                          dataKey="bookings"
                          stroke="#3B82F6"
                          strokeWidth={2}
                          name="Bookings"
                        />
                        <Line
                          key="revenue-line"
                          yAxisId="right"
                          type="monotone"
                          dataKey="revenue"
                          stroke="#10B981"
                          strokeWidth={2}
                          name="Revenue ($)"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Service Distribution */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle>Service Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={serviceDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {serviceDistributionData.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Monthly Performance */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyBookingsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar key="bookings-bar" dataKey="bookings" fill="#3B82F6" name="Total Bookings" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Quick Stats Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Completion Rate</p>
                        <p className="text-2xl font-bold text-gray-900">94.2%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Users className="w-10 h-10 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-600">Avg. User Rating</p>
                        <p className="text-2xl font-bold text-gray-900">4.7/5.0</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <TrendingUp className="w-10 h-10 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-600">Growth Rate</p>
                        <p className="text-2xl font-bold text-gray-900">+23%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {/* Filters and Search */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search users by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="gap-2">
                      <UserPlus className="w-4 h-4" />
                      Add User
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Users Table */}
              <Card className="shadow-lg">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead className="text-center">Bookings</TableHead>
                          <TableHead className="text-center">Total Spent</TableHead>
                          <TableHead>Member Since</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold">
                                    {user.firstName[0]}{user.lastName[0]}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {user.firstName} {user.lastName}
                                  </p>
                                  <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-900 flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  {user.email}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  {user.phone}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <p className="text-sm text-gray-900 flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                {user.city}
                              </p>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{user.bookings}</Badge>
                            </TableCell>
                            <TableCell className="text-center font-semibold text-gray-900">
                              ${user.totalSpent.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {new Date(user.memberSince).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </TableCell>
                            <TableCell className="text-center">
                              {user.status === "active" ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Active
                                </Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Inactive
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit User
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete User
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Job Seekers Tab */}
          {activeTab === "jobseekers" && (
            <div className="space-y-6">
              {/* Filters and Search */}
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Search job seekers by name, email or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full md:w-48">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="gap-2">
                      <UserPlus className="w-4 h-4" />
                      Add Job Seeker
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Job Seekers Table */}
              <Card className="shadow-lg">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Job Seeker</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Skills</TableHead>
                          <TableHead className="text-center">Rating</TableHead>
                          <TableHead className="text-center">Completed Jobs</TableHead>
                          <TableHead>Availability</TableHead>
                          <TableHead>Joined</TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredJobseekers.map((jobseeker) => (
                          <TableRow key={jobseeker.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-semibold">
                                    {jobseeker.firstName[0]}{jobseeker.lastName[0]}
                                  </span>
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {jobseeker.firstName} {jobseeker.lastName}
                                  </p>
                                  <p className="text-sm text-gray-600">{jobseeker.email}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <p className="text-sm text-gray-900 flex items-center gap-2">
                                  <Mail className="w-4 h-4 text-gray-400" />
                                  {jobseeker.email}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <Phone className="w-4 h-4 text-gray-400" />
                                  {jobseeker.phone}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-gray-400" />
                                  {jobseeker.city}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {jobseeker.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <div className="flex items-center justify-center gap-1">
                                <span className="text-yellow-500">★</span>
                                <span className="font-semibold text-gray-900">{jobseeker.rating}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge variant="outline">{jobseeker.completedJobs}</Badge>
                            </TableCell>
                            <TableCell>
                              <Badge
                                className={
                                  jobseeker.availability === "Full-time"
                                    ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                    : "bg-orange-100 text-orange-800 hover:bg-orange-100"
                                }
                              >
                                {jobseeker.availability}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-sm text-gray-600">
                              {new Date(jobseeker.joinedDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </TableCell>
                            <TableCell className="text-center">
                              {jobseeker.status === "active" ? (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <CheckCircle2 className="w-3 h-3 mr-1" />
                                  Active
                                </Badge>
                              ) : (
                                <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Inactive
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit Profile
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Delete Profile
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
