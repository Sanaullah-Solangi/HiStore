// HOOKS
import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//CONTEXTS
import { UserContext } from "../../contexts/UserContext";
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { LogoUrl } from "../../contexts/LogoContext";
// COMPONENTS & FUNCTIONS
import { signOut, auth } from "../../utils/firebase";
// ICONS & OTHERS
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { MdSunny } from "react-icons/md";
import { Badge } from "antd";
import { FiLogOut } from "react-icons/fi";
import { LuLogIn } from "react-icons/lu";
// FUNCTION OF LOGOUT
async function logOut() {
  try {
    const res = await signOut(auth);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
function Header() {
  const navigate = useNavigate();
  const { theme, setTheme } = useContext(ThemeContext);
  const { imgUrl } = useContext(LogoUrl);
  const { cartItems } = useContext(CartContext);
  const { isUser } = useContext(UserContext);
  return (
    <header className="text-gray-600 body-font ">
      {/* WRAPPER */}
      <div className="container mx-auto flex flex-wrap px-5 py-8 flex-col md:flex-row items-center">
        {/* LOGO */}
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={imgUrl.current} alt="" />
        </a>
        {/* === NAGIGATIONS ===*/}
        <nav className="md:ml-auto flex flex-wrap items-center gap-4 text-base justify-center">
          {/* SEARCHBAR */}
          <label className="inputCover border border-gray-300 px-4 py-1 rounded-full flex justify-between items-center ">
            {/* INPUT */}
            <input
              type="text"
              className="capitalize border-none outline-none"
              placeholder="Search here"
            />
            {/* SEARCH ICON */}
            <CiSearch className="text-gray-900" fontSize={"1.5rem"} />
          </label>
          {/* SHOPING CART ICON */}
          <Link to={"/CartItems"}>
            <Badge count={cartItems.length} color="orange">
              <FiShoppingCart
                fontSize={"1.8rem"}
                className="hover:text-orange-600 cursor-pointer"
              />
            </Badge>
          </Link>
          {/* USER ICON */}
          <HiOutlineUser
            fontSize={"1.8rem"}
            className="hover:text-orange-600 cursor-pointer"
          />
          {/* SETTING ICON */}
          <IoSettingsOutline
            fontSize={"1.8rem"}
            className="hover:text-orange-600 cursor-pointer"
          />
          {/* THEME ICONS */}
          {theme == "light" ? (
            // MOON
            <MdDarkMode
              onClick={() => {
                setTheme("black");
              }}
              fontSize={"1.8rem"}
              className="hover:text-orange-600 cursor-pointer transition-all duration-150 ease-linear"
            />
          ) : (
            // SUN
            <MdSunny
              onClick={() => {
                setTheme("light");
              }}
              fontSize={"1.8rem"}
              className="hover:text-orange-600 cursor-pointer transition-all duration-150 ease-linear"
            />
          )}
          {/* LOGOUT & LOGiN BTNS */}
          {isUser ? (
            // LOG OUT
            <FiLogOut
              onClick={() => {
                logOut();
              }}
              fontSize={"1.8rem"}
              className="hover:text-orange-600 cursor-pointer"
            />
          ) : (
            // LOG IN
            <LuLogIn
              onClick={() => {
                navigate("/LogInPage");
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
