import { useContext } from "react";
import { Button, Result } from "antd";
// CONTEXTS
import { ThemeContext } from "../../contexts/ThemeContext";
function NotFound() {
  const { theme, color, bgColor } = useContext(ThemeContext);
  return (
    <Result
      style={{
        color: `${color}`,
        backgroundColor: `${bgColor}`,
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
