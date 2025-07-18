import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AppContext } from "../../context/AppContext";

const DoctorDashboard = () => {
  const {
    dashData,
    setDashData,
    getDashData,
    dToken,
    appointmentComplete,
    appointmentCancel,
  } = useContext(DoctorContext);
  const { currency, slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return (
    dashData && (
      <div className="m-2 md:m-5 w-full">
        <div className="flex flex-wrap gap-3 mt-16">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.earning_icon}
              alt="earning-icon"
              className="w-14"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {currency} {dashData.earnings}
              </p>
              <p className="text-gray-400">Earnings</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.appointments_icon}
              alt="appointment-icon"
              className="w-14"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.patients_icon}
              alt="patient-icon"
              className="w-14"
            />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        {/*--------Latest Appointments------------*/}
        <div className="bg-white">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-200">
            <img src={assets.list_icon} alt="list-icon" />
            <p className="font-semibold">Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0 border-gray-200">
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
              >
                <img
                  src={item.userData.image}
                  alt="doctor-image"
                  className="rounded-full w-10"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.userData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
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
      </div>
    )
  );
};

export default DoctorDashboard;
