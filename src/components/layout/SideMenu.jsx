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
        backgroundColor: `${
          theme == "black" ? bgColor : "rgba(230,230,230,1)"
        }`,
        color: `${color}`,
      }}
      className="min-h-full w-1/4 hidden md:flex flex-col justify-start items-star"
    >
      {/* DASHBOARD */}
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
        className="w-full p-4 px-6 text-xl font-bold capitalize border-b border-gray-400"
        to={"/admin"}
      >
        Dashboard
      </Link>
      {/* USERS */}
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
        className="w-full p-4 px-6 text-xl font-bold capitalize border-b border-gray-400"
        to={"/admin/users"}
      >
        Users
      </Link>
      {/* PRODUCTS */}
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
        className="w-full p-4 px-6 text-xl font-bold capitalize border-b border-gray-400"
        to={"/admin/products"}
      >
        Products
      </Link>
      {/* ORDERS */}
      <Link
        onMouseOver={() => {
          setIsHover(true);
          setHelper(4);
        }}
        onMouseLeave={() => {
          setIsHover(false);
          setHelper(0);
        }}
        style={{
          backgroundColor: `${
            isHover & (helper == 4) ? `${bgHoverColor}` : ""
          }`,
        }}
        className="w-full p-4 px-6 text-xl font-bold capitalize border-b border-gray-400"
        to={"/admin/orders"}
      >
        Orders
      </Link>
    </div>
  );
}
export default SideMenu;
