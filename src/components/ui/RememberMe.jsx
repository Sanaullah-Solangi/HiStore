import { Checkbox, Form } from "antd";
import { useTheme } from "../../contexts/ThemeContext";

function RememberMe({ varient }) {
  const { textColor } = useTheme();
  return (
    <Form.Item
      className={`${varient ? "w-fit" : "w-full"}  flex justify-center`}
      name="remember"
      valuePropName="checked"
    >
      <Checkbox style={{ color: `${textColor}` }}>Remember me</Checkbox>
    </Form.Item>
  );
}

export default RememberMe;
