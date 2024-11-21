import { Checkbox, Form } from "antd";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function FormButton({
  type,
  myFunc,
  text,
  imgSrc,
  buttonVariant,
  bgColor,
  txtColor,
}) {
  const { mainColor } = useContext(ThemeContext);
  return (
    <Form.Item className="w-full">
      <Button
        fullWidth
        onClick={myFunc}
        variant={`${buttonVariant ? `${buttonVariant}` : "outlined"}`}
        type={`${type}`}
        style={{
          backgroundColor: `${bgColor ? bgColor : mainColor}`,
          border: `1px solid ${mainColor}`,
          color: `${txtColor ? txtColor : "white"}`,
          borderRadius: "50px",
        }}
      >
        {text ? text : ""}
        {imgSrc ? <img width={"30px"} src={imgSrc} alt="" /> : null}
      </Button>
    </Form.Item>
  );
}

export default FormButton;
