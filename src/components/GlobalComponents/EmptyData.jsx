import React, { useContext } from "react";
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
function EmptyData() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <Result
      style={{
        color: `${theme == "light" ? "#4b5563" : "white"}`,
        backgroundColor: `${theme == "light" ? "white" : "black"}`,
      }}
      status="warning"
      title={
        <span style={{ color: theme === "light" ? "#4b5563" : "white" }}>
          Your cart is empty
        </span>
      }
      subTitle={
        <span style={{ color: theme === "light" ? "#6b7280" : "white",fontSize:"22px" }}>
          It looks like you haven't added any items to your cart yet. Browse
          products and add them to your cart.
        </span>
      }
      extra={
        <Link to="/">
          <Button type="primary" key="shop">
            Start Shopping
          </Button>
        </Link>
      }
    />
  );
}
export default EmptyData;
