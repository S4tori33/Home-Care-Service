import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Button } from "./ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id: string) => {
    // If we're not on the home page, navigate there first
    if (location.pathname !== "/home") {
      navigate("/home");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  const handleGetStarted = () => {
    navigate("/book-service");
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
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
              <p className="text-xs text-gray-600">Quality Care, Quality Life</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("for-customers")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              For Customers
            </button>
            <button 
              onClick={() => scrollToSection("for-job-seekers")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              For Job Seekers
            </button>
            <button 
              onClick={() => navigate("/about")}
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About
            </button>
            <Button onClick={handleGetStarted}>Get Started</Button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 flex flex-col gap-4">
            <button 
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 transition text-left"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-700 hover:text-blue-600 transition text-left"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("for-customers")}
              className="text-gray-700 hover:text-blue-600 transition text-left"
            >
              For Customers
            </button>
            <button 
              onClick={() => scrollToSection("for-job-seekers")}
              className="text-gray-700 hover:text-blue-600 transition text-left"
            >
              For Job Seekers
            </button>
            <button 
              onClick={() => {
                navigate("/about");
                setIsMenuOpen(false);
              }}
              className="text-gray-700 hover:text-blue-600 transition text-left"
            >
              About
            </button>
            <Button onClick={handleGetStarted} className="w-full">
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}