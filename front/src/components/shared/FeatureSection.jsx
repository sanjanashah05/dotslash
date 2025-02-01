import React from "react";
import Image from "next/image";

const FeatureSection = ({ icon, title, subtitle, description }) => {
  return (
    <div>
      {/* Icon and Title */}
      <div className="border border-[#FFFFFF1A] rounded-full inline-flex justify-center items-center p-[3px] bg-[#1a1a1a]">
        <Image src={icon} alt={title} />
        <div className="px-5 text-[#FFFFFF] text-[16px] font-bold leading-[17px]">
          {title}
        </div>
      </div>

      {/* Title and Description */}
      <div className="sm:flex justify-between items-center mt-3">
        <div className="text-[30px] lg:text-[40px] leading-[44px] font-medium">
          {subtitle}
        </div>
        <div className="text-[12px] lg:text-[14px] leading-[20px] font-light">
          {description.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
