import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Headphones,
  LogOut,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  User,
  Mail,
  TrendingUp,
  Search,
  Filter
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
  openTickets: 15,
  resolvedToday: 28,
  avgResponseTime: "12 min",
  satisfaction: 94
};

const mockTickets = [
  { id: "T-1234", customer: "John Doe", email: "john@example.com", subject: "Booking issue", category: "Booking", priority: "high", status: "open", created: "2026-05-05 10:30 AM" },
  { id: "T-1235", customer: "Sarah Johnson", email: "sarah@example.com", subject: "Payment not processed", category: "Payment", priority: "urgent", status: "open", created: "2026-05-05 11:15 AM" },
  { id: "T-1236", customer: "Michael Brown", email: "michael@example.com", subject: "Provider no-show", category: "Service", priority: "high", status: "in_progress", created: "2026-05-05 09:45 AM" },
  { id: "T-1237", customer: "Emily Davis", email: "emily@example.com", subject: "Account access issue", category: "Account", priority: "medium", status: "open", created: "2026-05-05 08:20 AM" },
  { id: "T-1238", customer: "David Wilson", email: "david@example.com", subject: "Question about services", category: "General", priority: "low", status: "resolved", created: "2026-05-04 04:30 PM" }
];

export default function CustomerSupportDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch =
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-teal-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Headphones className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Customer Support Dashboard</h1>
                <p className="text-xs text-teal-100">Help Center & Ticket Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-white text-teal-600 hover:bg-white">
                🎧 Customer Support
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
              Support Center 🎧
            </h2>
            <p className="text-gray-600">
              Manage customer tickets and provide assistance
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg border-l-4 border-l-orange-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <AlertCircle className="w-8 h-8 text-orange-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Open Tickets</p>
                <p className="text-3xl font-bold text-gray-900">{stats.openTickets}</p>
                <p className="text-xs text-orange-600 mt-2">Needs attention</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Resolved Today</p>
                <p className="text-3xl font-bold text-gray-900">{stats.resolvedToday}</p>
                <p className="text-xs text-green-600 mt-2">Great job!</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Clock className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
                <p className="text-3xl font-bold text-gray-900">{stats.avgResponseTime}</p>
                <p className="text-xs text-blue-600 mt-2">Under target</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Satisfaction Rate</p>
                <p className="text-3xl font-bold text-gray-900">{stats.satisfaction}%</p>
                <p className="text-xs text-purple-600 mt-2">Excellent!</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="shadow-lg mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search tickets by ID, customer, or subject..."
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
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tickets Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Support Tickets ({filteredTickets.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-center">Priority</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono text-sm font-semibold text-gray-900">
                          {ticket.id}
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900 flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              {ticket.customer}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {ticket.email}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-gray-900">
                          {ticket.subject}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{ticket.category}</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          {ticket.priority === "urgent" ? (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>
                          ) : ticket.priority === "high" ? (
                            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
                          ) : ticket.priority === "medium" ? (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {ticket.status === "open" ? (
                            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                              <AlertCircle className="w-3 h-3 mr-1" />
                              Open
                            </Badge>
                          ) : ticket.status === "in_progress" ? (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                              <Clock className="w-3 h-3 mr-1" />
                              In Progress
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Resolved
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {ticket.created}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" className="gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Respond
                          </Button>
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
