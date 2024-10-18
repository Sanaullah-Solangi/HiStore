import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";

function Navigations() {
  const { theme, mainColor, bgHoverColor } = useContext(ThemeContext);
  const [helper, setHelper] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [navVisibility, setNavVisibility] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  return (
    <header
      style={{
        backgroundColor: `rgb(27,31,35)`,
        color: "white",
      }}
      className="text-whit body-font md:border-none h-auto border-b-2 border-gray-700"
    >
      <div className="mx-auto flex relative  md:py-0 py-7 items-center">
        {/* TOGGLE BTNS */}
        <div
          onClick={() => {
            navVisibility ? setNavVisibility(false) : setNavVisibility(true);
          }}
          className="flex justify-center items-center text-2xl border-r-2  md:hidden absolute left-0 top-0 h-full p-4 cursor-pointer"
        >
          {navVisibility ? <IoMdClose /> : <FaBars />}
        </div>
        {/* NAVIGATION  */}
        <nav
          style={{
            left: `${navVisibility ? "0%" : "-100%"}`,
            boxShadow: "0px 0px 5px rgba(200,200,200,0.2)",
          }}
          className="md:py-4 md:pl-4  md:w-full md:h-auto h-screen flex flex-col md:flex-row flex-wrap md:items-center md:justify-center md:border-none border-r-2 border-gray-500 md:text-base text-lg md:static transition-all duration-200 ease-linear absolute top-[100%] z-10 gap-3 md:gap-0 w-[70%] bg-[rgb(35,41,46)] md:bg-[rgb(27,31,35)]"
        >
          {/* HOME */}
          <Link
            to={"/"}
            className="mr-5 cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400 py-2 px-4 w-full"
            style={{ color: `${isHover && helper == 1 ? mainColor : ""}` }}
            onMouseOver={() => {
              setIsHover(true);
              setHelper(1);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            onClick={() => {
              setNavVisibility(false);
            }}
          >
            HOME
          </Link>
          {/* SERVICES */}
          <Link
            to={"/services"}
            className="mr-5 cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400 py-2 px-4 w-full"
            style={{ color: `${isHover && helper == 2 ? mainColor : ""}` }}
            onMouseOver={() => {
              setIsHover(true);
              setHelper(2);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            onClick={() => {
              setNavVisibility(false);
            }}
          >
            SERVICES
          </Link>
          {/* CATEGORIES */}
          <Link
            to={"/categories"}
            className="mr-5 cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400 py-2 px-4 w-full"
            style={{ color: `${isHover && helper == 3 ? mainColor : ""}` }}
            onMouseOver={() => {
              setIsHover(true);
              setHelper(3);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            onClick={() => {
              setNavVisibility(false);
            }}
          >
            CATOGARIES
          </Link>
          {/* FEATURED PROD LINK */}
          <Link
            to={"/FeaturedProds"}
            className="mr-5 cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400 py-2 px-4 w-full"
            style={{ color: `${isHover && helper == 4 ? mainColor : ""}` }}
            onMouseOver={() => {
              setIsHover(true);
              setHelper(4);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            onClick={() => {
              setNavVisibility(false);
            }}
          >
            FEATURED PROD
          </Link>
          {/* CONTACT LINK */}
          <Link
            to={"/asdf"}
            className="mr-5 cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400 py-2 px-4 w-full"
            style={{ color: `${isHover && helper == 5 ? mainColor : ""}` }}
            onMouseOver={() => {
              setIsHover(true);
              setHelper(5);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            onClick={() => {
              setNavVisibility(false);
            }}
          >
            CONTACT
          </Link>
          {/***** USER NAVIGATIONS *****/}
          <div
            className="mr-5 cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400 py-2 px-4 w-full flex justify-between items-center md:hidden relative"
            style={{ color: `${isHover && helper == 6 ? mainColor : ""}` }}
            onMouseOver={() => {
              setIsHover(true);
              setHelper(6);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            onClick={() => {
              showUserDetails
                ? setShowUserDetails(false)
                : setShowUserDetails(true);
            }}
          >
            USER DETAILS{" "}
            <MdKeyboardArrowRight
              className="text-3xl"
              style={{ display: `${!showUserDetails ? "flex" : "none"}` }}
            />
            <MdKeyboardArrowLeft
              className="text-3xl"
              style={{ display: `${showUserDetails ? "flex" : "none"}` }}
            />
            <div
              style={{
                left: `${showUserDetails ? "0%" : "-100%"}`,
                opacity: `${showUserDetails ? "1" : "0"}`,
              }}
              className="flex flex-col w-full absolute top-[100%] transition-all ease-linear duration-50 bg-[rgb(47,51,55)]"
            >
              <Link
                onMouseOver={() => {
                  setIsHover(true);
                  setHelper(7);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                  setHelper(0);
                }}
                onClick={() => {
                  setShowUserDetails(false);
                  setNavVisibility(false);
                }}
                className="w-full p-4 px-6 text-xl font-medium capitalize border-b border-gray-400"
                to={"/user/Profile"}
              >
                Profile
              </Link>
              <Link
                onMouseOver={() => {
                  setIsHover(true);
                  setHelper(8);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                  setHelper(0);
                }}
                onClick={() => {
                  setShowUserDetails(false);
                  setNavVisibility(false);
                }}
                className="w-full p-4 px-6 text-xl font-medium capitalize border-b border-gray-400"
                to={"/user/Orders"}
              >
                Orders
              </Link>
              <Link
                onMouseOver={() => {
                  setIsHover(true);
                  setHelper(9);
                }}
                onMouseLeave={() => {
                  setIsHover(false);
                  setHelper(0);
                }}
                onClick={() => {
                  setShowUserDetails(false);
                  setNavVisibility(false);
                }}
                className="w-full p-4 px-6 text-xl font-medium capitalize border-b border-gray-400"
                to={"/user/Products"}
              >
                Products
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
export default Navigations;
