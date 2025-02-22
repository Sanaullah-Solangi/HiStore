import { auth, signInWithEmailAndPassword } from "../utils/firebase";
import { useContext, useState } from "react";
import LogInForm from "../components/GlobalComponents/LogIn";
import Loader from "../components/GlobalComponents/Loader";
import Swal from "sweetalert2";
import { ThemeContext } from "../contexts/ThemeContext";
import LogInImage from "../assets/images/login.png";
import elips from "../assets/images/Ellipse.png";

// LOGIN PAGE COMPONENT
function LogInPage() {
  // STATES
  const [loader, setLoader] = useState(false);
  const { bgColor, color } = useContext(ThemeContext);
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
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className="relative h-screen grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-0 pt-10 md:pt-0 overflow-hidden"
    >
      <img src={elips} alt="elips" className="absolute right-0 top-0" />
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
          LogIn
        </h1>
        <p style={{ color: `${color}` }} className="w-full text-left my-5">
          LogIn to access your eCommerce journey
        </p>
        <LogInForm logIn={logIn} />
      </div>
    </div>
  );
}
export default LogInPage;
