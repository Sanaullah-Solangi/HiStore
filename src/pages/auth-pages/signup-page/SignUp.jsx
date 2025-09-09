import { auth, createUserWithEmailAndPassword } from "../../../utils/firebase";
import { useState } from "react";
import SignUpForm from "./SignUpForm";
import Swal from "sweetalert2";
import Loader from "../../../components/ui/Loader";
import SignUpImage from "../../../assets/images/Illustration.png";
import FormContainer from "../../../components/ui/FormContainer";

// SIGN UP PAGE COMPONENT
function SignUp() {
  // STATES
  const [loader, setLoader] = useState(false);

  // FUNCTION TO SIGN UP || CREATE USER
  const signUp = async (formInstance) => {
    const values = formInstance.getFieldValue();
    const { username, email, password } = values;
    setLoader(true);
    try {
      localStorage.setItem("username", username);
      const user = await createUserWithEmailAndPassword(auth, email, password);
      formInstance.resetFields();
      setLoader(false);
      window.location.href = "/auth/varify-account";
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
      formInstance.resetFields();
      setLoader(false);
      console.log(error.message);
      if (error.message == "Firebase: Error (auth/email-already-in-use).") {
        Swal.fire({
          title: "User Already Exists!",
          text: "An account with this email already exists. Please log in or use a different email to sign up.",
          icon: "warning",
          confirmButtonText: "Ok",
          confirmButtonColor: "#3085d6",
        });
      } else if (
        error.message ==
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
