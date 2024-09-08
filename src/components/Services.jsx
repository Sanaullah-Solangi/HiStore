import { useContext } from "react";
import { FaTruck } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";
import { ThemeContext } from "../assets/contexts/ThemeContext";
function Services() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <section
      style={{
        color: `${theme == "light" ? "#4b5563" : "white"}`,
        backgroundColor: `${theme == "light" ? "white" : "black"}`,
      }}
      className="text-gray-600 body-font"
    >
      <div className="container px-5 py-24 mx-auto">
        {/* MAIN CONTAINER */}
        <div className="servicesContainer flex flex-wrap gap-4 sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          {/* 1ST SERVICE */}
          <div className="servicesCard cursor-pointer transition-all ease-linear duration-200 border border-gray-400 px-4 py-6  flex flex-col text-center items-center">
            <div className="serviceIconCover transition-all ease-linear duration-200 w-20 h-20 inline-flex items-center justify-center rounded-full border border-gray-400 text-gray-800 mb-5 flex-shrink-0">
              <FaTruck
                style={{
                  color: `${theme == "light" ? "#4b5563" : "white"}`,
                }}
                className="serviceIcon"
                fontSize={"1.5rem"}
              />
            </div>
            <div className="flex-grow">
              <h2
                style={{
                  color: `${theme == "light" ? "#4b5563" : "white"}`,
                }}
                className="serviceHeading text-gray-900 title-font font-medium
              mb-0"
              >
                FAST & FREE SHIPPING
              </h2>
              <p className="leading-relaxed text-base">
                Fast & Free Shipping on orders over $99.00
              </p>
            </div>
          </div>
          {/* 2ND SERVICE */}
          <div className="servicesCard cursor-pointer transition-all ease-linear duration-200 border border-gray-400 px-4 py-6  flex flex-col text-center items-center">
            <div className="serviceIconCover transition-all ease-linear duration-200  w-20 h-20 inline-flex items-center justify-center rounded-full border border-gray-400 text-gray-800 mb-5 flex-shrink-0">
              <FaDollarSign
                style={{
                  color: `${theme == "light" ? "#4b5563" : "white"}`,
                }}
                className="serviceIcon"
                fontSize={"1.5rem"}
              />
            </div>
            <div className="flex-grow">
              <h2
                style={{
                  color: `${theme == "light" ? "#4b5563" : "white"}`,
                }}
                className="serviceHeading text-gray-900 title-font font-medium mb-0"
              >
                MONEY GUARANTEE
              </h2>
              <p className="leading-relaxed text-base">
                Lorem ipsum 30 days money back guarantee
              </p>
            </div>
          </div>
          {/* 3RD SERVICE */}
          <div className="servicesCard cursor-pointer transition-all ease-linear duration-200 border border-gray-400 px-4 py-6  flex flex-col text-center items-center">
            <div className="serviceIconCover transition-all ease-linear duration-200 w-20 h-20 inline-flex items-center justify-center rounded-full border border-gray-400 text-gray-800 mb-5 flex-shrink-0">
              <IoFootball
                style={{
                  color: `${theme == "light" ? "#4b5563" : "white"}`,
                }}
                className="serviceIcon"
                fontSize={"1.5rem"}
              />
            </div>
            <div className="flex-grow">
              <h2
                style={{
                  color: `${theme == "light" ? "#4b5563" : "white"}`,
                }}
                className="serviceHeading text-gray-900 title-font font-medium mb-0"
              >
                ONLINE SUPPORT
              </h2>
              <p className="leading-relaxed text-base">
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
