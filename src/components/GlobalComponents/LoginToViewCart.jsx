// HOOKS
import React, { useContext } from "react";
// CONTEXTS
import { ThemeContext } from "../../contexts/ThemeContext";
// ICONS & COMPONENTS
import { Button, Result } from "antd";
import { Link } from "react-router-dom";

// LoginToViewCart COMPONENT
function LoginToViewCart() {
  const { theme, color, bgColor } = useContext(ThemeContext);
  return (
    <Result
      style={{
        color: `${color}`,
        backgroundColor: `${bgColor}`,
      }}
      status="warning"
      title={
        <span
          className="capitalize"
          style={{ color: theme === "light" ? "#4b5563" : "white" }}
        >
          Please log in to view your cart
        </span>
      }
      subTitle={
        <span
          style={{
            color: theme === "light" ? "#6b7280" : "white",
            fontSize: "22px",
          }}
        >
          You need to log in to see the items in your cart.
        </span>
      }
      extra={
        <Link to="/auth/LogInPage">
          <Button type="primary" key="login">
            Log In
          </Button>
        </Link>
      }
    />
  );
}

export default LoginToViewCart;
