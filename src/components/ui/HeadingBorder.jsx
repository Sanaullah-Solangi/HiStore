import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
function HeadingBorder() {
  const { mainColor } = useContext(ThemeContext);
  return (
    <div
      style={{
        bottom: "-50%",
        left: "50%",
        transform: "translate(-50%)",
        width: "50%",
        backgroundColor: `${mainColor}`,
      }}
      className="inline absolute h-1"
    ></div>
  );
}

export default HeadingBorder;
