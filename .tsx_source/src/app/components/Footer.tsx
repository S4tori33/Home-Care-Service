import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">HCS</span>
              </div>
              <div>
                <h3 className="font-bold text-white">Home Care Service</h3>
              </div>
            </div>
            <p className="text-sm mb-4">
              Providing reliable, trustworthy, and convenient home care services that improve 
              the quality of life for clients.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">House Cleaning</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Garden Maintenance</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Pet Care</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Elderly Care</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">How It Works</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="font-semibold text-white mb-4">Get In Touch</h4>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>info@homecareservice.com</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Care Street, Suite 100<br />City, State 12345</span>
              </div>
            </div>
            
            <h5 className="font-semibold text-white mb-2 text-sm">Newsletter</h5>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
              />
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Home Care Service. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
