import ContentSection from "@/components/ContentSection";
import FooterSection from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import TargetSection from "@/components/TargetSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSection />
      <StatsSection />
      <ContentSection />
      <TargetSection />
      <FooterSection />
    </div>
  );
}
