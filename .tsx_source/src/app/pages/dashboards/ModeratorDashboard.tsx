import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Shield,
  LogOut,
  Flag,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  User,
  MessageSquare,
  Search,
  Filter,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const stats = {
  pendingReports: 8,
  reviewedToday: 15,
  totalReports: 234,
  actionsTaken: 42
};

const mockReports = [
  { id: "R-001", type: "Review", reportedBy: "John Doe", reportedUser: "Sarah J.", reason: "Inappropriate language", content: "Very rude during service...", status: "pending", created: "2026-05-05 11:30 AM", severity: "medium" },
  { id: "R-002", type: "Provider", reportedBy: "Emily D.", reportedUser: "Mike T.", reason: "No-show", content: "Provider didn't arrive at scheduled time", status: "pending", created: "2026-05-05 10:15 AM", severity: "high" },
  { id: "R-003", type: "Review", reportedBy: "David W.", reportedUser: "Lisa A.", reason: "Spam/fake review", content: "This review appears automated", status: "reviewed", created: "2026-05-05 09:00 AM", severity: "low" },
  { id: "R-004", type: "Message", reportedBy: "Robert M.", reportedUser: "James K.", reason: "Harassment", content: "Received threatening messages", status: "pending", created: "2026-05-05 08:45 AM", severity: "urgent" },
  { id: "R-005", type: "Profile", reportedBy: "Maria G.", reportedUser: "Alex P.", reason: "Fake identity", content: "Using someone else's photos", status: "reviewed", created: "2026-05-04 04:20 PM", severity: "high" }
];

export default function ModeratorDashboard() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");

  const filteredReports = mockReports.filter(report => {
    const matchesSearch =
      report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-800 to-slate-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-gray-800" />
              </div>
              <div>
                <h1 className="font-bold text-xl">Moderator Dashboard</h1>
                <p className="text-xs text-gray-300">Content Moderation & Reports</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-white text-gray-800 hover:bg-white">
                ⚖️ Moderator
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
              Content Moderation ⚖️
            </h2>
            <p className="text-gray-600">
              Review reported content and maintain community standards
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Flag className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Pending Reports</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingReports}</p>
                <p className="text-xs text-red-600 mt-2">Requires review</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Eye className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Reviewed Today</p>
                <p className="text-3xl font-bold text-gray-900">{stats.reviewedToday}</p>
                <p className="text-xs text-green-600 mt-2">Great progress</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-blue-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <AlertTriangle className="w-8 h-8 text-blue-600" />
                  <TrendingUp className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalReports}</p>
                <p className="text-xs text-gray-600 mt-2">All time</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Actions Taken</p>
                <p className="text-3xl font-bold text-gray-900">{stats.actionsTaken}</p>
                <p className="text-xs text-purple-600 mt-2">Enforcement actions</p>
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
                    placeholder="Search by report ID, user, or reason..."
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
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="reviewed">Reviewed</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Reported Content ({filteredReports.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Reported User</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Content Preview</TableHead>
                      <TableHead className="text-center">Severity</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-mono text-sm font-semibold text-gray-900">
                          {report.id}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{report.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="font-medium text-gray-900">{report.reportedUser}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {report.reason}
                        </TableCell>
                        <TableCell className="max-w-xs truncate text-sm text-gray-600">
                          {report.content}
                        </TableCell>
                        <TableCell className="text-center">
                          {report.severity === "urgent" ? (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>
                          ) : report.severity === "high" ? (
                            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">High</Badge>
                          ) : report.severity === "medium" ? (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Medium</Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Low</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {report.status === "pending" ? (
                            <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                              <AlertTriangle className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Reviewed
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {report.status === "pending" ? (
                            <div className="flex items-center justify-end gap-2">
                              <Button size="sm" variant="outline" className="gap-2">
                                <Eye className="w-4 h-4" />
                                Review
                              </Button>
                              <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                                <CheckCircle2 className="w-4 h-4" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                                <XCircle className="w-4 h-4" />
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">Completed</span>
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
