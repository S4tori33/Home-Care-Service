import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Briefcase,
  LogOut,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Download,
  Eye,
  TrendingUp
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const stats = {
  pendingApplications: 23,
  approvedThisMonth: 45,
  rejectedThisMonth: 8,
  totalProviders: 342
};

const mockApplications = [
  { id: "1", name: "Maria Garcia", email: "maria.g@example.com", phone: "(555) 111-2222", serviceType: "House Cleaning", experience: "5 years", appliedDate: "2024-05-01", status: "pending" },
  { id: "2", name: "James Taylor", email: "j.taylor@example.com", phone: "(555) 222-3333", serviceType: "Garden Maintenance", experience: "8 years", appliedDate: "2024-05-02", status: "pending" },
  { id: "3", name: "Lisa Anderson", email: "lisa.a@example.com", phone: "(555) 333-4444", serviceType: "Elderly Care", experience: "10 years", appliedDate: "2024-05-02", status: "pending" },
  { id: "4", name: "Robert Martinez", email: "robert.m@example.com", phone: "(555) 444-5555", serviceType: "Pet Care", experience: "3 years", appliedDate: "2024-04-28", status: "approved" },
  { id: "5", name: "Jennifer Lee", email: "jennifer.l@example.com", phone: "(555) 555-6666", serviceType: "House Cleaning", experience: "2 years", appliedDate: "2024-04-25", status: "rejected" }
];

export default function HRAdminDashboard() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  const filteredApplications = selectedStatus === "all"
    ? mockApplications
    : mockApplications.filter(app => app.status === selectedStatus);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="font-bold text-xl">HR Admin Dashboard</h1>
                <p className="text-xs text-purple-100">Application Review & Provider Management</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge className="bg-white text-purple-600 hover:bg-white">
                🟣 HR Admin
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
              Application Review 📋
            </h2>
            <p className="text-gray-600">
              Review and approve service provider applications
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-lg border-l-4 border-l-yellow-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Clock className="w-8 h-8 text-yellow-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingApplications}</p>
                <p className="text-xs text-yellow-600 mt-2">Requires attention</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-green-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Approved This Month</p>
                <p className="text-3xl font-bold text-gray-900">{stats.approvedThisMonth}</p>
                <p className="text-xs text-green-600 mt-2">New providers onboarded</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Rejected This Month</p>
                <p className="text-3xl font-bold text-gray-900">{stats.rejectedThisMonth}</p>
                <p className="text-xs text-gray-600 mt-2">Did not meet criteria</p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-l-4 border-l-purple-500">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <Briefcase className="w-8 h-8 text-purple-600" />
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 mb-1">Total Providers</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProviders}</p>
                <p className="text-xs text-green-600 mt-2">+{stats.approvedThisMonth} this month</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 border-b overflow-x-auto">
            {(["all", "pending", "approved", "rejected"] as const).map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-6 py-3 font-medium transition-colors whitespace-nowrap capitalize ${
                  selectedStatus === status
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {status} ({status === "all" ? mockApplications.length : mockApplications.filter(a => a.status === status).length})
              </button>
            ))}
          </div>

          {/* Applications Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Applications ({filteredApplications.length})</CardTitle>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Applicant</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Applied Date</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{application.name}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="text-sm text-gray-900 flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {application.email}
                            </p>
                            <p className="text-sm text-gray-600 flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {application.phone}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{application.serviceType}</Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-900">
                          {application.experience}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          {new Date(application.appliedDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </TableCell>
                        <TableCell className="text-center">
                          {application.status === "pending" ? (
                            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </Badge>
                          ) : application.status === "approved" ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Approved
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                              <XCircle className="w-3 h-3 mr-1" />
                              Rejected
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="outline" size="sm" className="gap-2">
                              <Eye className="w-4 h-4" />
                              Review
                            </Button>
                            {application.status === "pending" && (
                              <>
                                <Button size="sm" className="gap-2 bg-green-600 hover:bg-green-700">
                                  <CheckCircle2 className="w-4 h-4" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline" className="gap-2 text-red-600 hover:text-red-700">
                                  <XCircle className="w-4 h-4" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
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
