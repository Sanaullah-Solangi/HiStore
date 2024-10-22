// IMPORTING ELEMENTS & COMPONENTS
import React, { useContext, useState } from "react";
import { Checkbox, Form } from "antd";
import { Link } from "react-router-dom";
// CONTEXT
import { ThemeContext } from "../../contexts/ThemeContext";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

// SIGN UP FORM COMPONENT
const SignUpForm = ({ signUp }) => {
  const [form] = Form.useForm();
  const { theme, color, bgColor } = useContext(ThemeContext);
  return (
    // FORM WRAPPER
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className=" px-5 py-24 h-screen mx-auto flex md:items-center justify-center lg:items-start md:flex-row md:flex-nowrap flex-wrap"
    >
      {/* FORM STARTS */}
      <Form
        form={form}
        name="basic"
        style={{
          boxShadow: `${theme == "light" ? "0 0 10px rgba(0,0,0,0.2" : ""}`,
          border: `${
            theme == "black" ? "2px solid rgba(255,255,255,0.6)" : ""
          }`,
        }}
        className="p-5 rounded-lg w-96 flex flex-col justify-center items-center"
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
        <p style={{ color: `${color}` }}>
          Already have an account{" "}
          <Link to="/auth/LogInPage" className="text-blue-500 font-bold">
            Log In
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpForm;
