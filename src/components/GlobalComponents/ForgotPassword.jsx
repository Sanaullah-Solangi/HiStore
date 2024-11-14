// IMPORTING ELEMENTS & COMPONENTS
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
// CONTEXT
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useTheme } from "../../contexts/ThemeContext";
import googleBtn from "../../assets/images/googlebtn.png";
import Swal from "sweetalert2";

// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  Swal.fire({
    customClass: {
      container: "sweatContainer",
      popup: "sweatPopup",
      title: "sweatTitle",
      htmlContainer: "sweatPara",
      confirmButton: "sweatBtn",
      cancelButton: "sweatBtn",
    },
    icon: "warning",
    title: "Sorry...",
    text: "Please fill in the email field.",
  });
};
// LOGIN FORM COMPONENT
const ForgotPasswordForm = ({ resetPasswordViaEmail }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { theme, color, bgColor, mainColor } = useTheme();
  return (
    // FORM WRAPPER
    <Form
      form={form}
      name="basic"
      className="md:mr-20 rounded-lg md:w-[90%] w-full flex flex-col justify-center items-center"
      initialValues={{
        remember: true,
      }}
      onFinish={() => {
        resetPasswordViaEmail(form);
      }}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {/* EMAIL INPUT */}
      <FormInput
        name={"email"}
        message={"Please Input Your Email"}
        lable={"Email"}
        id={"email"}
      />

      {/* SUBMIT BTN */}
      <FormButton type={"primary"} text={"Submit"} buttonVariant="contained" />

      {/* OR LOG IN WITH GOOGLE */}
      <div className="relative w-full z-10 text-center bg-yellow-500 my-7 mb-10">
        <p className="font-bold text-gray-400 cursor-pointer absolute  left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] bg-white px-3">
          Or Login With
        </p>
        <span className="absolute w-[90%] h-[2px] bg-gray-300 left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] -z-10"></span>
      </div>

      {/* GOOGLE BTN */}
      <FormButton
        type={"button"}
        myFunc={() => {
          signInWithGoogle(navigate);
        }}
        imgSrc={googleBtn}
        bgColor={"transparent"}
        txtColor={mainColor}
      />
    </Form>
  );
};

export default ForgotPasswordForm;
