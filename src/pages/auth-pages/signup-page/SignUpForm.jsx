// IMPORTING ELEMENTS & COMPONENTS
import { Checkbox, Form } from "antd";
import { Link } from "react-router-dom";
// CONTEXT
import { useTheme } from "../../../contexts/ThemeContext";
import FormInput from "../../../components/ui/FormInput";
import FormButton from "../../../components/ui/FormButton";
import { signInWithGoogle } from "../../../utils/firebase";
import googleBtn from "../../../assets/images/googlebtn.png";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// SIGN UP FORM COMPONENT
const SignUpForm = ({ signUp }) => {
  const [form] = Form.useForm();
  const { theme, color, bgColor, mainColor } = useTheme();
  const { isUser, setIsUser } = useContext(UserContext);
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
        label={"Username"}
        id={"username"}
      />
      {/* EMAIL INPUT */}
      <FormInput
        name={"email"}
        message={"Please input your email!"}
        label={"Email"}
        id={"email"}
      />
      {/* PASSWORD INPUT */}
      <FormInput
        name={"password"}
        message={"Please input your password!"}
        label={"Password"}
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

      <p style={{ color: `${color}` }} className="my-5 text-2xl">
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
        }}
        imgSrc={googleBtn}
        bgColor={"transparent"}
        txtColor={mainColor}
      />
    </Form>
  );
};

export default SignUpForm;
