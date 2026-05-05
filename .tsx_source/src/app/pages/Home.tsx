import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { Services } from "../components/Services";
import { HowItWorks } from "../components/HowItWorks";
import { ForCustomers } from "../components/ForCustomers";
import { ForJobSeekers } from "../components/ForJobSeekers";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <HowItWorks />
        <ForCustomers />
        <ForJobSeekers />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
