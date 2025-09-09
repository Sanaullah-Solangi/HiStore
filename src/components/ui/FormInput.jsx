import { Form } from "antd";
import { useContext, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

function FormInput({
  name,
  message,
  label,
  id,
  value,
  enability,
  type,
  radius,
}) {
  const { mainColor, bgColor, textColor, theme } = useContext(ThemeContext);
  const [isFocused, setIsFocused] = useState(false);
  const [inputVal, setInputVal] = useState(value ? value : "");
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
      <div className={`w-full relative mt-7 rounded-[50px]`}>
        <label
          htmlFor={id}
          className={`absolute transition-all duration-200 ease-linear px-3 ${
            isFocused || inputVal
              ? `left-4 -top-3 ${theme == "black" && "text-white"} `
              : "left-5 top-6 bg-transparent text-gray-500 "
          }`}
          style={{
            fontSize: `${isFocused || inputVal ? "1.2rem" : "1.5rem"}`,
            background: bgColor,
          }}
        >
          {label}
        </label>
        <input
          className={`w-full py-5 px-7 text-3xl ${
            radius ? "rounded-[5px]" : "rounded-[50px]"
          } bg-transparent`}
          style={{
            border: `2px solid ${
              isFocused || inputVal
                ? mainColor
                : theme == "light"
                ? "rgb(209 213 219)"
                : "#6b7280"
            }`,
            boxShadow: "none",
            outline: "none",
            color: textColor,
            fontWeight: type == "password" ? "bold" : "",
            fontSize: type == "password" ? "2.1rem" : "",
          }}
          value={inputVal}
          type={type ? type : "text"}
          name={id}
          id={id}
          disabled={enability ? enability : false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInputVal(e.target.value)}
        />
      </div>
    </Form.Item>
  );
}

export default FormInput;
