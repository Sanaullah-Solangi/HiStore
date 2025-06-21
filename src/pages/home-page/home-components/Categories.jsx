import { useContext, useState } from "react";
import category1 from "../../../assets/images/category1.png";
import category2 from "../../../assets/images/category6.png";
import category3 from "../../../assets/images/category5.png";
import category4 from "../../../assets/images/category7.png";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { Link } from "react-router-dom";
import HeadingBorder from "../../../components/ui/HeadingBorder";
const categories = [
  {
    route: "/all-products/mens-shirts",
    src: category1,
    heading: "mens shirts",
    count: "9 Products",
  },
  {
    route: "/all-products/womens-dresses",
    src: category2,
    heading: "Womens Dresses",
    count: "9 Products",
  },
  {
    route: "/all-products/womens-jewellery",
    src: category3,
    heading: "Womens Jewellery",
    count: "9 Products",
  },
  {
    route: "/all-products/sports-accessories",
    src: category4,
    heading: "Sports Accesories",
    count: "9 Products",
  },
];
function Categories() {
  const { theme, textColor, bgColor, mainColor } = useContext(ThemeContext);
  return (
    <section id="categories" className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        {/* MAIN HEADING */}
        <div className="text-center mb-10 flex justify-center items-center flex-col">
          <h1 className="main-heading categories-heading capitalize relative w-fit sm:text-5xl text-4xl font-medium text-center title-font text-gray-900 mb-7">
            Shop by categories
            <HeadingBorder />
          </h1>
          <p className="categories-para capitalize text-[1.6rem] leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            Explore our wide range of categories to find exactly what you need —
            from fashion and electronics to home essentials and more.
          </p>
        </div>
        {/* CATEGORIES CARDS */}
        <div className="flex flex-wrap -m-4">
          {categories.map((category) => (
            <Link
              key={category.route}
              to={category.route}
              className="cursor-pointer p-4 lg:w-1/4 sm:w-1/2 w-full"
            >
              <div className="categories-card">
                <div className="categories-img-cover rounded-lg overflow-hidden">
                  <img
                    alt="content"
                    className="object-cover object-center h-full w-full transition-all duration-100 ease-linear "
                    src={category.src}
                  />
                </div>
                <h2 className="categories-sub-heading uppercase title-font text-center font-medium text-gray-900 mt-6 mb-1">
                  {category.heading}
                </h2>
                <p className="category-count leading-relaxed text-base text-center">
                  {category.count}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <style>{`
        #categories {
          color: ${textColor};
          background-color: ${bgColor};
        }
        .main-heading {
          color: ${theme == "light" ? "#4b5563" : "white"};
        }
        .categories-img-cover {
          height: 30rem;
        }
        .categories-sub-heading {
          color: ${textColor};
          font-size: 2rem;
        }
        .categories-card:hover > .categories-sub-heading {
          color: ${mainColor};
        }
        .category-count {
          font-size: 1.6rem;
        }
      `}</style>
    </section>
  );
}

export default Categories;
