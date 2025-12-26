import { HeroSlider } from "@/components/sections/hero-slider";
// import { SuccessSlider } from "@/components/sections/success-slider";
import { ServicesSection } from "@/components/sections/services-section";
import { Stats3D } from "@/components/sections/stats-3d";
import { Testimonials } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider />
      <ServicesSection />
      <Stats3D />
      <Testimonials />
      <CtaSection />
    </div>
  );
}
