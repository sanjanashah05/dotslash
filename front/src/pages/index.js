import GetInTouch from "@/components/home/GetInTouch";
import GrowthAndCustomSection from "@/components/home/Growth";
import OurTeam from "@/components/home/OurTeam";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Testimonials from "@/components/home/Testimonials";

import "@fontsource/space-grotesk";

export default function Home() {
  return (
    <div className="bg-[#080807]">
      <div className="sticky top-0 z-50">
      <Navbar />
      </div>
      <GrowthAndCustomSection className="mt-12"/>
      <Testimonials/>
      <GetInTouch />
      <Footer />
    </div>

  );
}
