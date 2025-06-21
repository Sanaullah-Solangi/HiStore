import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import elips from "../../assets/images/Ellipse.png";

function FormContainer({
  variant,
  mainImg,
  altOfImg,
  heading,
  paragraph,
  children,
}) {
  const { bgColor, color } = useContext(ThemeContext);

  return (
    <div
      style={{ backgroundColor: `${bgColor}` }}
      className="form-main-container relative h-screen  gap-5 md:gap-0 pt-10 md:pt-0 overflow-hidden"
    >
      {/*  Decorative background element for visual enhancement */}
      <img
        src={elips}
        alt="elips"
        className={`absolute ${
          variant == "signup" ? "left-0 -top-[3%]" : "right-0 top-0"
        }`}
      />
      {/* Main illustration image container for the auth page */}
      <div
        className={`flex justify-center items-center h-full w-full ${
          variant === "signup" ? "md:order-2 order-1" : "md:order-1 order-2"
        }`}
      >
        <img
          src={mainImg}
          alt={altOfImg}
          className={`main-image ${
            variant == "signup"
              ? "md:w-[45%] w-[55%] h-auto top-[50%]  rotate-[30deg] -translate-y-[50%]"
              : "md:w-[50%] w-[70%] h-[90%] md:h-auto top-0  -rotate-[30deg]"
          }  -rotate-[30deg] absolute z-0`}
        />
      </div>
      {/* Main content section: heading, description, and form */}
      <div
        className={`flex flex-col justify-center items-center h-full w-full px-10  z-10 ${
          variant === "signup"
            ? "md:ml-20 md:w-[90%] md:order-1 order-2"
            : "md:order-2 order-1"
        }`}
      >
        <h1
          style={{ color: `${color}` }}
          className="w-full text-left font-bold text-6xl"
        >
          {heading}
        </h1>
        <p
          style={{ color: `${color}` }}
          className="w-full text-left text-2xl my-5"
        >
          {paragraph}
        </p>
        {/* Form */}
        {children}
      </div>
      <style>
        {`
           .form-main-container {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
            }
            @media (width <= 850px) {
             .form-main-container {
               grid-template-columns: repeat(1, 1fr);
              }
            .main-image {
              opacity: 0.4;
            }
}
        `}
      </style>
    </div>
  );
}

export default FormContainer;
