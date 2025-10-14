import { useContext, useState } from "react";
import SignUpForm from "./SignUpForm";
import Loader from "../../../components/ui/Loader";
import SignUpImage from "../../../assets/images/Illustration.png";
import FormContainer from "../../../components/ui/FormContainer";
import { ApiRoutes } from "../../../constants";
import sendRequest from "../../../helpers/sendRequest";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import showSweatAlert from "../../../helpers/showSweatAleart";
import api from "../../../constants/api.js";
import formatErrorMessage from "../../../helpers/formatErrorMessage.js";

// SIGN UP PAGE COMPONENT
function SignUp() {
  // STATES
  const { user, setUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // FUNCTION TO SIGN UP || CREATE USER
  const signUp = async (formInstance) => {
    try {
      setLoader(true);
      const payload = formInstance.getFieldValue();
      console.log("payload =>", payload);
      // const result = await api.post(ApiRoutes.auth.register, payload);
      // console.log("axios response --->", result);
      const result = await sendRequest(
        ApiRoutes.auth.register,
        "POST",
        payload
      );
      if (result?.success) {
        localStorage.setItem("username", payload.username);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data._id);
        // setUser(data);
        showSweatAlert("Congratulations!", message, "success", {
          confirmButtonText: "Proceed",
          confirmButtonColor: "#3085d6",
          showConfirmButton: true,
        }).then(() => {
          navigate("/auth/verify-account");
        });
      }

      formInstance.resetFields();
      console.log("result =>", JSON.parse(result.message));
      setLoader(false);
    } catch (error) {
      formInstance.resetFields();
      const messages = formatErrorMessage(error);
      console.log(error);
      showSweatAlert("Registration Failed", messages, "error", {
        confirmButtonText: "Retry",
        confirmButtonColor: "#d33",
      });
      setLoader(false);
    }
  };
  return loader ? (
    <Loader />
  ) : (
    <>
      <FormContainer
        variant={"signup"}
        mainImg={SignUpImage}
        altOfImg={"Signup Page Image"}
        heading={"SignUp"}
        paragraph={"SignUp to Create Your Account"}
      >
        <SignUpForm signUp={signUp} />
      </FormContainer>
    </>
  );
}
export default SignUp;
