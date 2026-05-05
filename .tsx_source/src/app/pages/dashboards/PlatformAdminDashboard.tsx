import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Download,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  LogOut,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  XCircle,
  Shield,
  Ban,
  TrendingUp
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const stats = {
  totalUsers: 1248,
  activeUsers: 1156,
  newUsersThisMonth: 127,
  bannedUsers: 5
};

const mockUsers = [
  { id: "1", firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "(555) 123-4567", city: "New York", bookings: 12, totalSpent: 1440, memberSince: "2024-01-15", status: "active" },
  { id: "2", firstName: "Sarah", lastName: "Johnson", email: "sarah.j@example.com", phone: "(555) 234-5678", city: "Los Angeles", bookings: 8, totalSpent: 960, memberSince: "2024-02-20", status: "active" },
  { id: "3", firstName: "Michael", lastName: "Brown", email: "m.brown@example.com", phone: "(555) 345-6789", city: "Chicago", bookings: 15, totalSpent: 1800, memberSince: "2023-11-10", status: "active" },
  { id: "4", firstName: "Emily", lastName: "Davis", email: "emily.d@example.com", phone: "(555) 456-7890", city: "Houston", bookings: 5, totalSpent: 600, memberSince: "2024-03-05", status: "active" },
  { id: "5", firstName: "David", lastName: "Wilson", email: "david.w@example.com", phone: "(555) 567-8901", city: "Phoenix", bookings: 2, totalSpent: 240, memberSince: "2024-04-12", status: "inactive" },
  { id: "6", firstName: "Lisa", lastName: "Anderson", email: "lisa.a@example.com", phone: "(555) 678-9012", city: "Philadelphia", bookings: 0, totalSpent: 0, memberSince: "2024-05-01", status: "banned" }
];

export default function PlatformAdminDashboard() {
  const navigate = useNavigate();
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Platform Admin Dashboard</h1>
                <p className="text-xs text-blue-100">User Management & Control</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-white text-blue-600 hover:bg-white">
                🔵 Platform Admin
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
              User Management 👥
            </h2>
            <p className="text-gray-600">
              Manage all user accounts, permissions, and activities
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                <p className="text-xs text-green-600 mt-2">+{stats.newUsersThisMonth} this month</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeUsers}</p>
                <p className="text-xs text-gray-600 mt-2">{((stats.activeUsers / stats.totalUsers) * 100).toFixed(1)}% of total</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <UserPlus className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">New This Month</p>
                <p className="text-3xl font-bold text-gray-900">{stats.newUsersThisMonth}</p>
                <p className="text-xs text-purple-600 mt-2">Growing steadily</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Ban className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Banned Users</p>
                <p className="text-3xl font-bold text-gray-900">{stats.bannedUsers}</p>
                <p className="text-xs text-gray-600 mt-2">Requires attention</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="shadow-lg mb-6">
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
                    <SelectItem value="banned">Banned</SelectItem>
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
            <CardHeader>
              <CardTitle>All Users ({filteredUsers.length})</CardTitle>
            </CardHeader>
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
                          ) : user.status === "banned" ? (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                              <Ban className="w-3 h-3 mr-1" />
                              Banned
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
                              <DropdownMenuItem>
                                <Shield className="w-4 h-4 mr-2" />
                                Change Permissions
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                {user.status === "banned" ? (
                                  <>
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Unban User
                                  </>
                                ) : (
                                  <>
                                    <Ban className="w-4 h-4 mr-2" />
                                    Ban User
                                  </>
                                )}
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
      </main>
    </div>
  );
}
