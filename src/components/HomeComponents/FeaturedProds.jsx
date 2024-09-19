import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../contexts/CartContext";

function FeaturedProds() {
  const { theme } = useContext(ThemeContext);
  const { isProductExist } = useContext(CartContext);
  const [productsObj, setProducts] = useState({});
  const { products } = productsObj;
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        // console.log("res->", res);
        setProducts(res);
      });
  };

  return (
    <section
      className="text-gray-600 body-font"
      style={{
        color: `${theme == "light" ? "#4b5563" : "white"}`,
        backgroundColor: `${theme == "light" ? "white" : "black"}`,
      }}
    >
      <div className="container px-5 py-16 mx-auto">
        {/* MAIN HEADING */}
        <div className="text-center mb-10 flex justify-center items-center flex-col">
          <h1
            className="mainHeading FeaturedProdsHeading uppercase relative w-fit sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-7"
            style={{
              color: `${theme == "light" ? "#4b5563" : "white"}`,
            }}
          >
            Featured Products
          </h1>
        </div>
        {/* FEATURED CARDS */}
        <div className="flex flex-wrap -m-4">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={1}
            slidesPerView={4}
            navigation
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            // pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            {products?.map((data) => {
              // console.log(data);
              return (
                <SwiperSlide
                  key={data?.id}
                  className="lg:w-1/4 sm:w-1/2 w-full"
                >
                  <Link to={`/ProductDetail/${data.id}`}>
                    <div className="FeaturedProdsCard cursor-grab ">
                      <div className="FeaturedProdsImgCover mb-2 rounded-lg h-96 overflow-hidden">
                        <img
                          alt="content"
                          className="object-contain object-center h-full w-full transition-all duration-100 ease-linear "
                          src={data?.images[0]}
                        />
                      </div>
                      <div className="flex justify-between">
                        {/* PRODUCT SHORT INFO */}
                        <div>
                          <p
                            className="featuredProdsItemHeading leading-relaxed text-gray-600 font-medium uppercase "
                            style={{
                              color: `${
                                theme == "light" ? "#4b5563" : "white"
                              }`,
                            }}
                          >
                            {data.title}
                          </p>
                          <span
                            className="FeaturedProdsWarranty capitalize title-font text-black  mt-6 mb-1"
                            style={{
                              color: `${theme == "light" ? "black" : "white"}`,
                            }}
                          >
                            {data.warrantyInformation}
                          </span>
                          <br />
                          <span className="text-orange-500">${data.price}</span>
                        </div>
                        {/* ICON TO INDICATE THIS ITEM IS CARTED */}
                        <div>
                          {isProductExist(data.id) ? (
                            <ShoppingCartOutlined
                              style={{
                                color: `${
                                  theme == "light" ? "black" : "orange"
                                }`,
                              }}
                              className="text-2xl"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
export default FeaturedProds;
