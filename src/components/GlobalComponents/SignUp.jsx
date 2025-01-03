// IMPORTING ELEMENTS & COMPONENTS
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
// CONTEXT
import { useTheme } from "../../contexts/ThemeContext";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import { addUserToDB, signInWithGoogle } from "../../utils/firebase";
import googleBtn from "../../assets/images/googlebtn.png";
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// SIGN UP FORM COMPONENT
const SignUpForm = ({ signUp }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { theme, color, bgColor, mainColor } = useTheme();
  return (
    // FORM
    <Form
      form={form}
      name="basic"
      className="rounded-lg md:w-[100%] w-full flex flex-col justify-center items-center"
      initialValues={{
        remember: true,
      }}
      onFinish={() => {
        signUp(form);
      }}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
    >
      {/* USERNAME INPUT */}
      <FormInput
        name={"username"}
        message={"Please input your username!"}
        lable={"Username"}
        id={"username"}
      />
      {/* EMAIL INPUT */}
      <FormInput
        name={"email"}
        message={"Please input your email!"}
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
      {/* REMEMBER ME CHECKBOX */}
      <Form.Item
        className="w-full flex justify-center"
        name="remember"
        valuePropName="checked"
      >
        <Checkbox style={{ color: `${color}` }}>Remember me</Checkbox>
      </Form.Item>
      {/* SUBMIT BTN */}
      <FormButton
        type={"primary"}
        text={"Submit"}
        buttonVariant={"contained"}
      />
      {/* NAVIGATION LINK TO SIGN UP ACCOUNT */}

      <p style={{ color: `${color}` }} className="mb-5">
        Already have an account{" "}
        <Link to="/auth/login" className="text-blue-500 font-bold">
          Log In
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
          const user = await signInWithGoogle();
          addUserToDB(null, user, navigate);
        }}
        imgSrc={googleBtn}
        bgColor={"transparent"}
        txtColor={mainColor}
      />
    </Form>
  );
};

export default SignUpForm;
