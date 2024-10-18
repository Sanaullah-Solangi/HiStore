import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

function SideMenu() {
  const { theme, color, bgColor, bgHoverColor } = useContext(ThemeContext);
  const [isHover, setIsHover] = useState(false);
  const [helper, setHelper] = useState(0);
  return (
    <div
      style={{
        backgroundColor: `${bgColor}`,
        color: `${color}`,
      }}
      className="h-full w-1/4 hidden md:flex flex-col justify-start items-start"
    >
      <Link
        onMouseOver={() => {
          setIsHover(true);
          setHelper(1);
        }}
        onMouseLeave={() => {
          setIsHover(false);
          setHelper(0);
        }}
        style={{
          backgroundColor: `${
            isHover & (helper == 1) ? `${bgHoverColor}` : ""
          }`,
        }}
        className="w-full p-4 px-6 text-xl font-medium capitalize border-b border-gray-400"
        to={"/user/Profile"}
      >
        Profile
      </Link>
      <Link
        onMouseOver={() => {
          setIsHover(true);
          setHelper(3);
        }}
        onMouseLeave={() => {
          setIsHover(false);
          setHelper(0);
        }}
        style={{
          backgroundColor: `${
            isHover & (helper == 3) ? `${bgHoverColor}` : ""
          }`,
        }}
        className="w-full p-4 px-6 text-xl font-medium capitalize border-b border-gray-400"
        to={"/user/Orders"}
      >
        Orders
      </Link>
      <Link
        onMouseOver={() => {
          setIsHover(true);
          setHelper(2);
        }}
        onMouseLeave={() => {
          setIsHover(false);
          setHelper(0);
        }}
        style={{
          backgroundColor: `${
            isHover & (helper == 2) ? `${bgHoverColor}` : ""
          }`,
        }}
        className="w-full p-4 px-6 text-xl font-medium capitalize border-b border-gray-400"
        to={"/user/Products"}
      >
        Products
      </Link>
    </div>
  );
}
export default SideMenu;
