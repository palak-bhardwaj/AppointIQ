import express from "express";
import {
  addDoctor,
  adminAppointmentsData,
  adminCancelAppointment,
  adminDashboard,
  adminLogin,
  allDoctors,
  checkEmail,
} from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin from "../middlewares/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorController.js";

const adminRouter = express.Router();

adminRouter.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
adminRouter.post("/login", adminLogin);
adminRouter.post("/check-email", checkEmail);
adminRouter.post("/all-doctors", authAdmin, allDoctors);
adminRouter.post("/change-availablity", authAdmin, changeAvailablity);
adminRouter.get("/appointments", authAdmin, adminAppointmentsData);
adminRouter.post("/cancel-appointment", authAdmin, adminCancelAppointment);
adminRouter.get("/dashboard", authAdmin, adminDashboard);

export default adminRouter;

//localhost:4000/api/admin/add-doctor
