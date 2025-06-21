// SWIPER
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
// CONTEXTS
import { useContext } from "react";
import { CartContext } from "../../../../../contexts/CartContext";
// ICONS
import { ShoppingCartOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../../../../contexts/ThemeContext";
function ProductCard({ products, setId, isModalOpen, setIsModalOpen }) {
  const { theme, textColor, mainColor } = useContext(ThemeContext);
  const { isProductExist } = useContext(CartContext);
  return (
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
            <SwiperSlide key={data?.id} className="lg:w-1/4 sm:w-1/2 w-full">
              {/* <Link to={`/ProductDetail/${data.id}`}> */}
              <div
                onClick={() => {
                  setId(data.id);
                  isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
                  // navigate(`product-details/${data?.id}`);
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
                    <p className="featured-prods-item-heading leading-relaxed text-gray-600 ">
                      {data.title}
                    </p>
                    <span className="featured-prods-warranty capitalize title-font text-black  mt-6 mb-1">
                      {data.warrantyInformation}
                    </span>
                    <br />
                    <span className="prod-rate">${data.price}</span>
                  </div>
                  {/* ICON TO INDICATE THIS ITEM IS CARTED */}
                  {isProductExist(data.id) ? (
                    <ShoppingCartOutlined className="shopping-cart-icon text-4xl" />
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
      <style>
        {`
        .featured-prods-card {
            height: 100% !important;
            border-radius: 5px;
            overflow: hidden;
        }

        .featured-prods-item-heading {
            font-size: 1.8rem;
            color: ${textColor};
        }
        .featured-prods-card > .featured-prods-img {
            background-color: rgb(245, 245, 245);
            width: 100% !important;
            height: 75% !important;
            object-fit: contain;
        }

        .prod-rate {
            font-size: 2rem;
            color: ${mainColor};
        }
        .featured-prods-warranty {
            font-size: 1.6rem;
            color: ${theme == "light" ? "black" : "white"};
        }
        .featured-prods-container
            .swiper
            :is(.swiper-button-next, .swiper-button-prev) {
            top: 30% !important;
        }
        .shopping-cart-icon {
            color: ${theme == "light" ? "black" : "orange"};
        }
       `}
      </style>
    </div>
  );
}

export default ProductCard;
