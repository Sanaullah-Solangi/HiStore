// HOOKS
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//CONTEXTS
import { UserContext } from "../../contexts/UserContext";
import { CartContext } from "../../contexts/CartContext";
import { useTheme } from "../../contexts/ThemeContext";
import { LogoUrl } from "../../contexts/LogoContext";
// COMPONENTS & FUNCTIONS
import { signOut, auth, db, getDoc, doc } from "../../utils/firebase";
// ICONS & OTHERS
import { PiShoppingCartSimple } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { HiOutlineMoon } from "react-icons/hi";
import { MdOutlineWbSunny } from "react-icons/md";
import { Avatar, Badge } from "antd";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

function Header() {
  const navigate = useNavigate();
  const { theme, setTheme, mainColor } = useTheme();
  const { imgUrl } = useContext(LogoUrl);
  const { cartItems, searchTerm, setSearchTerm } = useContext(CartContext);
  const { isUser, setIsUser } = useContext(UserContext);
  const [avatarMenuVisibility, setAvatarMenuVisibility] = useState(false);
  const { pathname } = useLocation();
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  useEffect(() => {
    if (searchTerm != "" && pathname.slice(0, 15) != "/all-products") {
      navigate(`/all-products/all`);
    }
  }, [searchTerm]);
  // FUNCTION OF LOGOUT
  async function logOut() {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do You Want To Log Out!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log Out!",
      }).then(async (result) => {
        if (result?.isConfirmed) {
          const res = await signOut(auth);
          const obj = {
            isLogIn: false,
          };
          localStorage.setItem("loggedInUser", JSON.stringify(obj));
          setIsUser(obj);
          Swal.fire({
            title: "LogedOut!",
            text: "Your Are Successfully Loged Out.",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/");
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: "There was an issue logging you out. Please try again later.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  }
  async function loginuser() {
    const userRef = doc(db, "Users", loggedInUser?.uid);
    const userData = await getDoc(userRef);
    console.log("USER DATA IN HEADER=>", userData.data());
  }
  return (
    <header className="text-gray-600 body-font ">
      {/* WRAPPER */}
      <div className="container mx-auto flex flex-wrap px-5 py-8 flex-col md:flex-row items-center">
        {/* LOGO */}
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <img src={imgUrl.current} alt="" />
        </a>
        {/* === NAGIGATIONS ===*/}
        <nav className="md:ml-auto  flex flex-wrap items-center gap-4 text-base justify-center">
          {/* SEARCHBAR 
           <label className="inputCover border border-gray-300 px-4 py-1 rounded-full flex justify-between items-center ">
             INPUT 
            <input
              type="text"
              className="border-none outline-none bg-transparent"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            SEARCH ICON 
            <CiSearch className="text-gray-900" fontSize={"1.5rem"} />
          </label> */}
          {/* SHOPING CART ICON */}
          <Link to={"/cartitems"}>
            <Badge
              count={loggedInUser?.isLogIn ? cartItems.length : ""}
              color={`${mainColor}`}
            >
              <PiShoppingCartSimple
                fontSize={"3rem"}
                className="icon cursor-pointer"
              />
            </Badge>
          </Link>

          {/* SETTING ICON */}
          <IoSettingsOutline
            fontSize={"3rem"}
            className="icon cursor-pointer"
            onClick={loginuser}
          />
          {/* THEME ICONS */}
          {theme == "light" ? (
            // MOON
            <MdOutlineWbSunny
              onClick={() => {
                setTheme("black");
              }}
              fontSize={"3rem"}
              className="icon cursor-pointer transition-all duration-150 ease-linear"
            />
          ) : (
            // SUN
            <HiOutlineMoon
              onClick={() => {
                setTheme("light");
              }}
              fontSize={"3rem"}
              className="icon cursor-pointer transition-all duration-150 ease-linear"
            />
          )}
          {/* LOGOUT & LOGiN BTNS */}
          {loggedInUser?.isLogIn ? (
            // LOG IN HONE PER YE SHOW HOGA
            <div className="relative">
              <Avatar
                onClick={() => {
                  navigate("/user/profile");
                  // avatarMenuVisibility
                  //   ? setAvatarMenuVisibility(false)
                  //   : setAvatarMenuVisibility(true);
                }}
                src={`${
                  isUser?.photoURL
                    ? loggedInUser.photoURL
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"
                }`}
                fontSize={"3rem"}
                className="icon cursor-pointer relative z-50"
              />
              {/* AVATAR SIDEMENU */}
              <div
                style={{
                  visibility: `${avatarMenuVisibility ? "visible" : "hidden"}`,
                  height: "125px",
                }}
                className="absolute w-[150px] h-[125px] z-[60] top-[90%] left-[-400%] overflow-hidden "
              >
                <div
                  style={{
                    left: `${avatarMenuVisibility ? "0%" : "100%"}`,
                  }}
                  className="absolute z-40 top-[0%] left-0 w-[100%] h-[100%] bg-[rgb(210,212,214)] flex justify-start items-start flex-col    rounded-l-lg overflow-hidden transition-all duration-100 ease-linear border-r-8 border-gray-400"
                >
                  {loggedInUser.email == "admin@gmail.com" ? (
                    <Link
                      className="w-full"
                      to={"/admin"}
                      onClick={() => {
                        setAvatarMenuVisibility(false);
                      }}
                    >
                      <p className="cursor-pointer py-2 px-5 whitespace-nowrap text-black  border-b-2 border-gray-600 text-base font-bold font-mono w-full hover:bg-[rgb(201,198,198)] uppercase transition-all duration-100 ease-linear">
                        Dashboard
                      </p>
                    </Link>
                  ) : null}
                  {/* PROFILE LINK */}
                  {loggedInUser.email != "admin@gmail.com" ? (
                    <Link
                      className="w-full"
                      to={"/user/profile"}
                      onClick={() => {
                        setAvatarMenuVisibility(false);
                      }}
                    >
                      <p className="cursor-pointer py-2 px-5 whitespace-nowrap text-black  border-b-2 border-gray-600 text-base font-bold font-mono w-full hover:bg-[rgb(201,198,198)] uppercase transition-all duration-100 ease-linear">
                        Profile
                      </p>
                    </Link>
                  ) : null}

                  {/* USER ORDERS LINK */}
                  <Link
                    className="w-full"
                    to={"/user/orders"}
                    onClick={() => {
                      setAvatarMenuVisibility(false);
                    }}
                  >
                    <p className="cursor-pointer py-2 px-5 whitespace-nowrap text-black  border-b-2 border-gray-600 text-base font-bold font-mono w-full hover:bg-[rgb(201,198,198)] uppercase transition-all duration-100 ease-linear">
                      Orders
                    </p>
                  </Link>
                  {/* LOG OUT BTN */}
                  <p
                    onClick={() => {
                      logOut();
                    }}
                    className="cursor-pointer py-2 px-5 whitespace-nowrap text-black  border-b-2  border-gray-600 text-base font-bold font-mono w-full uppercase transition-all duration-100 ease-linear hover:bg-red-700 hover:border-red-700 hover:text-white"
                  >
                    LogOut
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // LOG OUT HONE K BAAD YE SHOW HOGA
            <HiOutlineUser
              onClick={() => {
                navigate("/auth/login");
              }}
              fontSize={"3rem"}
              className="icon cursor-pointer transition-all duration-150 ease-linear"
            />
          )}
        </nav>
      </div>
      <style>{`
        .icon:hover {
          color: ${mainColor};
        }
      `}</style>
    </header>
  );
}
export default Header;
