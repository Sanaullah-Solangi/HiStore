import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function Navigations() {
  const { theme, mainColor } = useContext(ThemeContext);
  const [helper, setHelper] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [navVisibility, setNavVisibility] = useState(false);
  return (
    <header
      style={{
        backgroundColor: `rgb(27,31,35)`,
        color: "white",
      }}
      className="text-whit body-font md:border-none border-b-2 border-gray-700"
    >
      <div className="mx-auto flex relative  md:py-0 py-4 items-center">
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
        </nav>
      </div>
    </header>
  );
}
export default Navigations;
