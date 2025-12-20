import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Workflow, Settings, Box } from "lucide-react";
import FluidGlass from "./FluidGlass";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonStyle =
    "text-2xl px-3 py-2 rounded-full text-grey-600 font-medium hover:text-blue-800 transition-all duration-300 text-sm md:text-base  hover:bg-white/30 hover:backdrop-blur-3xl";

  return (
    <>
      <div
        className=" w-full  sticky top-0 z-50 mx-auto bg-white-900 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-white-100 "
      >
        <nav className="flex items-center justify-between p-4 md:p-5 gap-3 md:gap-8 max-w-7xl mx-auto">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <div className="relative hover:text-gray-600">
              <Workflow size={50} strokeWidth={0.75} />
              <Settings
                className="absolute top-1.75 left-1.75 animate-[spin_4s_linear_infinite]"
                size={15}
              />
              <Box className="absolute bottom-1.75 right-1.75" size={15} />
            </div>
            <h1 className="text-2xl md:text-3xl text-blue-600/95 font-extrabold">
              ProcessFlow
            </h1>
          </Link>

          {/* Hamburger Menu Button - Mobile Only */}
          <button
            className="md:hidden flex items-center justify-center focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6 text-blue-600" />
            )}
          </button>

          {/* Desktop Navigation - Hidden on Mobile */}
          <div className="hidden md:flex gap-2 lg:gap-4 items-center ml-auto">
            <Link className={buttonStyle} to="/">
              Home
            </Link>
            <Link className={buttonStyle} to="/about">
              About
            </Link>
            <Link className={buttonStyle} to="/features">
              Features
            </Link>
            <Link className={buttonStyle} to="/demo">
              Demo
            </Link>
            <Link className={buttonStyle} to="/contact">
              Contact
            </Link>
            <Link className={buttonStyle} to="/companyRegister">
              Company Reg
            </Link>
            <div className="flex gap-2 ml-4 pl-4 border-l border-slate-200">
              <Link
                className="px-4 py-2 text-slate-700 font-medium hover:text-blue-600 transition-all duration-300 text-sm md:text-base rounded-lg border border-slate-300 hover:border-blue-600"
                to="/login"
              >
                Login
              </Link>
              <Link
                className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 text-sm md:text-base rounded-lg"
                to="/signup"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation - Visible only when hamburger is clicked */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
            <div className="flex flex-col p-4 gap-1">
              <Link
                className={`${buttonStyle} block`}
                to="/"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                className={`${buttonStyle} block`}
                to="/about"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                className={`${buttonStyle} block`}
                to="/features"
                onClick={() => setIsOpen(false)}
              >
                Features
              </Link>
              <Link
                className={`${buttonStyle} block`}
                to="/demo"
                onClick={() => setIsOpen(false)}
              >
                Demo
              </Link>
              <Link
                className={`${buttonStyle} block`}
                to="/contact"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              <Link
                className={`${buttonStyle} block`}
                to="/companyRegister"
                onClick={() => setIsOpen(false)}
              >
                Company Reg
              </Link>
              <div className="border-t border-slate-200 pt-3 mt-2 flex flex-col gap-2">
                <Link
                  className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 transition-all duration-300 text-sm rounded-lg border border-blue-600"
                  to="/login"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all duration-300 text-sm rounded-lg"
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Nav;
