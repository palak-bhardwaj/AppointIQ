import React, { useContext } from "react";
import { assets } from "../assets/assets_admin/assets";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const {dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  // logout logic 1
  const logout = () => {
    navigate('/')
    aToken && setAToken("");
    aToken && localStorage.removeItem("aToken");
    dToken && setDToken("");
    dToken && localStorage.removeItem("dToken")
  };

  // logout logic 2
  //   const logout = () => {
  //     if (aToken) {
  //         setAToken('');
  //         localStorage.removeItem('aToken');
  //     }
  //   }

  return (
   <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          src={assets.admin_logo}
          alt="logo"
          className="w-36 sm:w-40 cursor-pointer"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {aToken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        className="bg-primary text-white text-sm px-10 py-2 rounded-full cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
