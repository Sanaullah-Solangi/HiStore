// HOOKS
import React, { useContext } from "react";
// CONTEXTS
import { ThemeContext } from "../../contexts/ThemeContext";
// ICONS &u COMPONENTS
import { Button, Result } from "antd";
import { Link } from "react-router-dom";
// EMPTYDATA COMPONENT
function EmptyData() {
  const { theme, color, bgColor } = useContext(ThemeContext);
  return (
    <Result
      style={{
        color: `${color}`,
        backgroundColor: `${bgColor}`,
      }}
      status="warning"
      title={
        <span className="capitalize" style={{ color: theme === "light" ? "#4b5563" : "white" }}>
          Your cart is empty
        </span>
      }
      subTitle={
        <span
          style={{
            color: theme === "light" ? "#6b7280" : "white",
            fontSize: "22px",
          }}
        >
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
