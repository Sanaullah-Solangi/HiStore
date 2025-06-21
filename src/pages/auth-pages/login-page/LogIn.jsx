import { auth, signInWithEmailAndPassword } from "../../../utils/firebase";
import { useState } from "react";
import LogInForm from "./LogInForm";
import Loader from "../../../components/ui/Loader";
import Swal from "sweetalert2";
import LogInImage from "../../../assets/images/login.png";
import FormContainer from "../../../components/ui/FormContainer";

// LOGIN PAGE COMPONENT
function LogInPage() {
  // STATES
  const [loader, setLoader] = useState(false);
  //  FUNCTION TO LOGIN USER
  const logIn = async (formInstance) => {
    const values = formInstance.getFieldValue();
    const { username, email, password } = values;
    setLoader(true);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      formInstance.resetFields();
      window.location.href = "/";
      setLoader(false);
      Swal.fire({
        title: "Logged In!",
        text: "You are successfully logged in.",
        icon: "success",
        showConfirmButton: true,
        timer: 2500, // Alert ko 1.5 second ke liye show karega
      });
    } catch (error) {
      setLoader(false);
      console.log(error.message);
      Swal.fire({
        title: "Login Failed!",
        text: "Your credentials are incorrect. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
        confirmButtonColor: "#d33",
      });
      // formInstance.resetFields();
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
