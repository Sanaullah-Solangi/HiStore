import { ThemeContext } from "../../contexts/ThemeContext";
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { UserContext } from "../../contexts/UserContext";

function Navigations() {
  const { mainColor } = useContext(ThemeContext);
  const { isUser } = useContext(UserContext);
  const [navVisibility, setNavVisibility] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const { pathname } = useLocation();
  class NavigationItem {
    constructor(text, href, route) {
      this.text = text;
      this.href = href;
      this.route = route;
    }

    handleClick() {
      setNavVisibility(false);
    }
  }
  class UserNavigationItem {
    constructor(text, href, route) {
      this.text = text;
      this.href = href;
      this.route = route;
    }

    handleClick() {
      setShowUserDetails(false);
      setNavVisibility(false);
    }
  }

  // Array of navigation items
  const navigations = [
    new NavigationItem("Home", "#home", "/#home"),
    new NavigationItem("Services", "#services", "/#services"),
    new NavigationItem("Categories", "#categories", "/#categories"),
    new NavigationItem(
      "featured products",
      "#featured-products",
      "/#featured-products"
    ),
    new NavigationItem("Contact", "#contact", "/#contact"),
  ];
  const userNavigations = [
    new UserNavigationItem("Dashboard", "#home", "/admin"),
    new UserNavigationItem("Users", "#Users", "/admin/users"),
    new UserNavigationItem("Orders", "#Orders", "/admin/orders"),
    new UserNavigationItem("Products", "#Products", "/admin/Products"),
  ];

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
          className="navbar md:py-6 md:pl-4  md:w-full md:h-auto h-[100vh] flex flex-col md:flex-row flex-wrap md:items-center md:justify-center md:border-none border-r-2 border-gray-500 md:static transition-all duration-200 ease-linear absolute top-[100%] z-50 gap-3 md:gap-6 w-[70%] bg-[rgb(35,41,46)] md:bg-[rgb(27,31,35)]"
        >
          {navigations.map((nav) =>
            pathname != "/" ||
            pathname == "/cartitems" ||
            pathname == "/checkout" ? (
              // ROUTE'S LINK TAG FOR ROUTING WHEN WE ARE NOT AT THE FRONT PAGE
              <Link
                key={nav.route}
                to={nav.route}
                className="nav-item uppercase cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400 py-2 px-4 w-full"
                onClick={nav.handleClick}
              >
                {nav.text}
              </Link>
            ) : (
              // ANCHOR TAG TO SCROLL SMOOTHLY VIA IDS
              <a
                key={nav.href}
                href={nav.href}
                className="nav-item uppercase mr-5 cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400 py-2 px-4 w-full"
                onClick={nav.handleClick}
              >
                {nav.text}
              </a>
            )
          )}

          {isUser?.email == "admin@gmail.com" ? (
            /***** USER NAVIGATIONS *****/
            <div className="user-navigations mr-5 cursor-pointer font-medium md:border-none md:w-auto md:px-0 md:py-0 border-b border-gray-400  w-full flex justify-between items-center md:hidden relative">
              <span
                className="nav-item w-full h-full py-2 px-4"
                onClick={() => {
                  showUserDetails
                    ? setShowUserDetails(false)
                    : setShowUserDetails(true);
                }}
              >
                USER DETAILS
              </span>
              <MdKeyboardArrowRight
                className="arrow-icon text-3xl"
                style={{
                  display: `${!showUserDetails ? "flex" : "none"}`,
                }}
              />
              <MdKeyboardArrowLeft
                className="arrow-icon text-3xl"
                style={{
                  display: `${showUserDetails ? "flex" : "none"}`,
                }}
              />

              <div
                style={{
                  left: `${showUserDetails ? "0%" : "-100%"}`,
                  opacity: `${showUserDetails ? "1" : "0"}`,
                }}
                className="flex flex-col w-full absolute top-[100%] transition-all ease-linear duration-50 bg-[rgb(47,51,55)]"
              >
                {userNavigations.map((nav) => (
                  <Link
                    key={nav.href}
                    onClick={nav.handleClick}
                    className="sub-nav-link uppercase w-full p-4 px-6 text-xl font-medium  border-b border-gray-400 z-50"
                    to={nav.route}
                  >
                    {nav.text}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </nav>
      </div>
      <style>{`
        .nav-item:hover,
        .user-navigations:hover .arrow-icon,
        .sub-nav-link:hover {
          color: ${mainColor};
        }
        nav > a,
        .user-navigations > span {
          font-size: 1.7rem;
          font-weight: normal !important;
        }
        .sub-nav-link {
          font-size: 1.4rem !important;
        }
        @media (width < 765px) {
          nav > a,
          .user-navigations > span {
            font-size: 1.4rem;
          }
        }
        @media (width < 790px) {
          .navbar {
            gap: 0.5rem !important;
          }
        }
      `}</style>
    </header>
  );
}
export default Navigations;
