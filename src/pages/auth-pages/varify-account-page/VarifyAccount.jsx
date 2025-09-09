import { auth, sendPasswordResetEmail } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from "../../../components/ui/Loader";
import Swal from "sweetalert2";
import varifyAccountImg from "../../../assets/images/varify-account.png";
import FormContainer from "../../../components/ui/FormContainer";
import VarifyAccountForm from "./VarifyAccountForm";

// LOGIN PAGE COMPONENT
function VarifyAccount() {
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
      variant="varify-account"
      mainImg={varifyAccountImg}
      altOfImg={"varify-account-page image"}
      heading={"Varify Code"}
      paragraph={"An authentication code has been sent to your email."}
    >
      <VarifyAccountForm resetPasswordViaEmail={resetPasswordViaEmail} />
    </FormContainer>
  );
}
export default VarifyAccount;
