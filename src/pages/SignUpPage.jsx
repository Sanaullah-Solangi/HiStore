import SignUpForm from "../components/GlobalComponents/SignUp";
import Swal from "sweetalert2";
import Loader from "../components/GlobalComponents/Loader";
import {
  addUserToDB,
  auth,
  createUserWithEmailAndPassword,
} from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import SignUpImage from "../assets/images/Illustration.png";
import elips from "../assets/images/Ellipse.png";

// SIGN UP PAGE COMPONENT
function SignUpPage() {
  // STATES
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { bgColor, color } = useContext(ThemeContext);
  // FUNCTION TO SIGN UP || CREATE USER
  const signUp = async (formInstance) => {
    const values = formInstance.getFieldValue();
    const { username, email, password } = values;
    setLoader(true);
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await addUserToDB(user.user, navigate);
      formInstance.resetFields();
      setLoader(false);
      Swal.fire({
        title: "Congratulations!",
        text: "Your account has been successfully created.",
        icon: "success",
        confirmButtonText: "Proceed",
        confirmButtonColor: "#3085d6",
        showConfirmButton: true,
        timer: 1500, // Alert ko 1.5 second ke liye show karega
      });
    } catch (error) {
      setLoader(false);
      console.log(error.message);
      if (error.message != "Firebase: Error (auth/email-already-in-use).") {
        Swal.fire({
          title: "User Already Exists!",
          text: "An account with this email already exists. Please log in or use a different email to sign up.",
          icon: "warning",
          confirmButtonText: "Ok",
          confirmButtonColor: "#3085d6",
        });
      } else if (
        error.message !=
        "Firebase: Password should be at least 6 characters (auth/weak-password)."
      ) {
        Swal.fire({
          title: "Weak Password!",
          text: "Password should be at least 6 characters. Please enter a stronger password.",
          icon: "warning",
          confirmButtonText: "Retry",
          confirmButtonColor: "#d33",
        });
      } else {
        Swal.fire({
          title: "Sign-Up Failed!",
          text: "Account creation unsuccessful. Please try again.",
          icon: "error",
          confirmButtonText: "Retry",
          confirmButtonColor: "#d33",
        });
      }

      formInstance.resetFields();
    }
  };
  return loader ? (
    <Loader />
  ) : (
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className="relative h-screen grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-0 pt-10 md:pt-0"
    >
      <img src={elips} alt="elips" className="absolute left-0 -top-[3%]" />
      <div className="flex justify-center items-center h-full w-full md:order-1 order-2">
        <img
          src={SignUpImage}
          alt="logIn page image"
          className="md:w-[45%] h-auto w-[55%]  rotate-[30deg] md:opacity-[1] opacity-[0.4] absolute top-[50%] -translate-y-[50%] z-0"
        />
      </div>
      <div className="md:ml-20 flex flex-col justify-center items-center h-full w-full md:w-[90%] px-10 z-10 ">
        <h1
          style={{ color: `${color}` }}
          className="w-full text-left font-bold text-4xl"
        >
          SignUp
        </h1>
        <p style={{ color: `${color}` }} className="w-full text-left my-5">
          SignUp to Create Your Account
        </p>
        <SignUpForm signUp={signUp} />
      </div>
    </div>
  );
}
export default SignUpPage;
