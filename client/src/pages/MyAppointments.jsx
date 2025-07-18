import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();
  const months = [
    "Jan",
    "Feb",
    "March",
    "Aprail",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("-");
    return (
      dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
    );
  };

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/appointments", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);
      }
    } catch (error) {
      console.error(
        "Error fetching appointments data:",
        error.response?.data,
        error
      );
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while fetching appointments data."
      );
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error cancel appointment:", error.response?.data, error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while canceling appointment."
      );
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment payment",
      description: "Appointment payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        // console.log(response);

        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay-payment",
            response,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (data.success) {
            getAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.error(
            "Error verify razorpay payment:",
            error.response?.data,
            error
          );
          toast.error(
            error.response?.data?.message ||
              "Something went wrong while verifying payment."
          );
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const appointmentPaymentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.error(
        "Error appointment payment by razorpay:",
        error.response?.data,
        error
      );
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while paying appointment fee via razorpay."
      );
    }
  };

  useEffect(() => {
    if (token) {
      getAppointments();
    }
  }, [token]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-zinc-300">
        My Appointments
      </p>

      <div>
        {appointments.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-zinc-300"
          >
            <div>
              <img
                src={item.docData.image}
                alt=""
                className="w-32 bg-indigo-50"
              />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="text-neutral-800 font-semibold">
                {item.docData.name}
              </p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address:</p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            <div></div>
            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled &&
                item.payment &&
                !item.AppointmentCompleted && (
                  <button className="sm:min-w-48 py-2 bg-green-500 opacity-80 text-white rounded-2xl cursor-not-allowed">
                    Paid
                  </button>
                )}
              {!item.cancelled &&
                !item.payment &&
                !item.AppointmentCompleted && (
                  <button
                    className="text-sm text-stone-500 text-center sm:min-w-48 border py-2 rounded cursor-pointer hover:bg-primary hover:text-white transition-all duration-300"
                    onClick={() => appointmentPaymentRazorpay(item._id)}
                  >
                    Pay Online
                  </button>
                )}
              {!item.cancelled && !item.AppointmentCompleted && (
                <button
                  className="text-sm text-stone-500 text-center sm:min-w-48 border py-2 rounded cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300"
                  onClick={() => cancelAppointment(item._id)}
                >
                  Cancel Appointment
                </button>
              )}
              {item.cancelled && !item.AppointmentCompleted && (
                <button className="sm:min-w-48 py-2 bg-red-500 opacity-80 text-white rounded-2xl cursor-not-allowed">
                  Appointment cancelled
                </button>
              )}
              {item.AppointmentCompleted && <button className="sm:min-w-48 py-2 bg-green-500/80 text-white rounded-2xl cursor-not-allowed">Completed</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
