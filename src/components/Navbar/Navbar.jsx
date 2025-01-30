import { Link, NavLink } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Navbar() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <nav className="shadow-sm z-1000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img className="w-10" src="/src/assets/Factlogo.png" alt="FactShield Logo" />
              <span className="text-2xl">FactShield</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${isActive ? "underline decoration-solid" : "text-gray-700"} hover:text-gray-900`
              }
            >
              {t("home")}
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${isActive ? "underline decoration-solid" : "text-gray-700"} hover:text-gray-900`
              }
            >
              {t("about")}
            </NavLink>
            <NavLink
              to="/contactus"
              className={({ isActive }) =>
                `text-gray-700 ${isActive ? "underline decoration-solid" : "decoration-0"} hover:text-gray-900`
              }
            >
              {t("contactUs")}
            </NavLink>
            <div className="flex align-middle justify-center border-1 rounded-md px-1 py-1">
              <p className="scale-[1.4] mr-0.5">&#127760;</p>
              <select
                className="focus:outline-none"
                onChange={(e) => changeLanguage(e.target.value)}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
