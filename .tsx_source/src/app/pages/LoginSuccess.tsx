import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

type UserRole =
  | "super_admin"
  | "platform_admin"
  | "hr_admin"
  | "operations_admin"
  | "caregiver"
  | "pet_care"
  | "garden_maintenance"
  | "house_cleaning"
  | "regular_user"
  | "customer_support"
  | "moderator";

const roleLabels: Record<UserRole, string> = {
  "super_admin": "Super Admin",
  "platform_admin": "Platform Admin",
  "hr_admin": "HR Admin",
  "operations_admin": "Operations Admin",
  "caregiver": "Caregiver",
  "pet_care": "Pet Care Provider",
  "garden_maintenance": "Garden Maintenance",
  "house_cleaning": "House Cleaning",
  "regular_user": "Regular User",
  "customer_support": "Customer Support",
  "moderator": "Moderator"
};

const roleDashboardRoutes: Record<UserRole, string> = {
  "super_admin": "/dashboard/super-admin",
  "platform_admin": "/dashboard/platform-admin",
  "hr_admin": "/dashboard/hr-admin",
  "operations_admin": "/dashboard/operations-admin",
  "caregiver": "/dashboard/caregiver",
  "pet_care": "/dashboard/pet-care",
  "garden_maintenance": "/dashboard/garden-maintenance",
  "house_cleaning": "/dashboard/house-cleaning",
  "regular_user": "/dashboard/user",
  "customer_support": "/dashboard/support",
  "moderator": "/dashboard/moderator"
};

export default function LoginSuccess() {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole>("user");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole") as UserRole;
    const email = localStorage.getItem("userEmail");

    if (!role || !email) {
      navigate("/login");
      return;
    }

    setUserRole(role);
    setUserEmail(email);
  }, [navigate]);

  const handleContinue = () => {
    const dashboardRoute = roleDashboardRoutes[userRole];
    navigate(dashboardRoute);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full shadow-xl">
        <CardContent className="p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Login Successful!
            </h1>
            <p className="text-gray-600">
              Welcome back, you're now signed in
            </p>
          </div>

          {/* User Info */}
          <div className="mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Email:</span>
                <span className="font-semibold text-gray-900">{userEmail}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Role:</span>
                <span className="font-semibold text-blue-600">{roleLabels[userRole]}</span>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            size="lg"
            className="w-full gap-2"
          >
            Continue to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>

          {/* Back to Login */}
          <button
            onClick={() => navigate("/login")}
            className="mt-4 text-sm text-gray-600 hover:text-gray-900 transition"
          >
            Not you? Sign in with a different account
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
