import { Form } from "antd";
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
      <button
        onClick={myFunc}
        type={`${type}`}
        style={{
          backgroundColor: `${bgColor ? bgColor : mainColor}`,
          border: `2px solid ${mainColor}`,
          color: `${txtColor ? txtColor : "white"}`,
        }}
        className="w-full py-2 text-3xl rounded-[50px] flex justify-center items-center"
      >
        {text ? text : ""}
        {imgSrc ? <img width={"30px"} src={imgSrc} alt="" /> : null}
      </button>
    </Form.Item>
  );
}

export default FormButton;
