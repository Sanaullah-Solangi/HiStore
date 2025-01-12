import { ThemeContext } from "../../contexts/ThemeContext";
import { ColorPicker } from "antd";
import { IoIosColorPalette } from "react-icons/io";

import { useContext } from "react";
const PicColors = () => {
  const { mainColor, setMainColor, bgColor } = useContext(ThemeContext);
  return (
    <label
      htmlFor="colorPicker"
      className=" cursor-pointer border-none fixed top-32 -left-1 z-20 pl-5 py-1 pr-2 rounded-md"
      style={{
        color: `${mainColor}`,
        backgroundColor: `rgb(245,245,245)`,
        border: `1px solid rgba(0,0,0,0.2)`,
      }}
    >
      <IoIosColorPalette fontSize={"26"} className="font-bold" />
      <input
        type="color"
        id="colorPicker"
        value={mainColor}
        onChange={(e) => {
          setMainColor(e.target.value);
        }}
        style={{ display: "none" }}
      />
    </label>
   
  );
};

export default PicColors;
