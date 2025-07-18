import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <div>
      <div className="pt-10 text-gray-500">
        <p className="text-center text-2xl">
          CONTACT <span className="text-gray-800 font-medium">US</span>
        </p>

        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
          {/*-----Left Side------*/}
          <img
            src={assets.contact_image}
            alt="img"
            className="w-full max-w-[360px] rounded-lg"
          />

          {/*-----Right Side------*/}
          <div className="flex flex-col justify-center items-start gap-6 text-gray-600">
            <p className="font-semibold text-lg">OUR OFFICE</p>

            <p className="text-gray-500">
              302018 Ridhi Sidhi Circle,
              <br />
              Jaipur, Rajasthan, India
            </p>

            <div className="text-gray-500 space-y-1">
              <p>Tel: 0141-555111</p>
              <p className="break-all">Email: prescripto.service@gmail.com</p>
            </div>

            <p className="font-semibold text-lg">CAREERS AT PRESCRIPTO</p>

            <p className="text-gray-500">
              Learn more about our teams and job openings.
            </p>

            <button className="border border-black px-8 py-4 text-sm rounded-2xl hover:bg-black hover:text-white transition-all duration-500">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
