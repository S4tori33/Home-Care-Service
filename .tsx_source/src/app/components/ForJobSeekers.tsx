import { Briefcase, TrendingUp, Users, Award, UserCheck, MapPin, Zap } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

const opportunities = [
  {
    icon: Briefcase,
    title: "Flexible Work",
    description: "Choose your own schedule and work hours that fit your lifestyle."
  },
  {
    icon: TrendingUp,
    title: "Competitive Pay",
    description: "Earn competitive wages with opportunities for bonuses and tips."
  },
  {
    icon: Users,
    title: "Growing Community",
    description: "Join a supportive network of professionals dedicated to quality care."
  },
  {
    icon: Award,
    title: "Training & Development",
    description: "Access to training programs and professional development opportunities."
  }
];

export function ForJobSeekers() {
  return (
    <section id="for-job-seekers" className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">For Job Seekers</h2>
            <p className="text-lg text-gray-700 mb-6">
              Looking for meaningful work? Join our team and make a difference in people's lives 
              while building a rewarding career in home care services.
            </p>
            <p className="text-gray-600 mb-8">
              We believe in creating win-win scenarios where both our clients and service providers thrive. 
              Whether you're looking for full-time employment or flexible part-time work, HCS offers 
              opportunities for dedicated professionals.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Validation of Credentials</h4>
                  <p className="text-gray-600 text-sm">We must verify your qualifications upon employment</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Work Near Home</h4>
                  <p className="text-gray-600 text-sm">Get matched with clients in your local area.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Be Your Own Boss</h4>
                  <p className="text-gray-600 text-sm">Independence with the support of a trusted platform.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-500 to-purple-600 p-12">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <UserCheck className="w-16 h-16 text-white mb-3" />
                <span className="text-white text-sm text-center">Verified Professionals</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <MapPin className="w-16 h-16 text-white mb-3" />
                <span className="text-white text-sm text-center">Local Jobs</span>
              </div>
              <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-sm p-6 rounded-xl col-span-2">
                <Zap className="w-16 h-16 text-white mb-3" />
                <span className="text-white text-sm text-center">Fast Application Process</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {opportunities.map((opportunity, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex items-center justify-center w-14 h-14 bg-indigo-100 rounded-full mb-4 mx-auto">
                  <opportunity.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-900">{opportunity.title}</h3>
                <p className="text-gray-600 text-sm">{opportunity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl mb-4">Start Your Journey Today</h3>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Take the first step towards a fulfilling career where you can make a real impact.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100">
            Apply Now
          </Button>
        </div>
      </div>
    </section>
  );
}