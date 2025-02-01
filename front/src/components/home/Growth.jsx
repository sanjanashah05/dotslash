import React from "react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import flares from "@/assets/homeImg/Flares.png";
import startIcon from "@/assets/Icons/starIcon.svg";
import sreachIcon from "@/assets/Icons/sreachIcon.svg";
import searchArrow from "@/assets/Icons/searchArrow.svg";
import background from "@/assets/homeImg/background.png";

const GrowthAndCustomSection = () => {
  const cards = [
    {
        icon: "/images/versioncontrol.png",
        title: "AI Prescriptions",
        description:
            "Powered by AI-powered prescriptions, offering personalized treatment plans based on patient history.",
    },
    {
        icon: "/images/calender.png",
        title: "Timely Follow-up Reminders",
        description:
            "Automated timely follow-up reminders for patients via preferred channels.",
    },
    {
        icon: "/images/tickmark.png",
        title: "Medically Verified Prescriptions",
        description:
            "Rigorous verification of AI-generated prescriptions through expertise and regulatory guidelines.",
    },
];

  return (
    <div
      id="home"
      className="bg-white flex flex-col items-center relative overflow-hidden pb-5 "
    >
      <div className="hidden md:block absolute top-0 -left-[30%] ">
        <Image src={background} alt="background" className="w-full h-full" />
      </div>
      <div className="hidden md:block absolute bottom-0 -right-[20%] ">
        <Image src={background} alt="background" className="w-full h-full" />
      </div>
      {/* Hero Section */}
      <div className="h-screen flex justify-center items-center flex-col px-2 mt-10 sm:mt-0 sm:px-4 ">
        <div className="text-black text-center font-spaceGrotesk text-[35px]  md:text-[50px] font-bold leading-[100%] md:leading-[58px] space-y-4">
          <h2>Revolutionizing Healthcare</h2>
          <h2>with AI powered Diagnostics</h2>
          <h1 className="text-[#3F98FF] text-[40px]  md:text-[64px] ">
            Nidaan AI
          </h1>
        </div>

        <p className="w-[90%] text-center text-slate-950  font-normal text-[16px] md:text-[18px] leading-[27px] my-10">
        Unlocking the power of AI to improve lives through accessible early detection and intelligent informed decisions.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-8">
          <Link href="/about">
            <span className="bg-black text-white rounded-lg text-sm sm:text-base font-medium border border-[#0073FF] hover:bg-[#1a1a1a] transition-all shadow-[0_0_15px_rgba(0,115,255,0.7)] px-9 py-2">Get Started</span>
          </Link>
            <span className="bg-black border text-white px-6 sm:px-8 py-2 rounded-lg">
              Contact Us
            </span>
        </div>
      </div>

      {/* Custom Section */}
      <div className="m-4">
        <div className="bg-[#0D0F10] flex flex-col items-center p-2  sm:p-10 sm:px-8 w-full  max-w-[1008px] rounded-[20px] relative border-[10px] border-[#131619]">
          <div className="max-w-[450px] mx-auto  w-full relative my-10">
            <Image
              src={flares}
              alt="Background Image"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
            <div className="text-[35px] md:text-[44px] leading-[48px] font-bold text-center">
              Healing with <span className="text-[#3F98FF]"> Seamless </span>{" "}
              Power{" "}
              <Image src={startIcon} alt="startIcon" className="inline-block" />
            </div>

            <div
              className=" py-5 px-3 
          "
            >
              <div className="relative border-2 border-[#fff] flex items-center p-1 rounded-xl bg-[#1C1F28] drop-shadow-2xl">
                <Image src={sreachIcon} alt="sreachIcon" className="shrink-0" />

                <input
                  type="text"
                  placeholder="Ask for Help!!"
                  className="bg-transparent outline-none flex-grow mx-2"
                />

                <Image
                  src={searchArrow}
                  alt="searchArrow"
                  className="shrink-0 hidden sm:inline"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-[#1A1D1F] text-white rounded-lg p-6 shadow-lg flex flex-col text-center sm:text-left"
              >
                <div className="flex items-center justify-center sm:justify-start mb-4">
                  <Image
                    src={card.icon}
                    alt={card.title}
                    width={32}
                    height={32}
                    className="mr-2"
                  />
                  <h4 className="text-lg sm:text-xl font-lato">{card.title}</h4>
                </div>
                <p className="text-sm text-gray-400 font-open-sans">
                  {card.description}
                </p>
                <a
                  href="#"
                  className="flex items-center justify-center sm:justify-start text-[#B0B0B0] mt-4"
                >
                  Learn More <FaArrowRight className="ml-2" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrowthAndCustomSection;
