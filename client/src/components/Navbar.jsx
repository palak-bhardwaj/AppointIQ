import React, { useContext, useState } from "react";
import { assets } from "../assets/assets_frontend/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  //const [token, setToken] = useState(true); // token ? login : logout

  const {token, setToken, userData} = useContext(AppContext)

  const logOut = () => {
    setToken(false)
     localStorage.removeItem('token')                                                                       
  }

  const toggleDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setShowDropdown((prev) => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        src={assets.logo}
        alt="logo"
        className="w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li className="py-1">Home</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">About</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="relative flex items-center gap-2 cursor-pointer group">
            <img
              src={userData?.image || assets.upload_icon}
              alt="profile-icon"
              className="w-10 rounded-full object-cover overflow-hidden"
              onClick={(e) => {
                if (window.innerWidth < 768) toggleDropdown(e); // Toggle only on mobile
              }}
            />
            <img
              src={assets.dropdown_icon}
              alt="dropdown-icon"
              className="w-2.5"
              onClick={(e) => {
                if (window.innerWidth < 768) toggleDropdown(e); // Toggle only on mobile
              }}
            />
            {showDropdown && (
              <div
                className="fixed inset-0 z-10 md:hidden"
                onClick={closeDropdown}
              ></div>
            )}
            <div
              className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20  
                ${
                  showDropdown && window.innerWidth < 768
                    ? "block md:hidden"
                    : "hidden md:group-hover:block"
                }`}
            >
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-md">
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => {
                    navigate("/my-profile");
                    setShowDropdown(false);
                  }}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowDropdown(false);
                  }}
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logOut();
                    setShowDropdown(false);
                  }}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}

        {/*---------Mobile Menu----------*/}
        <img
          src={assets.menu_icon}
          alt="menu-icon"
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
        />

        <div
          className={`${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} alt="logo" className="w-36" />
            <img
              src={assets.cross_icon}
              alt="cross-icon"
              onClick={() => setShowMenu(false)}
              className="w-7"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/">
              <p className="px-4 py-2 rounded inline-block">Home</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors">
              <p className="px-4 py-2 rounded inline-block">All Doctors</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about">
              <p className="px-4 py-2 rounded inline-block">About</p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact">
              <p className="px-4 py-2 rounded inline-block">Contact</p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
