import GetInTouch from "@/components/home/GetInTouch";
import GrowthAndCustomSection from "@/components/home/Growth";
import OurTeam from "@/components/home/OurTeam";

import "@fontsource/space-grotesk";

export default function Home() {
  return (
    <div className="bg-[#080807]">
      <GrowthAndCustomSection />
      <OurTeam />
      <GetInTouch />
    </div>
  );
}
