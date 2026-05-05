import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Calendar, Clock, MapPin, User, Mail, Phone, MessageSquare, Sparkles, Leaf, PawPrint, Heart, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "sonner";

const services = [
  { id: "house-cleaning", name: "House Cleaning", icon: Sparkles, color: "blue" },
  { id: "garden-maintenance", name: "Garden Maintenance", icon: Leaf, color: "green" },
  { id: "pet-care", name: "Pet Care", icon: PawPrint, color: "amber" },
  { id: "elderly-care", name: "Elderly Care and Support", icon: Heart, color: "rose" }
];

export default function BookService() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    specialInstructions: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!formData.service) {
          toast.error("Please select a service");
          return false;
        }
        return true;
      case 2:
        if (!formData.date || !formData.time) {
          toast.error("Please select both date and time");
          return false;
        }
        return true;
      case 3:
        if (!formData.firstName || !formData.email || !formData.phone) {
          toast.error("Please fill in all required contact fields");
          return false;
        }
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error("Please enter a valid email address");
          return false;
        }
        return true;
      case 4:
        if (!formData.address) {
          toast.error("Please enter your service address");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(4)) {
      return;
    }

    // Simulate booking submission
    setIsSubmitted(true);
    toast.success("Booking request submitted successfully!");
  };

  const getSelectedService = () => {
    return services.find(s => s.id === formData.service);
  };

  if (isSubmitted) {
    const selectedService = getSelectedService();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full shadow-2xl">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for choosing Home Care Service. We've received your booking request and will contact you within 24 hours to confirm the details.
            </p>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">Booking Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {selectedService && <selectedService.icon className="w-5 h-5 text-blue-600" />}
                  <span className="text-gray-700"><span className="font-medium">Service:</span> {selectedService?.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700"><span className="font-medium">Date:</span> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700"><span className="font-medium">Time:</span> {formData.time}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700"><span className="font-medium">Email:</span> {formData.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700"><span className="font-medium">Location:</span> {formData.address}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate("/dashboard")}
              >
                View Dashboard
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/")}
              >
                Return to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HCS</span>
              </div>
              <div>
                <h1 className="font-bold text-xl text-gray-900">Home Care Service</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl mb-4 text-gray-900">Book a Service</h1>
            <p className="text-lg text-gray-600">
              Fill out the form below and we'll get back to you within 24 hours to confirm your booking.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {[
                { num: 1, label: "Service" },
                { num: 2, label: "Schedule" },
                { num: 3, label: "Contact" },
                { num: 4, label: "Location" }
              ].map((step, index) => (
                <div key={step.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step.num 
                        ? "bg-blue-600 text-white" 
                        : "bg-gray-200 text-gray-500"
                    }`}>
                      {currentStep > step.num ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        step.num
                      )}
                    </div>
                    <span className={`text-xs mt-2 font-medium ${
                      currentStep >= step.num ? "text-blue-600" : "text-gray-500"
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className={`h-1 flex-1 mx-2 -mt-6 transition-all ${
                      currentStep > step.num ? "bg-blue-600" : "bg-gray-200"
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl">
                {currentStep === 1 && "Select Your Service"}
                {currentStep === 2 && "Choose Date & Time"}
                {currentStep === 3 && "Your Contact Information"}
                {currentStep === 4 && "Service Location & Details"}
              </CardTitle>
              <p className="text-blue-100 text-sm">Step {currentStep} of 4</p>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Service Selection */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-900">
                      What service do you need?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <button
                          key={service.id}
                          type="button"
                          onClick={() => handleInputChange("service", service.id)}
                          className={`p-6 border-2 rounded-xl text-left transition-all hover:shadow-lg ${
                            formData.service === service.id
                              ? "border-blue-600 bg-blue-50 shadow-md"
                              : "border-gray-200 hover:border-blue-300"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${
                              formData.service === service.id 
                                ? "bg-blue-600" 
                                : `bg-${service.color}-100`
                            }`}>
                              <service.icon className={`w-6 h-6 ${
                                formData.service === service.id 
                                  ? "text-white" 
                                  : `text-${service.color}-600`
                              }`} />
                            </div>
                            <div className="flex-1">
                              <span className="font-semibold text-gray-900 block mb-1">
                                {service.name}
                              </span>
                              <span className="text-sm text-gray-600">
                                {service.id === "house-cleaning" && "Professional cleaning for your home"}
                                {service.id === "garden-maintenance" && "Expert care for your outdoor space"}
                                {service.id === "pet-care" && "Loving care for your pets"}
                                {service.id === "elderly-care" && "Compassionate support for seniors"}
                              </span>
                            </div>
                            {formData.service === service.id && (
                              <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      When would you like us to come?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date" className="text-base">Preferred Date *</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="text-base py-6"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-base">Preferred Time Slot *</Label>
                        <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                          <SelectTrigger id="time" className="text-base py-6">
                            <SelectValue placeholder="Select time slot" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="8:00 AM - 10:00 AM">8:00 AM - 10:00 AM</SelectItem>
                            <SelectItem value="10:00 AM - 12:00 PM">10:00 AM - 12:00 PM</SelectItem>
                            <SelectItem value="12:00 PM - 2:00 PM">12:00 PM - 2:00 PM</SelectItem>
                            <SelectItem value="2:00 PM - 4:00 PM">2:00 PM - 4:00 PM</SelectItem>
                            <SelectItem value="4:00 PM - 6:00 PM">4:00 PM - 6:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        <strong>Note:</strong> These are preferred time slots. We'll confirm the exact time when we contact you.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 3: Contact Information */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      How can we reach you?
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-base">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="John"
                          className="text-base py-6"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-base">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Doe"
                          className="text-base py-6"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-base">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="john@example.com"
                          className="pl-11 text-base py-6"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-base">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-4 w-5 h-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="(555) 123-4567"
                          className="pl-11 text-base py-6"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 4: Service Address & Special Instructions */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Where should we provide the service?
                    </h3>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-base">Street Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="123 Main Street, Apt 4B"
                        className="text-base py-6"
                        required
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-base">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="New York"
                          className="text-base py-6"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode" className="text-base">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          placeholder="10001"
                          className="text-base py-6"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="specialInstructions" className="text-base">
                        Special Instructions (Optional)
                      </Label>
                      <Textarea
                        id="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                        placeholder="Please provide any special instructions, access codes, parking information, or specific requirements..."
                        rows={5}
                        className="text-base"
                      />
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="lg"
                      onClick={handlePrevious}
                      className="flex-1"
                    >
                      Previous
                    </Button>
                  )}
                  {currentStep < 4 ? (
                    <Button 
                      type="button" 
                      size="lg"
                      onClick={handleNext}
                      className="flex-1"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      size="lg"
                      className="flex-1"
                    >
                      Submit Booking Request
                    </Button>
                  )}
                </div>

                <p className="text-sm text-gray-600 text-center pt-4">
                  By submitting this form, you agree to our Terms of Service and Privacy Policy.
                  We'll contact you within 24 hours to confirm your booking.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}