import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiRoutes } from "../../../constants";
import { UserContext } from "../../../contexts/UserContext";
import LogInForm from "./LogInForm";
import Loader from "../../../components/ui/Loader";
import LogInImage from "../../../assets/images/login.png";
import FormContainer from "../../../components/ui/FormContainer";
import sendRequest from "../../../helpers/sendRequest";
import showSweatAlert from "../../../helpers/showSweatAleart";
import { toast } from "react-toastify";
// LOGIN PAGE COMPONENT
function LogInPage() {
  // states
  const { user, setUser } = useContext(UserContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  //  login function
  const logIn = async (formInstance) => {
    try {
      const { username, email, password } = formInstance.getFieldValue();
      const payload = { email, password };
      setLoader(true);
      const result = await sendRequest(ApiRoutes.auth.login, "POST", payload);

      console.log("Login result =>", result);

      setLoader(false);
      if (result && result?.success) {
        setUser(result.data);
        localStorage.setItem("token", result.data.token);
        formInstance.resetFields();
        showSweatAlert(
          "Congratulations!",
          "You are login successfully",
          "success",
          {
            showConfirmButton: false,
            timer: 1200,
          }
        ).then(() => {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        });
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      showSweatAlert("Log in Failed", error.message, "error", {
        confirmButtonText: "Retry",
        confirmButtonColor: "#d33",
      });
    }
  };
  return loader ? (
    <Loader />
  ) : (
    <FormContainer
      variant="login"
      mainImg={LogInImage}
      altOfImg={"Forgot-Password-page image"}
      heading={"Login"}
      paragraph={"LogIn to access your eCommerce journey."}
    >
      <LogInForm logIn={logIn} />
    </FormContainer>
  );
}
export default LogInPage;
