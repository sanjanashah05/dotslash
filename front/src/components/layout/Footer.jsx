// import React from "react";
// import bgFooter from "../../assets/homeImg/bgFooter.svg";
// import logoIcon from "../../assets/Icons/logoIcon.svg";
// import footerLink from "../../assets/homeImg/footerLink.svg";
// import tiwwer from "../../assets/homeImg/tiwwer.svg";
// import dribbble from "@/assets/homeImg/dribbble.svg";

// import Image from "next/image";
// import CustomSVG from "@/assets/Icons/ArrowIcon";

// const footerSections = [
//   {
//     title: "Home",
//     links: ["Features", "Benefits", "Top Features", "Integrations", "Pricing"],
//   },
//   {
//     title: "Pages",
//     links: ["Home", "Integrations", "Pricing", "Logs", "Contact", "404"],
//   },
//   {
//     title: "App",
//     links: ["Mobile", "Desktop"],
//   },
// ];

// const Footer = () => {
//   return (
//     <div
//       className="min-h-screen bg-slate-50 bg-center bg-cover text-black p-5 lg:p-10"
//       style={{
//         backgroundImage: `url(${bgFooter.src})`,
//       }}
//     >
//       {/* Footer Main Content */}
//       <div className=" mx-2 lg:mx-14 p-4 mt-10">
//         {/* Sections */}
//         <div className="">
//           <div className="flex gap-x-10  md:gap-x-20 flex-wrap ">
//             {footerSections.map((section, index) => (
//               <div key={index} className="text-white">
//                 <h1 className="text-[16px] leading-[18px] font-bold">
//                   {section.title}
//                 </h1>
//                 <ul className="text-[14px] leading-[18px] font-light space-y-4 mt-4">
//                   {section.links.map((link, linkIndex) => (
//                     <li key={linkIndex}>{link}</li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="border-t border-[#FFFFFF0D] my-10"></div>

//         {/* Footer Bottom Section */}
//         <div className="flex flex-col md:flex-row items-center justify-between bg-[#FFFFFF0D] shadow-sm border border-[#FFFFFF0D] p-4 rounded-[14px] gap-6">
//           {/* Logo Section */}
//           <div className="flex items-center">
//             <Image src={logoIcon} alt="logoIcon" width={40} height={40} />
//             <div className="text-[16px] leading-[17px] font-bold text-white ml-2">
//               BharatAI
//             </div>
//           </div>

//           {/* Social Icons & Newsletter */}
//           <div className="flex flex-col md:flex-row items-center gap-6 md:gap-x-4">
//             {/* Social Icons */}
//             <div className="flex gap-x-4">
//               <Image
//                 src={footerLink}
//                 alt="footerLink"
//                 className="w-10 h-10 object-contain"
//               />
//               <Image
//                 src={tiwwer}
//                 alt="tiwwer"
//                 className="w-10 h-10 object-contain"
//               />
//               <Image
//                 src={dribbble}
//                 alt="dribbble"
//                 className="w-10 h-10 object-contain"
//               />
//             </div>

//             {/* Newsletter */}
//             <div className="bg-[#00000033] border border-[#FFFFFF0D] rounded-[10px] shadow-md h-10 flex items-center px-3 w-full md:w-auto">
//               <div className="text-white text-[14px] leading-[14px] mx-3">
//                 Subscribe to Newsletter
//               </div>
//               <div className="bg-[#FFFFFF0D] rounded-md h-8 w-8 flex justify-center items-center">
//                 <CustomSVG width={20} height={20} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer Bottom Text */}
//         <div className="text-white mt-10 text-sm">
//           <p>© 2024 Your Company. All Rights Reserved.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Footer;

import React from "react";
import Image from "next/image";
import twitterIcon from "../../assets/Icons/twitterIcon.svg";
import instagramIcon from "../../assets/Icons/instagramIcon.svg";
import facebookIcon from "../../assets/Icons/facebookIcon.svg";
import linkedinIcon from "../../assets/Icons/linkedinIcon.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
        <div className="text-cyan-600 font-bold text-4xl">
        NidaanAI
      </div>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          <ul className="flex gap-6 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Our Team</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4 mt-4 text-xl">
          <a href="#" aria-label="Twitter" className="hover:text-blue-400">
            <Image src={twitterIcon} alt="twitterIcon" width={40} height={40} />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-400">
            <Image src={instagramIcon} alt="instagramIcon" width={40} height={40} />
          </a>
          <a href="#" aria-label="Facebook" className="hover:text-blue-600">
            <Image src={facebookIcon} alt="facebookIcon" width={40} height={40} />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-blue-500">
            <Image src={linkedinIcon} alt="linkedinIcon" width={40} height={40} />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs mt-4">© 2025 NidaanAI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
