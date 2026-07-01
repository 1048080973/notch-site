import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { HowItWorks } from "@/components/how-it-works";
import { CaseStudy } from "@/components/case-study";
import { Benefits } from "@/components/benefits";
import { Testimonials } from "@/components/testimonials";
import { Comparison } from "@/components/comparison";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks />
      <CaseStudy />
      <Benefits />
      <Testimonials />
      <Comparison />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}
