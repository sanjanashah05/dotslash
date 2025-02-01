import React from "react";

const CircularPulseLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 border-solid rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-300 border-dotted rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default CircularPulseLoader;




