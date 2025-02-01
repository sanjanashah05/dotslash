import CustomSVG from "@/assets/Icons/ArrowIcon";
import React from "react";
import ContactForm from "../contacts/ContactForm";
import background from "@/assets/homeImg/background.png";
import Image from "next/image";

const GetInTouch = () => {
  return (
    <div className="bg-white relative h-full w-full pt-5 sm:pt-24 pb-20 sm:px-5">
      {/* <div className="hidden md:block absolute bottom-0 -right-[20%] ">
          <Image src={background} alt="background" className="w-full h-full" />
      </div> */}
      <div className="hidden md:block absolute top-0 -left-[40%] ">
          <Image src={background} alt="background" className="w-full h-full" />
      </div>
      <div className="text-[36px] px-3 md:text-[50px] lg:text-[81px] leading-[45px] md:leading-[60px] lg:leading-[100px] font-normal ml-2 text-black">
        Contact Us
      </div>
      <div className="py-10 mx-3 grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-y-0 px-3">
        <div className="lg:col-span-5 space-y-8">
          <div className="text-[14px] leading-[22px] border-b border-[#232323] pb-4">
            <p className="text-black font-semibold text-2xl">Office</p>
            <p className="text-black font-semibold text-lg">National Institute of Technology, Surat</p>
            <p className="text-black font-semibold text-lg">395007 - Surat</p>
            <p className="text-black font-semibold text-lg">Gujarat, India</p>
          </div>
          <div className="text-[14px] leading-[22px] border-b border-[#232323] pb-4">
            <p className="text-black">Email</p>
            <div className="flex items-center gap-x-3">
              <p className="text-[20px] md:text-[28px] lg:text-[32px] leading-[32px] md:leading-[38px] lg:leading-[42px] text-black">
                contact.nidaan@gmail.com
              </p>
              {/* <CustomSVG width={40} height={40} /> */}
            </div>
          </div>
          <div className="text-[14px] leading-[22px] border-b border-[#232323] pb-4">
            <p className="text-black">Phone</p>
            <div className="flex items-center gap-x-3">
              <p className="text-[20px] md:text-[28px] lg:text-[32px] leading-[32px] md:leading-[38px] lg:leading-[42px] text-black">
                +91 85110 95153
              </p>
              {/* <CustomSVG width={40} height={40} /> */}
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default GetInTouch;
