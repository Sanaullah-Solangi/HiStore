import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import "../../assets/fonts/Jost-Regular.ttf";
function Button({
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
    <button
      onClick={myFunc}
      type={`${type}`}
      style={{
        backgroundColor: `${bgColor ? bgColor : mainColor}`,
        border: `2px solid ${mainColor}`,
        color: `${txtColor ? txtColor : "white"}`,
        fontFamily: "Jost",
      }}
      className="w-full py-3 text-3xl rounded-[50px] flex justify-center items-center"
    >
      {text ? text : ""}
      {imgSrc ? <img width={"30px"} src={imgSrc} alt="" /> : null}
    </button>
  );
}

export default Button;
