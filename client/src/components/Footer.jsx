import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_2fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/*-----Left Section------*/}
        <div>
          <img src={assets.logo} alt="logo" className="mb-5 w-40" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            We are committed to making healthcare accessible, convenient, and
            reliable for everyone. Book appointments with trusted doctors
            anytime, from anywhere. Your health is our top priority, and we
            ensure a seamless experience from scheduling to consultation. Stay
            informed, stay healthy, and trust us with your care journey.
          </p>
        </div>

        {/*-----Middle Section------*/}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/*-----Right Section------*/}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 9460035551</li>
            <li>prescripto.service@gmail.com</li>
          </ul>
        </div>
      </div>
      {/*------Copy right section--------*/}
      <div className="text-center">
        <hr />
        <p className="py-5 text-sm text-center">Copyright 2025@ Prescripto - All Right Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
