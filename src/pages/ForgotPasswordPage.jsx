import { auth, sendPasswordResetEmail } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Loader from "../components/GlobalComponents/Loader";
import Swal from "sweetalert2";
import { ThemeContext } from "../contexts/ThemeContext";
import LogInImage from "../assets/images/forgotPassword.png";
import ForgotPasswordForm from "../components/GlobalComponents/ForgotPassword";
import elips from "../assets/images/Ellipse.png";

// LOGIN PAGE COMPONENT
function ForgotPasswordPage() {
  // STATES
  const [loader, setLoader] = useState(false);
  const { bgColor, color } = useContext(ThemeContext);
  const navigate = useNavigate();
  // FUNCTION TO RESET PASSWORD VIA EMAIL
  const resetPasswordViaEmail = async (formInstance) => {
    const { email } = formInstance.getFieldValue();

    try {
      const response = await sendPasswordResetEmail(auth, email);
      Swal.fire({
        customClass: {
          container: "sweatContainer",
          popup: "sweatPopup",
          title: "sweatTitle",
          htmlContainer: "sweatPara",
          confirmButton: "sweatBtn",
          cancelButton: "sweatBtn",
        },
        icon: "success",
        title: "Email Sent!",
        text: "Password reset email has been sent to your email. Please check your inbox.",
      });
      formInstance.resetFields();
      navigate("/auth/login");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      Swal.fire({
        customClass: {
          container: "sweatContainer",
          popup: "sweatPopup",
          title: "sweatTitle",
          htmlContainer: "sweatPara",
          confirmButton: "sweatBtn",
          cancelButton: "sweatBtn",
        },
        icon: "error",
        title: "Error",
        text: `Error: ${errorMessage}`,
      });
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className="relative h-screen grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-0 pt-10 md:pt-0 overflow-hidden"
    >
      <img src={elips} alt="elips" className="absolute left-0 bottom-0 rotate-180" />

      <div className="flex justify-center items-center h-full w-full md:order-1 order-2">
        <img
          src={LogInImage}
          alt="logIn page image"
          className="md:w-[50%] md:h-auto w-[70%] h-[90%] -rotate-[30deg] md:opacity-[1] opacity-[0.4] absolute top-0 z-0"
        />
      </div>
      <div className="flex flex-col justify-center items-center h-full w-full px-10 order-1 md:order-2 z-10">
        <h1
          style={{ color: `${color}` }}
          className="w-full text-left font-bold text-4xl"
        >
          Forgot Your Password?
        </h1>
        <p style={{ color: `${color}` }} className="w-full text-left my-5">
          Don't worry, happens to all of us. Enter your email below to <br />
          recover your password.
        </p>
        <ForgotPasswordForm resetPasswordViaEmail={resetPasswordViaEmail} />
      </div>
    </div>
  );
}
export default ForgotPasswordPage;
