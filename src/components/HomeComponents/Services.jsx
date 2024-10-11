// HOOKS
import { useContext, useState } from "react";
// CONTEXTS
import { ThemeContext } from "../../contexts/ThemeContext";
// ICONS & COMPONENTS
import { FaTruck } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
function Services() {
  const { bgColor, color, mainColor } = useContext(ThemeContext);
  const [isHover, setIsHover] = useState(false);
  const [helper, setHelper] = useState(0);
  return (
    <section
      style={{
        color: `${color}`,
        backgroundColor: `${bgColor}`,
      }}
      className="text-gray-600 body-font"
    >
      <div className="container px-5 py-24 mx-auto">
        {/* MAIN CONTAINER */}
        <div className="servicesContainer grid grid-cols-none md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {/* 1ST SERVICE */}
          <div
            onMouseOver={(e) => {
              setIsHover(true);
              setHelper(1);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            style={{
              border: `1px solid  ${
                isHover && helper == 1 ? mainColor : " #4b5563"
              }`,
            }}
            className="servicesCard h-56  cursor-pointer transition-all ease-linear duration-150 w-full  rounded-md px-4 py-6  flex flex-col text-center items-center"
          >
            <div
              style={{
                border: `1px solid  ${
                  isHover && helper == 1 ? mainColor : " #9ca3af"
                }`,
                backgroundColor: `${isHover && helper == 1 ? mainColor : ""}`,
              }}
              className="serviceIconCover transition-all ease-linear duration-150 w-20 h-20 inline-flex items-center justify-center rounded-full text-gray-800 mb-5 flex-shrink-0"
            >
              <FaTruck
                style={{
                  color: `${color}`,
                }}
                className="serviceIcon"
                fontSize={"1.5rem"}
              />
            </div>
            <div className="flex-grow">
              <h2
                style={{
                  color: `${isHover && helper == 1 ? mainColor : color}`,
                }}
                className="serviceHeading transition-all duration-150 ease-linear text-gray-900 title-font font-medium
              mb-0"
              >
                FAST & FREE SHIPPING
              </h2>
              <p className="leading-relaxed text-base transition-all ease-linear duration-150">
                Fast & Free Shipping on orders over $99.00
              </p>
            </div>
          </div>
          {/* 2ND SERVICE */}
          <div
            onMouseOver={() => {
              setIsHover(true);
              setHelper(2);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            style={{
              border: `1px solid  ${
                isHover && helper == 2 ? mainColor : " #4b5563"
              }`,
            }}
            className="servicesCard h-56  cursor-pointer transition-all ease-linear duration-150 w-full  rounded-md px-4 py-6  flex flex-col text-center items-center"
          >
            <div
              style={{
                border: `1px solid  ${
                  isHover && helper == 2 ? mainColor : " #9ca3af"
                }`,
                backgroundColor: `${isHover && helper == 2 ? mainColor : ""}`,
              }}
              className="serviceIconCover transition-all ease-linear duration-150  w-20 h-20 inline-flex items-center justify-center rounded-full border border-gray-400 text-gray-800 mb-5 flex-shrink-0"
            >
              <FaDollarSign
                style={{
                  color: `${color}`,
                }}
                className="serviceIcon"
                fontSize={"1.5rem"}
              />
            </div>
            <div className="flex-grow">
              <h2
                style={{
                  color: `${isHover && helper == 2 ? mainColor : color}`,
                }}
                className="serviceHeading transition-all duration-150 ease-linear text-gray-900 title-font font-medium mb-0"
              >
                MONEY GUARANTEE
              </h2>
              <p className="leading-relaxed text-base transition-all ease-linear duration-150">
                Lorem ipsum 30 days money back guarantee
              </p>
            </div>
          </div>
          {/* 3RD SERVICE */}
          <div
            onMouseOver={() => {
              setIsHover(true);
              setHelper(3);
            }}
            onMouseLeave={() => {
              setIsHover(false);
              setHelper(0);
            }}
            style={{
              border: `1px solid  ${
                isHover && helper == 3 ? mainColor : " #4b5563"
              }`,
            }}
            className="servicesCard h-56  cursor-pointer transition-all ease-linear duration-150 w-full md:col-span-2 lg:col-span-1  rounded-md px-4 py-6  flex flex-col text-center items-center"
          >
            <div
              style={{
                border: `1px solid  ${
                  isHover && helper == 3 ? mainColor : " #9ca3af"
                }`,
                backgroundColor: `${isHover && helper == 3 ? mainColor : ""}`,
              }}
              className="serviceIconCover transition-all ease-linear duration-150 w-20 h-20 inline-flex items-center justify-center rounded-full border border-gray-400 text-gray-800 mb-5 flex-shrink-0"
            >
              <IoFootball
                style={{
                  color: `${color}`,
                }}
                className="serviceIcon"
                fontSize={"1.5rem"}
              />
            </div>
            <div className="flex-grow">
              <h2
                style={{
                  color: `${isHover && helper == 3 ? mainColor : color}`,
                }}
                className="serviceHeading transition-all duration-150 ease-linear title-font font-medium mb-0"
              >
                ONLINE SUPPORT
              </h2>
              <p className="leading-relaxed text-base transition-all ease-linear duration-150">
                We Support Online 24/7 for Customer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
