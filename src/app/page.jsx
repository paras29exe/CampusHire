import Navigation from "@/components/landing/Navigation"
import HeroSection from "@/components/landing/HeroSection"
import WhyChooseSection from "@/components/landing/WhyChooseSection"
import NumbersSection from "@/components/landing/NumbersSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import ProcessSection from "@/components/landing/ProcessSection"
import AnalyticsSection from "@/components/landing/AnalyticsSection"
import CTASection from "@/components/landing/CTASection"
import Footer from "@/components/landing/Footer"

export default function Home() {
  return (
    <main className="bg-background w-full">
      <Navigation />
      <HeroSection />
      <WhyChooseSection />
      <NumbersSection />
      <FeaturesSection />
      <ProcessSection />
      <AnalyticsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
