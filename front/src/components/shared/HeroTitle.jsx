import React from "react";

const HeroTitle = ({ text, customStyles = "", className = "" }) => {
  return (
    <div
      className={`absolute inset-0 flex justify-center items-start  font-Oswald ${customStyles}`}
    >
      <div
        className={`text-[#ffffff10] sm:tracking-[-10px] text-[50px] sm:text-[100px] md:text-[150px] lg:text-[220px] leading-[220px] font-semibold  sm:pt-[100px] uppercase ${className}`}
      >
        {text}
      </div>
    </div>
  );
};

export default HeroTitle;
