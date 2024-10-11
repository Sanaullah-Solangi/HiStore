// IMPORTING ELEMENTS & COMPONENTS
import React, { useContext, useState } from "react";
import { Checkbox, Form } from "antd";
import { FloatingLabel } from "flowbite-react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "../../utils/firebase";
// CONTEXT
import { ThemeContext } from "../../contexts/ThemeContext";
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// LOGIN FORM COMPONENT
const LogInForm = ({ logIn }) => {
  const [form] = Form.useForm();
  const { theme, color, bgColor } = useContext(ThemeContext);
  return (
    // FORM WRAPPER
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className=" px-5 py-24 h-screen mx-auto flex md:items-center justify-center lg:items-start md:flex-row md:flex-nowrap flex-wrap"
    >
      {/* FORM */}
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
          logIn(form);
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {/* EMAIL INPUT */}
        <Form.Item
          className="w-full"
          //   label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <FloatingLabel
            variant="filled"
            label="Email"
            id="email"
            type="email"
            name="email"
            // required
            className="w-full"
          />
        </Form.Item>
        {/* PASSWORD INPUT */}
        <Form.Item
          className="w-full"
          //   label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <FloatingLabel
            variant="filled"
            label="Password"
            id="password"
            type="password"
            name="password"
            // required
            className="w-full"
          />
        </Form.Item>
        {/* REMEMBER ME CHECKBOX */}
        <Form.Item
          className="w-full flex justify-center"
          name="remember"
          valuePropName="checked"
        >
          <Checkbox style={{ color: `${color}` }}>Remember me</Checkbox>
        </Form.Item>
        {/* SUBMIT BTN */}
        <Form.Item className="w-full">
          <Button
            fullWidth
            variant="contained"
            type="primary"
            htmltype="submit"
          >
            Submit
          </Button>
        </Form.Item>
        {/* GOOGLE BTN */}
        <Form.Item className="w-full">
          <Button
            fullWidth
            variant="outlined"
            type="button"
            // htmltype="submit"
            onClick={() => {
              signInWithGoogle();
            }}
          >
            SIGN IN WITH GOOGLE
          </Button>
        </Form.Item>
        <p style={{ color: `${color}` }}>
          Don't have an account{" "}
          <Link to="/auth/SignUpPage" className="text-blue-500 font-bold">
            Sign Up
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default LogInForm;
