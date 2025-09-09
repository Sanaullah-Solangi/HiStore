// IMPORTING ELEMENTS & COMPONENTS
import { Checkbox, Form } from "antd";
import { Link } from "react-router-dom";
// CONTEXT
import { useTheme } from "../../../contexts/ThemeContext";
import FormInput from "../../../components/ui/FormInput";
import Button from "../../../components/ui/Button";
import { useContext } from "react";
import { UserContext } from "../../../contexts/UserContext";
import GoogleLogin from "../../../components/ui/GoogleLogin";
import RememberMe from "../../../components/ui/RememberMe";
import AuthNavLink from "../../../components/ui/AuthNavLink";

const inputFields = [
  {
    name: "username",
    message: "please input your username!",
    label: "Username",
    id: "username",
    type: "text",
  },
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

// SIGN UP FORM COMPONENT
const SignUpForm = ({ signUp }) => {
  const [form] = Form.useForm();
  const { theme, color, bgColor, mainColor } = useTheme();
  const { user, setUser } = useContext(UserContext);
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
      {/* REMEMBER ME CHECKBOX */}
      <RememberMe />
      {/* SUBMIT BTN */}
      <Button type={"primary"} text={"Submit"} buttonVariant={"contained"} />
      {/* NAVIGATION LINK TO SIGN UP ACCOUNT */}

      <AuthNavLink
        path="/auth/login"
        title="Log In"
        para=" Already have an account"
      />
      {/* OR LOG IN WITH GOOGLE */}
      <GoogleLogin />
    </Form>
  );
};

export default SignUpForm;
