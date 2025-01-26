import { Link, NavLink } from "react-router-dom";
import React from "react";
export default function Navbar() {
  return (
    <nav className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img className="w-10" src="/src/assets/Factlogo.png" alt="" />
              <span className="text-2xl">FactShield</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="home"
              className={({ isActive }) =>
                `${isActive ? "underline decoration-solid" : "text-gray-700"} hover:text-gray-900`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? "underline decoration-solid" : "text-gray-700"} hover:text-gray-900`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contactUs"
              className={({ isActive }) =>
                `text-gray-700 ${isActive ? "underline decoration-solid" : "decoration-0"} hover:text-gray-900`
              }
            >
              Contact Us
            </NavLink>
            <div className='flex align-middle justify-center border-1 rounded-md px-1 py-1'>
              <p className='scale-[1.4] mr-0.5'>&#127760;</p>
              <select className="focus:outline-none">
                <option>English</option>
                <option>English</option>
                <option>English</option>
                <option>English</option>
                <option>English</option>
                <option>English</option>
                <option>English</option>
                <option>English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
