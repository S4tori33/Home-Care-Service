import { useState } from "react";
import { useNavigate } from "react-router";
import { LogIn, Mail, Lock, Shield, AlertCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";

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

const testCredentials = [
  { email: 'superadmin@test.com', password: '123456', role: 'super_admin' as UserRole },
  { email: 'platformadmin@test.com', password: '123456', role: 'platform_admin' as UserRole },
  { email: 'hradmin@test.com', password: '123456', role: 'hr_admin' as UserRole },
  { email: 'operationsadmin@test.com', password: '123456', role: 'operations_admin' as UserRole },
  { email: 'caregiver@test.com', password: '123456', role: 'caregiver' as UserRole },
  { email: 'petcare@test.com', password: '123456', role: 'pet_care' as UserRole },
  { email: 'garden@test.com', password: '123456', role: 'garden_maintenance' as UserRole },
  { email: 'cleaning@test.com', password: '123456', role: 'house_cleaning' as UserRole },
  { email: 'user@test.com', password: '123456', role: 'regular_user' as UserRole },
  { email: 'support@test.com', password: '123456', role: 'customer_support' as UserRole },
  { email: 'moderator@test.com', password: '123456', role: 'moderator' as UserRole }
];

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

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate credentials
    setTimeout(() => {
      const user = testCredentials.find(
        (cred) => cred.email === email && cred.password === password
      );

      if (user) {
        // Store user role in localStorage
        localStorage.setItem("userRole", user.role);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("isAuthenticated", "true");

        setIsLoading(false);
        navigate("/login-success");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">HCS</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to access your dashboard</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-600" />
              Sign In
            </CardTitle>
            <CardDescription>
              Enter your credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-800">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </Button>

              {/* Demo Info */}
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-xs font-semibold text-blue-900 mb-2">
                  📝 Test Credentials:
                </p>
                <div className="space-y-1 text-xs text-blue-800">
                  <p>• Super Admin: superadmin@test.com</p>
                  <p>• Platform Admin: platformadmin@test.com</p>
                  <p>• HR Admin: hradmin@test.com</p>
                  <p>• Operations: operationsadmin@test.com</p>
                  <p>• Caregiver: caregiver@test.com</p>
                  <p>• Pet Care: petcare@test.com</p>
                  <p>• Garden: garden@test.com</p>
                  <p>• Cleaning: cleaning@test.com</p>
                  <p>• User: user@test.com</p>
                  <p>• Support: support@test.com</p>
                  <p>• Moderator: moderator@test.com</p>
                  <p className="mt-2 font-semibold">Password for all: 123456</p>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 font-semibold">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
