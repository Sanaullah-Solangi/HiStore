// IMPORTING ELEMENTS & COMPONENTS
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { addUserToDB, signInWithGoogle } from "../../utils/firebase";
// CONTEXT
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { useTheme } from "../../contexts/ThemeContext";
import googleBtn from "../../assets/images/googlebtn.png";

// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// LOGIN FORM COMPONENT
const LogInForm = ({ logIn }) => {
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
        logIn(form);
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
      {/* PASSWORD INPUT */}
      <FormInput
        name={"password"}
        message={"Please input your password!"}
        lable={"Password"}
        id={"password"}
      />
      <div className="w-full flex justify-between items-center">
        {/* REMEMBER ME CHECKBOX */}
        <Form.Item
          className=" flex justify-center"
          name="remember"
          valuePropName="checked"
        >
          <Checkbox style={{ color: `${color}` }}>Remember me</Checkbox>
        </Form.Item>
        <Link
          to={"/auth/forgotpassword"}
          className="text-red-700 cursor-pointer font-bold"
        >
          Forgot Password
        </Link>
      </div>
      {/* SUBMIT BTN */}
      <FormButton type={"primary"} text={"Submit"} buttonVariant="contained" />
      {/* NAVIGATION LINK TO SIGN UP ACCOUNT */}
      <p style={{ color: `${color}` }} className="mb-5">
        Don't have an account{" "}
        <Link to="/auth/signup" className="text-blue-500 font-bold">
          Sign Up
        </Link>
      </p>
      {/* OR LOG IN WITH GOOGLE */}
      <div className="relative w-full z-10 text-center bg-yellow-500 my-4 mb-10">
        <p className="font-bold text-gray-400 cursor-pointer absolute  left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] bg-white px-3">
          Or Login With
        </p>
        <span className="absolute w-[90%] h-[2px] bg-gray-300 left-[50%] -translate-x-[50%] top-[50%] -translate-y-[50%] -z-10"></span>
      </div>
      {/* GOOGLE BTN */}
      <FormButton
        type={"button"}
        myFunc={async () => {
          const user = await signInWithGoogle(navigate);
          addUserToDB(user, navigate);
        }}
        imgSrc={googleBtn}
        bgColor={"transparent"}
        txtColor={mainColor}
      />
    </Form>
  );
};

export default LogInForm;
