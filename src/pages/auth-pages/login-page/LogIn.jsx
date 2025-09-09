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
    const values = formInstance.getFieldValue();
    const { username, email, password } = values;
    const payload = { email, password };
    setLoader(true);
    try {
      const result = await sendRequest(ApiRoutes.user.login, "POST", payload);

      console.log("Login result =>", result);

      setLoader(false);
      if (result.success) {
        setUser(result.data);
        localStorage.setItem("token", result.data.token);
        formInstance.resetFields();
        toast.success("You are login successfully");
        // showSweatAlert("Logged In", "You are login successfully", "success", {
        //   showConfirmationButton: true,
        //   timer: 800,
        // }).then(() => {
        navigate("/");
        // });
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      toast.error("Invalid credentials. Please try again!");

      //   showSweatAlert("Log in Failed", error.message, "error", {
      //     confirmButtonText: "Retry",
      //     confirmButtonColor: "#d33",
      //     timer: 2500,
      //   });
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
