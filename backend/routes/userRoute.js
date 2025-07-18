import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getUserProfile,
  loginUser,
  myAppointmentsData,
  // paymentRazorpay,
  registerUser,
  updateUserProfile,
  // verifyRazorpayPayment,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authUser, getUserProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authUser,
  updateUserProfile
);
userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/appointments", authUser, myAppointmentsData);
userRouter.post("/cancel-appointment", authUser, cancelAppointment);

// Commented out Razorpay routes
// userRouter.post("/payment-razorpay", authUser, paymentRazorpay);
// userRouter.post("/verify-razorpay-payment", authUser, verifyRazorpayPayment);

export default userRouter;
