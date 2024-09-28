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
import { Link } from "react-router-dom";
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

// FEATURED PRODUCTS COMPONENT
function FeaturedProds() {
  // CONTEXTS
  const { theme } = useContext(ThemeContext);
  const { isProductExist } = useContext(CartContext);
  // STATES
  const [Id, setId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);
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
    console.log(productInfo);
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
    <section
      className="text-gray-600 body-font"
      style={{
        color: `${theme == "light" ? "#4b5563" : "white"}`,
        backgroundColor: `${theme == "light" ? "white" : "black"}`,
      }}
    >
      <AppModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        productInfo={productInfo}
      />
      <div className="container featuredProdsContainer relative px-5 pt-16 mx-auto">
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
                    className="FeaturedProdsCard cursor-grab "
                  >
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
                            color: `${theme == "light" ? "#4b5563" : "white"}`,
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
                              color: `${theme == "light" ? "black" : "orange"}`,
                            }}
                            className="text-2xl"
                          />
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                  {/* </Link> */}
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        {/* VIEW ALL PRODUCTS */}
        <Link to={"/ProductListing"}>
          <Button
            variant={`${theme == "black" ? "outlined" : "contained"}`}
            style={{
              backgroundColor: `${theme == "black" ? "" : "black"}`,
              color: `${theme == "black" ? "white" : ""}`,
              border: `${theme == "black" ? "2px solid white" : ""}`,
            }}
            className="viewAllProductsBtn"
          >
            View All Products
          </Button>
        </Link>
      </div>
    </section>
  );
}
export default FeaturedProds;
