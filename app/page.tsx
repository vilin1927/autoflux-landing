import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { TrustBar } from "@/components/sections/trust-bar";
import { StatsSection } from "@/components/sections/stats-section";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhoWeServe } from "@/components/sections/who-we-serve";
import { Testimonial } from "@/components/sections/testimonial";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="max-w-[1320px] mx-auto px-4 md:px-8 py-6">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <StatsSection />
        <HowItWorks />
        <WhoWeServe />
        <Testimonial />
        <CaseStudies />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
