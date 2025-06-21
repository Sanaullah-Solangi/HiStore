// HOOKS
import { useContext, useState } from "react";
// CONTEXTS
import { ThemeContext } from "../../../contexts/ThemeContext";
// ICONS & COMPONENTS
import { FaTruck } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { IoFootball } from "react-icons/io5";

const myServices = [
  {
    icon: <FaTruck />,
    heading: "FAST & FREE SHIPPING",
    desc: "Fast & Free Shipping on orders over $99.00",
  },
  {
    icon: <FaDollarSign />,
    heading: "MONEY BACK GUARANTEE",
    desc: "Hassle-free returns with our 30-day money-back guarantee.",
  },
  {
    icon: <IoFootball />,
    heading: "ONLINE SUPPORT",
    desc: "We Support Online 24/7 for Customer",
  },
];
function Services() {
  const { bgColor, textColor, mainColor } = useContext(ThemeContext);
  return (
    <section id="services" className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        {/* MAIN CONTAINER */}
        <div className="services-container flex flex-wrap justify-center items-center gap-4 ">
          {myServices.map((service) => (
            <div 
            key={service.heading}
            className="services-card h-72  cursor-pointer transition-all ease-linear duration-150 w-full  rounded-md px-4 py-6  flex flex-col text-center items-center">
              <div className="service-icon-cover transition-all ease-linear duration-150 w-24 h-24 inline-flex items-center justify-center rounded-full text-gray-800 mb-5 flex-shrink-0">
                <span className="service-icon">{service.icon}</span>
              </div>
              <div className="flex-grow">
                <h2
                  className="service-heading transition-all duration-150 ease-linear text-gray-900 title-font font-bold
              mb-0"
                >
                  {service.heading}
                </h2>
                <p className="service-desc leading-relaxed text-base transition-all ease-linear duration-150">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        #services {
          color: ${textColor};
          background-color: ${bgColor};
        }
        .services-card {
          flex: 1 1 30rem !important;
        }
        .services-card,
        .service-icon-cover {
          border: 1px solid #4b5563;
        }

        .services-card:hover,
        .services-card:hover .service-icon-cover {
          border: 1px solid ${mainColor};
        }
        .services-card:hover .service-icon-cover {
          background: ${mainColor};
        }
        .service-icon,
        .service-heading {
          color: ${textColor};
        }
        .services-card:hover .service-icon-cover .service-icon {
          color: ${bgColor};
        }
        .service-heading {
          font-size: 1.8rem;
        }
        .service-icon {
          font-size: 3rem;
        }
        .services-card:hover .service-heading {
          color: ${mainColor};
        }
        .service-desc {
          font-size: 1.6rem;
        }
      `}</style>
    </section>
  );
}

export default Services;
