import { auth, sendPasswordResetEmail } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../../components/ui/Loader";
import Swal from "sweetalert2";
import ForgotPasswordImg from "../../../assets/images/forgotPassword.png";
import ForgotPasswordForm from "./ForgotPasswordForm";
import FormContainer from "../../../components/ui/FormContainer";

// LOGIN PAGE COMPONENT
function ForgotPassword() {
  // STATES
  const [loader, setLoader] = useState(false);
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
    <FormContainer
      variant="forgot-password"
      mainImg={ForgotPasswordImg}
      altOfImg={"Forgot-Password-page image"}
      heading={"Forgot Your Password?"}
      paragraph={
        "Don't worry, happens to all of us. Enter your email below to recover your password."
      }
    >
      <ForgotPasswordForm resetPasswordViaEmail={resetPasswordViaEmail} />
    </FormContainer>
  );
}
export default ForgotPassword;
