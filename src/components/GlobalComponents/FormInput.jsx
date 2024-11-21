import { FloatingLabel } from "flowbite-react";
import { Checkbox, Form } from "antd";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function FormInput({ name, message, lable, id, value, enability, type }) {
  const { mainColor, color } = useContext(ThemeContext);
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
        defaultValue={value ? value : null}
        id={`${id}`}
        type={`${type ? type : "text"}`}
        name={`${id}`}
        disabled={enability ? enability : false}
        className="myInput mb-5"
        style={{
          color: `${color}`,
          border: `${isHover ? `1px solid ${mainColor}` : ""}`,
          borderRadius: "50px",
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
