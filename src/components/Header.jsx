import { useContext, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiHandbagSimpleLight } from "react-icons/pi";
import { LogoUrl } from "../assets/contexts/LogoContext";

function Header() {
  const { imgUrl } = useContext(LogoUrl);
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
          <FiShoppingCart
            fontSize={"1.8rem"}
            className="hover:text-orange-600 cursor-pointer"
          />
          <HiOutlineUser
            fontSize={"1.8rem"}
            className="hover:text-orange-600 cursor-pointer"
          />
          <IoSettingsOutline
            fontSize={"1.8rem"}
            className="hover:text-orange-600 cursor-pointer"
          />
        </nav>
      </div>
    </header>
  );
}
export default Header;
