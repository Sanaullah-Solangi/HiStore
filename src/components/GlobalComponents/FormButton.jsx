import { Checkbox, Form } from "antd";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function FormButton({ type, myFunc, text, buttonVariant }) {
  const { mainColor } = useContext(ThemeContext);
  return (
    <Form.Item className="w-full">
      <Button
        fullWidth
        onClick={myFunc}
        variant={`${buttonVariant ? `${buttonVariant}` : "outlined"}`}
        type={`${type}`}
        style={{ backgroundColor: `${mainColor}` }}
      >
        {text}
      </Button>
    </Form.Item>
  );
}

export default FormButton;
