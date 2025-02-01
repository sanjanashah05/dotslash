import React from "react";
import HeroTitle from "../shared/HeroTitle";
import FeatureSection from "../shared/FeatureSection";
import coreTeam from "@/assets/homeImg/coreTeam.svg";
import teamMember from "@/assets/homeImg/teamMember.png";
import Slider from "react-slick";
import Image from "next/image";
import CustomSVG from "@/assets/Icons/ArrowIcon";
import bgimag from "@/assets/homeImg/bgimg.png"; // Make sure bgimg is properly imported.
import background from "@/assets/homeImg/background.png";

const OurTeam = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const teamMembers = [
    {
      id: 1,
      name: "Shabbir Hussainy",
      role: "Frontend + Backend",
      img: teamMember,
    },
    {
      id: 2,
      name: "Sanjana Shah",
      role: "Model Training",
      img: teamMember,
    },
    {
      id: 3,
      name: "Vanshik Godeshwar",
      role: "LLM Training",
      img: teamMember,
    },
  ];

  return (

    <div
      id="our-team"
      className="h-full relative text-black bg-white py-5 md:py-10 "
    >
      <div className="hidden md:block absolute -bottom-10 -left-[40%] ">
                    <Image src={background} alt="background" className="w-full h-full" />
      </div>
      <div className="w-[90%] xl:w-[84%] mx-auto">
        <div className=" py-5 sm:py-16  font-spaceGrotesk sm:mt-[80px] ">
          <FeatureSection
            icon={coreTeam}
            title="Core Team"
            subtitle={<span className="text-black">Meet the Developers</span>}
            description={[
              "",
              "",
            ]}
            // Directly change subtitle color here
            subtitleClassName="text-[#FFFFFF]" // Set the color of the subheading text to white
          />
        </div>
      </div>
      <Slider {...settings} className=" sm:mt-[40px]">
        {teamMembers.map((member) => (
          <div key={member.id} className="p-3">
            <div
              className="border bg-cover bg-no-repeat border-[#21261D] rounded-lg shadow-md overflow-hidden p-6"
              style={{
                backgroundImage: `url(${bgimag.src})`, // Use bgimag.src for imported images in Next.js
                backgroundSize: "cover", // Ensure background image covers the container
              }}
            >
              <div className="border rounded-full w-[100px] h-[100px] overflow-hidden mx-auto ">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="object-cover"
                />
              </div>

              <div className="space-y-3 py-3 mt-2 text-center">
                <div className="text-[26px] leading-[42px]  text-black font-spaceGrotesk">
                  {member.name}
                </div>
                <div className="text-black text-[14px] leading-[21px] font-spaceGrotesk">
                  {member.role}
                </div>

                <div className="inline-flex justify-center items-center gap-x-2 text-black">
                  LinkedIn <CustomSVG width={19} height={19} color="black" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OurTeam;
