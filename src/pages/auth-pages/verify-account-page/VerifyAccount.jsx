import { auth, sendPasswordResetEmail } from "../../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Loader from "../../../components/ui/Loader";
import Swal from "sweetalert2";
import verifyAccountImg from "../../../assets/images/varify-account.png";
import FormContainer from "../../../components/ui/FormContainer";
import VerifyAccountForm from "./VerifyAccountForm";
import sendRequest from "../../../helpers/sendRequest";
import { ApiRoutes } from "../../../constants";
import { UserContext } from "../../../contexts/UserContext";
import { toast } from "react-toastify";
import showSweatAlert from "../../../helpers/showSweatAleart";

// LOGIN PAGE COMPONENT
function VerifyAccount() {
  // STATES
  const { user } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  // FUNCTION TO RESET PASSWORD VIA EMAIL
  const resetPasswordViaEmail = async (formInstance) => {
    try {
      const { otp } = formInstance.getFieldValue();
      const userId = localStorage.getItem("userId");
      const payload = { userId, otp };

      const { message } = await sendRequest(
        ApiRoutes.verify.verifyOtp,
        "POST",
        payload
      );

      let messages = null;
      if (typeof message == "object") {
        const keys = Object.keys(message);
        messages = keys.map((key) => `${message[key]}`);
      } else {
        messages = message;
      }
      showSweatAlert("Congratulations!", messages, "success", {
        showConfirmButton: false,
        timer: 12000,
      }).then(() => navigate("/"));

      formInstance.resetFields();
    } catch (error) {
      let messages = null;
      if (
        typeof error.message != "string" &&
        typeof error.message == "object"
      ) {
        const keys = Object.keys(error.message);
        messages = keys.map((key) => `${error.message[key]}`);
      } else {
        messages = error.message;
      }
      showSweatAlert("Oops!", messages, "error", {
        confirmButtonText: "Retry",
        confirmButtonColor: "#d33",
      });
    }
  };

  return loader ? (
    <Loader />
  ) : (
    <FormContainer
      variant="verify-account"
      mainImg={verifyAccountImg}
      altOfImg={"verify-account-page image"}
      heading={"Verify Code"}
      paragraph={"An authentication code has been sent to your email."}
    >
      <VerifyAccountForm resetPasswordViaEmail={resetPasswordViaEmail} />
    </FormContainer>
  );
}
export default VerifyAccount;
