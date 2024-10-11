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
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMoon } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";
import { Avatar, Badge } from "antd";
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
  const { theme, setTheme, mainColor } = useContext(ThemeContext);
  const { imgUrl } = useContext(LogoUrl);
  const { cartItems } = useContext(CartContext);
  const { isUser } = useContext(UserContext);
  const [isHover, setIsHover] = useState(false);
  const [helper, setHelper] = useState(0);
  console.log(isUser);
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
              className="capitalize border-none outline-none bg-transparent"
              placeholder="Search here"
            />
            {/* SEARCH ICON */}
            <CiSearch className="text-gray-900" fontSize={"1.5rem"} />
          </label>
          {/* SHOPING CART ICON */}
          <Link to={"/CartItems"}>
            <Badge count={cartItems.length} color={`${mainColor}`}>
              <PiShoppingCartSimple
                fontSize={"1.8rem"}
                className=" cursor-pointer"
                style={{ color: `${isHover && helper == 1 ? mainColor : ""}` }}
                onMouseOver={() => {
                  setIsHover(true);
                  setHelper(1);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                  setHelper(0);
                }}
              />
            </Badge>
          </Link>

          {/* SETTING ICON */}
          <IoSettingsOutline
            fontSize={"1.8rem"}
            className="cursor-pointer"
            style={{ color: `${isHover && helper == 2 ? mainColor : ""}` }}
            onMouseOver={() => {
              setIsHover(true);
              setHelper(2);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
          />
          {/* THEME ICONS */}
          {theme == "light" ? (
            // MOON
            <MdOutlineWbSunny
              onClick={() => {
                setTheme("black");
              }}
              fontSize={"1.8rem"}
              className="cursor-pointer transition-all duration-150 ease-linear"
              style={{ color: `${isHover && helper == 3 ? mainColor : ""}` }}
              onMouseOver={() => {
                setIsHover(true);
                setHelper(3);
              }}
              onMouseLeave={() => {
                setIsHover(false);
                setHelper(0);
              }}
            />
          ) : (
            // SUN
            <HiOutlineMoon
              onClick={() => {
                setTheme("light");
              }}
              fontSize={"1.8rem"}
              className="cursor-pointer transition-all duration-150 ease-linear"
              style={{ color: `${isHover && helper == 4 ? mainColor : ""}` }}
              onMouseOver={() => {
                setIsHover(true);
                setHelper(4);
              }}
              onMouseLeave={() => {
                setIsHover(false);
                setHelper(0);
              }}
            />
          )}
          {/* LOGOUT & LOGiN BTNS */}
          {isUser.isLogIn ? (
            // LOG IN HONE PER YE SHOW HOGA
            <Avatar
              onClick={() => {
                logOut();
              }}
              src={`${
                isUser.user.photoURL
                  ? isUser.user.photoURL
                  : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"
              }`}
              fontSize={"1.8rem"}
              className="cursor-pointer"
            />
          ) : (
            // LOG OUT HONE K BAAD YE SHOW HOGA
            <HiOutlineUser
              onClick={() => {
                navigate("/auth/LogInPage");
              }}
              fontSize={"1.8rem"}
              className="cursor-pointer transition-all duration-150 ease-linear"
              style={{ color: `${isHover && helper == 5 ? mainColor : ""}` }}
              onMouseOver={() => {
                setIsHover(true);
                setHelper(5);
              }}
              onMouseLeave={() => {
                setIsHover(false);
                setHelper(0);
              }}
            />
          )}
        </nav>
      </div>
    </header>
  );
}
export default Header;
