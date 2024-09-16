import { useContext, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiHandbagSimpleLight } from "react-icons/pi";
import { LogoUrl } from "../../contexts/LogoContext";
import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Badge } from "antd";
import { CartContext } from "../../contexts/CartContext";
import { Link } from "react-router-dom";
function Header() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { imgUrl } = useContext(LogoUrl);
  const { cartItems } = useContext(CartContext);
  return (
    <header className="text-gray-600 body-font ">
      <div className="container mx-auto flex flex-wrap px-5 py-8 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={imgUrl.current} alt="" />
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center gap-4 text-base justify-center">
          <label className="inputCover border border-gray-300 px-4 py-1 rounded-full flex justify-between items-center ">
            <input
              type="text"
              className="capitalize border-none outline-none"
              placeholder="Search here"
            />
            <CiSearch className="text-gray-900" fontSize={"1.5rem"} />
          </label>
          <Link to={"/CartItems"}>
            <Badge count={cartItems.length} color="orange">
              <FiShoppingCart
                fontSize={"1.8rem"}
                className="hover:text-orange-600 cursor-pointer"
              />
            </Badge>
          </Link>

          <HiOutlineUser
            fontSize={"1.8rem"}
            className="hover:text-orange-600 cursor-pointer"
          />
          <IoSettingsOutline
            fontSize={"1.8rem"}
            className="hover:text-orange-600 cursor-pointer"
          />
          {theme == "light" ? (
            <MdDarkMode
              onClick={() => {
                setTheme("black");
              }}
              fontSize={"1.8rem"}
              className="hover:text-orange-600 cursor-pointer transition-all duration-150 ease-linear"
            />
          ) : (
            <MdSunny
              onClick={() => {
                setTheme("light");
              }}
              fontSize={"1.8rem"}
              className="hover:text-orange-600 cursor-pointer transition-all duration-150 ease-linear"
            />
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header;
