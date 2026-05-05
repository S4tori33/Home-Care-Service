import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Calendar,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  User,
  MapPin,
  Phone,
  TrendingUp,
  AlertCircle,
  Briefcase
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const stats = {
  totalBookings: 1456,
  activeBookings: 89,
  pendingAssignment: 12,
  completedToday: 34
};

const mockBookings = [
  { id: "1", customer: "John Doe", service: "House Cleaning", provider: "Maria Garcia", date: "2026-05-05", time: "10:00 AM", address: "123 Main St, New York", status: "active" },
  { id: "2", customer: "Sarah Johnson", service: "Pet Care", provider: "Unassigned", date: "2026-05-05", time: "2:00 PM", address: "456 Oak Ave, Los Angeles", status: "pending" },
  { id: "3", customer: "Michael Brown", service: "Garden Maintenance", provider: "James Taylor", date: "2026-05-06", time: "9:00 AM", address: "789 Pine Rd, Chicago", status: "active" },
  { id: "4", customer: "Emily Davis", service: "Elderly Care", provider: "Lisa Anderson", date: "2026-05-06", time: "11:00 AM", address: "321 Elm St, Houston", status: "active" },
  { id: "5", customer: "David Wilson", service: "House Cleaning", provider: "Unassigned", date: "2026-05-07", time: "3:00 PM", address: "654 Maple Dr, Phoenix", status: "pending" }
];

export default function OperationsAdminDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredBookings = mockBookings.filter(booking => {
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Operations Admin Dashboard</h1>
                <p className="text-xs text-orange-100">Booking & Provider Assignment</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-white text-orange-600 hover:bg-white">
                🟠 Operations Admin
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
              Booking Management 📅
            </h2>
            <p className="text-gray-600">
              Manage bookings and assign service providers to customers
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Calendar className="w-8 h-8 text-blue-600" />
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                <p className="text-xs text-gray-600 mt-2">All time</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Active Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeBookings}</p>
                <p className="text-xs text-green-600 mt-2">In progress</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Pending Assignment</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingAssignment}</p>
                <p className="text-xs text-yellow-600 mt-2">Needs provider</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle2 className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Completed Today</p>
                <p className="text-3xl font-bold text-gray-900">{stats.completedToday}</p>
                <p className="text-xs text-purple-600 mt-2">Finished services</p>
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
                    placeholder="Search by customer, service, or provider..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Bookings ({filteredBookings.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{booking.customer}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{booking.service}</Badge>
                        </TableCell>
                        <TableCell>
                          {booking.provider === "Unassigned" ? (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Unassigned
                            </Badge>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-900">{booking.provider}</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-900 flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              {new Date(booking.date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              {booking.time}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">{booking.address}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          {booking.status === "active" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Active
                            </Badge>
                          ) : booking.status === "pending" ? (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          ) : (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {booking.provider === "Unassigned" ? (
                            <Button size="sm" className="gap-2">
                              <Briefcase className="w-4 h-4" />
                              Assign Provider
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="gap-2">
                              View Details
                            </Button>
                          )}
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
