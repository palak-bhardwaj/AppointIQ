import axios from "axios";
import { toast } from "react-toastify";

const checkEmailExists = async (email, backendUrl) => {
  try {
    const response = await axios.post(backendUrl + "/api/admin/check-email", {
      email,
    });
    const { success, message } = response.data;

    if (!success) {
      toast.error(
        message ||
          "This email is already registered. Please use a different one."
      );
      return true; // email exists
    }

    return false; // email is available
  } catch (error) {
    console.error("Error checking email:", error.response?.data, error);
    toast.error(
      error.response?.data?.message 
    );
    return true; // safer to assume email is taken if error occurs
  }
};


export { checkEmailExists };
