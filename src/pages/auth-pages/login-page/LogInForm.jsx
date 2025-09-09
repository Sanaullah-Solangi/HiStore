// IMPORTING ELEMENTS & COMPONENTS
import { Checkbox, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { addUserToDB, signInWithGoogle } from "../../../utils/firebase";
// CONTEXT
import FormInput from "../../../components/ui/FormInput";
import Button from "../../../components/ui/Button";
import { useTheme } from "../../../contexts/ThemeContext";
import googleBtn from "../../../assets/images/googlebtn.png";
import GoogleLogin from "../../../components/ui/GoogleLogin";
import AuthNavLink from "../../../components/ui/AuthNavLink";
import RememberMe from "../../../components/ui/RememberMe";
const inputFields = [
  {
    name: "email",
    message: "please input your email!",
    label: "Email",
    id: "email",
    type: "email",
  },
  {
    name: "password",
    message: "please input your password!",
    label: "Password",
    id: "password",
    type: "password",
  },
];
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
      {/* INPUT FIELDS */}
      {inputFields.map((field) => (
        <FormInput
          key={field.id}
          name={field.name}
          message={field.message}
          label={field.label}
          id={field.id}
          type={field.type}
        />
      ))}

      <div className="w-full flex justify-between items-center">
        {/* REMEMBER ME CHECKBOX */}
        <RememberMe varient={"login"} />
        <Link
          to={"/auth/forgot-password"}
          className="text-red-700 cursor-pointer font-bold"
        >
          Forgot Password
        </Link>
      </div>
      {/* SUBMIT BTN */}
      <Button type={"primary"} text={"Submit"} buttonVariant="contained" />
      {/* NAVIGATION LINK TO SIGN UP ACCOUNT */}
      <AuthNavLink
        path="/auth/signup"
        para="Don't have an account"
        title="Sign Up"
      />
      {/* OR LOG IN WITH GOOGLE */}
      <GoogleLogin />
    </Form>
  );
};

export default LogInForm;
