import { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    appointmentComplete,
    appointmentCancel,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  return (
    <div className="w-full max-w-6xl m-2 md:m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border border-gray-200 rounded text-sm max-h-[80vh] min-h-[50vh] mt-8 overscroll-y-scroll">
        <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b border-gray-300">
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fee</p>
          <p>Action</p>
        </div>

        {appointments.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <img
                src={item.userData.image}
                alt="patient-image"
                className="w-8 rounded-full"
              />
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className="text-sm inline border border-primary px-2 rounded-full">
                {item.payment ? "Online" : "CASH"}
              </p>
            </div>
            <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
            <p>
              {slotDateFormat(item.slotDate)}, {item.slotTime}
            </p>
            <p>
              {currency}
              {item.docData.fee}
            </p>

            {item.cancelled ? (
              <p className="bg-red-400 px-6 py-1.5 rounded-2xl text-xs font-medium text-white">
                Cancelled
              </p>
            ) : item.AppointmentCompleted ? (
              <p className="bg-green-400 px-6 py-1.5 rounded-2xl text-xs text-white font-medium">
                Completed
              </p>
            ) : (
              <div className="flex">
                <img
                  src={assets.cancel_icon}
                  alt="cancel-icon"
                  className="w-10 cursor-pointer hover:scale-105"
                  onClick={() => appointmentCancel(item._id)}
                />
                <img
                  src={assets.tick_icon}
                  alt="tick-icon"
                  className="w-10 cursor-pointer hover:scale-105"
                  onClick={() => appointmentComplete(item._id)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
