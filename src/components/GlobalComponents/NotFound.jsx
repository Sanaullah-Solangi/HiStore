import React, { useContext } from "react";
import { Button, Result } from "antd";
import { ThemeContext } from "../../contexts/ThemeContext";
function NotFound() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <Result
      style={{
        color: `${theme == "light" ? "#4b5563" : "white"}`,
        backgroundColor: `${theme == "light" ? "white" : "black"}`,
      }}
      status="404"
      title={
        <span style={{ color: theme === "light" ? "#4b5563" : "white" }}>
          404
        </span>
      }
      subTitle={
        <span style={{ color: theme === "light" ? "#6b7280" : "white" }}>
          Sorry, the page you visited does not exist.
        </span>
      }
      extra={<Button type="primary">Back Home</Button>}
    />
  );
}

export default NotFound;
