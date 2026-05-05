import { useState } from "react";
import { useNavigate } from "react-router";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Briefcase,
  Award,
  Star,
  Clock,
  Edit,
  Save,
  X,
  ArrowLeft,
  CheckCircle,
  DollarSign,
  FileText,
  GraduationCap,
  TrendingUp,
  Heart,
  Sparkles,
  Leaf,
  PawPrint,
  Shield,
  Home as HomeIcon,
  Plus,
  Upload,
  Settings,
  MessageSquare
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Badge } from "../components/ui/badge";
import { Textarea } from "../components/ui/textarea";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";

// Mock jobseeker data
const initialJobseekerData = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "sarah.johnson@example.com",
  phone: "(555) 987-6543",
  address: "456 Oak Avenue",
  city: "Brooklyn",
  state: "NY",
  zipCode: "11201",
  bio: "Experienced home care professional with 5+ years of expertise in house cleaning, elderly care, and pet care. Passionate about providing exceptional service and building lasting relationships with clients.",
  title: "Senior Home Care Specialist",
  memberSince: "March 2023",
  totalJobs: 87,
  rating: 4.9,
  reviewCount: 64,
  hourlyRate: "25-45",
  skills: [
    { name: "House Cleaning", level: "Expert", icon: Sparkles },
    { name: "Elderly Care", level: "Expert", icon: Heart },
    { name: "Pet Care", level: "Advanced", icon: PawPrint },
    { name: "Garden Maintenance", level: "Intermediate", icon: Leaf }
  ],
  certifications: [
    { name: "CPR & First Aid Certified", issuer: "Red Cross", year: "2025" },
    { name: "Professional Cleaning Certification", issuer: "ISSA", year: "2024" },
    { name: "Pet Care Professional", issuer: "NAPPS", year: "2023" }
  ],
  experience: [
    { 
      title: "Senior Care Provider", 
      company: "Home Care Plus", 
      period: "2021 - 2023",
      description: "Provided comprehensive care for elderly clients including medication management, meal preparation, and companionship."
    },
    { 
      title: "Professional Cleaner", 
      company: "Sparkle Clean Co", 
      period: "2019 - 2021",
      description: "Delivered high-quality cleaning services for residential and commercial clients."
    }
  ],
  availability: {
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: false
  },
  preferredHours: "8:00 AM - 6:00 PM",
  activelyLooking: true
};

const reviews = [
  {
    id: "1",
    client: "Michael R.",
    rating: 5,
    date: "March 15, 2026",
    comment: "Sarah is absolutely wonderful! She took care of my elderly mother with such compassion and professionalism. Highly recommended!",
    service: "Elderly Care"
  },
  {
    id: "2",
    client: "Jennifer L.",
    rating: 5,
    date: "March 10, 2026",
    comment: "Best cleaning service I've ever had! Sarah is thorough, trustworthy, and always on time. My house has never looked better.",
    service: "House Cleaning"
  },
  {
    id: "3",
    client: "David K.",
    rating: 5,
    date: "March 5, 2026",
    comment: "Sarah took excellent care of our two dogs while we were away. They loved her! Will definitely book again.",
    service: "Pet Care"
  }
];

export default function JobseekerProfile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [jobseekerData, setJobseekerData] = useState(initialJobseekerData);
  const [editedData, setEditedData] = useState(initialJobseekerData);

  const handleSave = () => {
    setJobseekerData(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(jobseekerData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
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
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Jobseeker Profile</h1>
                <p className="text-sm text-gray-600">Manage your professional profile and availability</p>
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
        <div className="max-w-7xl mx-auto">
          {/* Top Section - Profile Header */}
          <Card className="shadow-lg mb-6">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-32 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-5xl font-bold text-white">
                    {jobseekerData.firstName[0]}{jobseekerData.lastName[0]}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-1">
                        {jobseekerData.firstName} {jobseekerData.lastName}
                      </h2>
                      <p className="text-lg text-gray-600 mb-2">{jobseekerData.title}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-gray-900">{jobseekerData.rating}</span>
                          <span className="text-gray-600">({jobseekerData.reviewCount} reviews)</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified Professional
                        </Badge>
                        {jobseekerData.activelyLooking && (
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            <Briefcase className="w-3 h-3 mr-1" />
                            Available for Work
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600">${jobseekerData.hourlyRate}</div>
                      <div className="text-sm text-gray-600">per hour</div>
                    </div>
                  </div>

                  {isEditing ? (
                    <Textarea
                      value={editedData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      className="mt-3"
                      rows={3}
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{jobseekerData.bio}</p>
                  )}
                </div>
              </div>

              {/* Stats Grid */}
              <Separator className="my-6" />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{jobseekerData.totalJobs}</div>
                  <div className="text-sm text-gray-600">Jobs Completed</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{jobseekerData.rating}</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{jobseekerData.reviewCount}</div>
                  <div className="text-sm text-gray-600">Client Reviews</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">98%</div>
                  <div className="text-sm text-gray-600">Response Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Skills & Expertise */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      Skills & Expertise
                    </CardTitle>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Skill
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {jobseekerData.skills.map((skill, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-3 p-4 border rounded-lg hover:shadow-md transition-shadow"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <skill.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{skill.name}</p>
                          <Badge variant="outline" className="mt-1">
                            {skill.level}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5" />
                      Work Experience
                    </CardTitle>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Experience
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {jobseekerData.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                      <h4 className="font-semibold text-lg text-gray-900">{exp.title}</h4>
                      <p className="text-gray-600 mb-1">{exp.company}</p>
                      <p className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {exp.period}
                      </p>
                      <p className="text-gray-700">{exp.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Certifications */}
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5" />
                      Certifications & Licenses
                    </CardTitle>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Certification
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {jobseekerData.certifications.map((cert, index) => (
                    <div 
                      key={index}
                      className="flex items-start gap-3 p-4 border rounded-lg"
                    >
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{cert.name}</p>
                        <p className="text-sm text-gray-600">{cert.issuer} • {cert.year}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Client Reviews */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Client Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-semibold text-gray-900">{review.client}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {review.service}
                            </Badge>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-1 space-y-6">
              {/* Contact Information */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Contact Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs text-gray-600">Email</Label>
                    {isEditing ? (
                      <Input
                        value={editedData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{jobseekerData.email}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Phone</Label>
                    {isEditing ? (
                      <Input
                        value={editedData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{jobseekerData.phone}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">Location</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {jobseekerData.city}, {jobseekerData.state}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Availability */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Availability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    {Object.entries(jobseekerData.availability).map(([day, available]) => (
                      <div key={day} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm font-medium text-gray-900 capitalize">{day}</span>
                        <Switch
                          checked={available}
                          disabled={!isEditing}
                        />
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div>
                    <Label className="text-xs text-gray-600">Preferred Hours</Label>
                    {isEditing ? (
                      <Input
                        value={editedData.preferredHours}
                        onChange={(e) => handleInputChange("preferredHours", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{jobseekerData.preferredHours}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio/Documents */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="w-4 h-4 mr-2" />
                    Resume.pdf
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Background Check
                  </Button>
                  {isEditing && (
                    <Button variant="outline" className="w-full justify-start gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Document
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start">
                    <Briefcase className="w-5 h-5 mr-3" />
                    Browse Jobs
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-5 h-5 mr-3" />
                    View Analytics
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-5 h-5 mr-3" />
                    Account Settings
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
