import { Star } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Homeowner",
    content: "HCS has been a lifesaver! Their house cleaning service is impeccable, and I love knowing that my home is in good hands. The staff is professional, punctual, and trustworthy.",
    rating: 5,
    image: "SM"
  },
  {
    name: "Robert Chen",
    role: "Family Caregiver",
    content: "The elderly care service for my mother has given our family such peace of mind. The caregiver is compassionate, patient, and truly cares about my mom's wellbeing.",
    rating: 5,
    image: "RC"
  },
  {
    name: "Emily Thompson",
    role: "Service Provider",
    content: "Working with HCS has changed my life. The flexible schedule allows me to balance work and family, and I feel valued as part of the team. Highly recommend for job seekers!",
    rating: 5,
    image: "ET"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">What People Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our satisfied customers and team members.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
