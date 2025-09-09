import { useContext } from "react";
import { Button, Result } from "antd";
import { ThemeContext } from "../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function StatusMessage({
  status,
  title,
  subTitle,
  onClick,
  btnTxt,
  searchTerm,
}) {
  const { theme, mainColor, bgColor } = useContext(ThemeContext);
  const navigate = useNavigate();
  return (
    <>
      <Result
        status={status}
        title={<span className="title">{title}</span>}
        subTitle={
          <span className="sub-title">
            {subTitle} {searchTerm ? searchTerm : ""}
          </span>
        }
        extra={
          <Button onClick={onClick ? onClick : () => navigate("/")}>
            {btnTxt}
          </Button>
        }
      />
      <style>{`
        .ant-result {
          background: ${bgColor};
          width:100%;
        }
        .title,
        .sub-title {
          text-transform: capitalize;
          font-family: "poppins", sens-serif;
          color: ${theme === "light" ? "#6b7280" : "white"};
        }
        .ant-result-extra > button {
          color: ${mainColor};
          background: transparent;
          padding: 2rem 2rem;
          font-size:1.7rem;
          border-radius: 3px;
          border: 2px solid ${mainColor} !important;
          box-shadow: none !important;
          outline:none:
          font-weight: bold !important;
        }
        .ant-result-extra > button:hover {
          color: white !important;
          background: ${mainColor} !important;
        }
      `}</style>
    </>
  );
}

export default StatusMessage;
