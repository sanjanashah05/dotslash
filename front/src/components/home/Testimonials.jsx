import React from "react";
import HeroTitle from "../shared/HeroTitle";
import FeatureSection from "../shared/FeatureSection";
import coreTeam from "@/assets/homeImg/coreTeam.svg";
import tiwwer from "../../assets/homeImg/tiwwer.svg";
import Image from "next/image";

const Testimonials = () => {
    const testimonials = [
        {
          id: 1,
          quote:
            "NidaanAI helped me detect my diabetes early, even before I could visit a doctor. It saved me from serious complications.",
          name: "Ravi Kumar",
          designation: "Farmer, Bihar",
        },
        {
          id: 2,
          quote:
            "Being visually impaired, accessing healthcare was a challenge. NidaanAI's voice-guided reports have been a blessing for me.",
          name: "Meera Sharma",
          designation: "Teacher, Rajasthan",
        },
        {
          id: 3,
          quote:
            "In our village, doctors are far away. NidaanAI gave me an accurate health assessment and helped me seek treatment on time.",
          name: "Manoj Yadav",
          designation: "Shopkeeper, Madhya Pradesh",
        },
        {
          id: 4,
          quote:
            "I lost my leg in an accident, and mobility became tough. NidaanAI's remote health monitoring gives me confidence and safety.",
          name: "Anil Das",
          designation: "Retired Army Veteran, Assam",
        },
        {
          id: 5,
          quote:
            "As a single mother with a hearing disability, managing my child’s and my health was difficult. NidaanAI’s insights have made it easier.",
          name: "Kavita Mishra",
          designation: "Tailor, Uttar Pradesh",
        },
        {
          id: 6,
          quote:
            "I live in a tribal area where hospitals are scarce. NidaanAI guided me in understanding my symptoms and getting the right care.",
          name: "Sundari Devi",
          designation: "Community Member, Jharkhand",
        },
      ];
  return (
    <div
      id="testimonials"
      className="h-full relative text-black bg-white py-4 md:py-10 rounded-lg  w-[94%] mx-auto mt-12 overflow-hidden"
      style={{
        background: "white",
      }}
    >
      <div className="w-[90%] xl:w-[84%] mx-auto bg-white">
        <div className="py-10 font-spaceGrotesk mt-[50px] bg-white">
          <FeatureSection
            icon={coreTeam}
            title="Testimonials"
            subtitle={
              <span className="text-black">Whats our clients are saying</span>
            }
            description={[
              "Our clients are our biggest advocates. Hear what they have to say about us.",
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[600px] cursor-pointer relative overflow-y-scroll my-14 bg-white rounded-lg custom-scrollbar gap-6 p-6 mt-[-10px]">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="shadow-md rounded-xl bg-white p-4 border space-y-5 border-[#FFFFFF1A]"
            >
              <div className="text-[40px] leading-[40px] text-black">“</div>
              <div className=" text-[14px] leading-[20px] text-black font-spaceGrotesk">
                {testimonial.quote}
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <div className="text-[16px] leading-[17px] text-black font-spaceGrotesk">
                    {testimonial.name}
                  </div>
                  <div className=" text-[14px] leading-[20px] text-black font-spaceGrotesk">
                    {testimonial.designation}
                  </div>
                </div>

                <Image src={tiwwer} alt="tiwwer" className="" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
