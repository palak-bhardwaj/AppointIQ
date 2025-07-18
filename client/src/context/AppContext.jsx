import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const [userData, setUserData] = useState({
    name: "",
    image: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: {
      line1: "",
      line2: "",
    },
  });

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching  doctors data:",
        error.response?.data,
        error
      );
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while fetching doctors data."
      );
    }
  };

  const userProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setUserData((prev) => ({ ...prev, ...data.userData }));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(
        "Error fetching  user profile data:",
        error.response?.data,
        error
      );
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while fetching user profile data."
      );
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    userProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      userProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
