import { useContext } from "react";
import { Button, Result } from "antd";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function NoResults({ searchTerm }) {
  const { theme, color, bgColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Result
    className="mx-auto"
      style={{
        color: color,
        backgroundColor: bgColor,
      }}
      status="404"
      title={
        <span style={{ color: theme === "light" ? "#4b5563" : "white" }}>
          No Results Found
        </span>
      }
      subTitle={
        <span style={{ color: theme === "light" ? "#6b7280" : "white" }}>
          Sorry, no items matched your search for "{searchTerm}".
        </span>
      }
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          Back Home
        </Button>
      }
    />
  );
}

export default NoResults;
