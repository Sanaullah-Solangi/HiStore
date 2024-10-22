import { FloatingLabel } from "flowbite-react";
import { Checkbox, Form } from "antd";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function FormInput({ name, message, lable, id }) {
  const { mainColor } = useContext(ThemeContext);
  const [isHover, setIsHover] = useState(false);
  const [helper, setHelper] = useState(0);
  return (
    <Form.Item
      className="w-full"
      name={`${name}`}
      rules={[
        {
          required: true,
          message: `${message}`,
        },
      ]}
    >
      <FloatingLabel
        variant="outlined"
        label={`${lable}`}
        id={`${id}`}
        type={`${id}`}
        name={`${id}`}
        className="myInput"
        style={{
          border: `${isHover ? `1px solid ${mainColor}` : ""}`,
        }}
        onFocus={() => {
          setIsHover(true);
          setHelper(1);
        }}
        onBlur={() => {
          setIsHover(false);
          setHelper(0);
        }}
      />
    </Form.Item>
  );
}

export default FormInput;
