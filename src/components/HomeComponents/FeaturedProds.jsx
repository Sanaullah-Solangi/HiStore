// HOOKS
import { useContext, useEffect, useState } from "react";
// CONTEXT
import { ThemeContext } from "../../contexts/ThemeContext";
import { CartContext } from "../../contexts/CartContext";
// ICONS & OTHER COMPONENTS
import AppModal from "../GlobalComponents/AppModal";
import Loader from "../GlobalComponents/Loader";
import NotFound from "../GlobalComponents/NotFound";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import HeadingBorder from "../GlobalComponents/HeadingBorder";
// FEATURED PRODUCTS COMPONENT
function FeaturedProds() {
  // CONTEXTS
  const { theme, textColor, bgColor, mainColor } = useContext(ThemeContext);
  const { isProductExist } = useContext(CartContext);
  // STATES
  const [Id, setId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  // HOOKS
  useEffect(() => {
    setLoader(true);
    setNotFound(false);
    getProducts();
  }, []);

  useEffect(() => {
    setLoader(true);
    setNotFound(false);
    getProductInfo(Id);
  }, [Id]);
  const getProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        // console.log("res->", res);
        setProducts(res.products);
        setLoader(false);
        res.message ? setNotFound(true) : setNotFound(false);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
        setLoader(false);
      });
  };

  const getProductInfo = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res->", res);
        setProductInfo(res);
        setLoader(false);
        res.message ? setNotFound(true) : setNotFound(false);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
        setLoader(false);
      });
  };

  return loader ? (
    <Loader />
  ) : notFound ? (
    <NotFound />
  ) : (
    <section id="featured-products" className="text-gray-600 body-font">
      <AppModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        productInfo={productInfo}
      />
      <div className="container featured-prods-container relative px-5 pt-16 mx-auto">
        {/* MAIN HEADING */}
        <div className="text-center mb-10 flex justify-center items-center flex-col">
          <h1 className="main-heading Featured-prods-heading uppercase relative w-fitsm:text-5xl text-4xl font-medium text-center title-font text-gray-900 mb-7">
            Featured Products
            <HeadingBorder />
          </h1>
        </div>
        {/* FEATURED CARDS */}
        <div className="flex flex-wrap ">
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
              return (
                <SwiperSlide
                  key={data?.id}
                  className="lg:w-1/4 sm:w-1/2 w-full"
                >
                  {/* <Link to={`/ProductDetail/${data.id}`}> */}
                  <div
                    onClick={() => {
                      setId(data.id);
                      isModalOpen
                        ? setIsModalOpen(false)
                        : setIsModalOpen(true);
                    }}
                    className="featured-prods-card cursor-grab "
                  >
                    <img
                      alt="content"
                      className="featured-prods-img transition-all duration-100 ease-linear "
                      src={data?.images[0]}
                    />
                    {/* PRODUCT SHORT INFO */}
                    <div className="flex justify-between">
                      <div>
                        <p
                          className="featured-prods-item-heading leading-relaxed text-gray-600 font-medium uppercase "
                          style={{
                            color: `${textColor}`,
                          }}
                        >
                          {data.title}
                        </p>
                        <span
                          className="featured-prods-warranty capitalize title-font text-black  mt-6 mb-1"
                          style={{
                            color: `${theme == "light" ? "black" : "white"}`,
                          }}
                        >
                          {data.warrantyInformation}
                        </span>
                        <br />
                        <span
                          className="prod-rate"
                          style={{ color: `${mainColor}` }}
                        >
                          ${data.price}
                        </span>
                      </div>
                      {/* ICON TO INDICATE THIS ITEM IS CARTED */}
                      {isProductExist(data.id) ? (
                        <ShoppingCartOutlined
                          style={{
                            color: `${theme == "light" ? "black" : "orange"}`,
                          }}
                          className="text-4xl"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {/* </Link> */}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* VIEW ALL PRODUCTS */}
        <Button
          variant={`${theme == "black" ? "outlined" : "contained"}`}
          className="view-all-products-btn"
          onClick={() => navigate("/productlisting/all")}
        >
          View All Products
        </Button>
      </div>
      <style jsx global>{`
        #fetured-products {
          color: ${textColor};
          background: ${bgColor};
        }

        .main-heading {
          color: ${theme == "light" ? "#4b5563" : "white"};
        }

        .swiper-slide {
          min-height: fit-content !important;
          height: 43rem;
        }
        .featured-prods-card {
          height: 100% !important;
        }

        .featured-prods-item-heading {
          font-size: 1.8rem;
          font-family: "poppins", sans-serif;
        }
        .featured-prods-card > .featured-prods-img {
          background-color: rgb(245, 245, 245);
          width: 100% !important;
          height: 70% !important;
          object-fit: contain;
        }

        .prod-rate {
          font-size: 2rem;
        }
        .featured-prods-warranty {
          font-size: 1.6rem;
        }
        .swiper-button-next,
        .swiper-button-prev {
          top: 30% !important;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          color: ${mainColor};
        }
        .view-all-products-btn {
          font-size: 1.4rem;
          background-color: ${theme == "black" ? "" : mainColor};
          color: ${theme == "black" ? "white" : ""};
          border: ${theme == "black" ? "1px solid white" : ""};
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </section>
  );
}
export default FeaturedProds;
