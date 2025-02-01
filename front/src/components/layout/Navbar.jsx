import React, { useState, useEffect } from "react";
import Image from "next/image";
import {Link} from "react-scroll";
import { CiLineHeight } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineSegment } from "react-icons/md";
import { useRouter } from "next/router";
import nidaan from "../../assets/Icons/nidaan.svg";

// Helper for NavItem Component
const NavItem = ({ name, to, offset, onClick }) => (
  <Link
    to={to}
    smooth={true}
    duration={500}
    offset={offset}
    onClick={onClick} // Close menu on link click
    className="py-2 text-lg cursor-pointer hover:text-gray-300"
  >
    {name}
  </Link>
);

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { name: "Home", to: "home", offset: -50 },
    { name: "Our Team", to: "our-team", offset: 50 },
    { name: "Contact", to: "contact", offset: -200 },
  ];

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsVisible(currentScrollY <= 50 || currentScrollY <= window.pageYOffset);
    setIsScrolled(currentScrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`${isVisible ? "translate-y-0" : "-translate-y-full"} ${isScrolled ? "bg-none" : "bg-none"
        }
       px-4 lg:px-10 flex justify-between items-center fixed top-0 left-0 right-0 transition-all duration-300 z-50`}
    >
      {/* Logo */}
      
      <button className={`${isScrolled ? "text-transparent" : "text-cyan-600"
        } font-bold text-4xl`} onClick={() => router.push('/')}>
        NidaanAI
      </button>

      {/* Desktop Navigation */}
      {router.pathname === "/" && (
        <div
          className={`lg:flex gap-3 xl:gap-7 px-3 rounded-[10px] border border-[#ABABAB20] ${isScrolled ? "text-transparent" : "text-black"
            } hidden xl:ml-[45px]`}
        >
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </div>
      )}


      {/* Mobile Hamburger Button */}
      <button
        className="lg:hidden text-white"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <MdOutlineSegment size={35} />
      </button>

      {/* Hamburger Menu - Sidebar */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-black pt-3 text-white transition-transform duration-300 ease-in-out z-40 transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMenuOpen(false)} className="text-white">
            <RxCross2 size={35} />
          </button>
        </div>
        <div className="flex flex-col items-center">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              onClick={() => setIsMenuOpen(false)}
            />
          ))}
        </div>
      </div>
      

      {/* Desktop "Get Help?" Button */}

      {/* <Link
        to="contact"
        smooth={true}
        duration={500}
        offset={-280}
        // Close menu on link click
        className="py-2 text-lg cursor-pointer hover:text-gray-300"
      > */}
      {/* <Link href="/login"
          smooth={true}
          duration={500}
          offset={-280}
          // Close menu on link click
          className={`py-2 text-lg cursor-pointer hover:text-gray-300 ${
            isScrolled ? "text-transparent" : "text-black"
          }`}
        >
          {" "}
          Login
        </Link> */}
      <a href="login">
        <div className={`${isScrolled ? "bg-none" : "bg-black"
        } text-white px-6 sm:px-8 py-2 rounded-lg cursor-pointer`}>
          Login
        </div>
      </a>
      

    </div>
  );
};

export default Navbar;
