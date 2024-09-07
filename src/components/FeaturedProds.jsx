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
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FeaturedProds() {
  const [productsObj, setProducts] = useState({});
  const { products } = productsObj;
  console.log(products);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    console.log("men chala");
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        console.log("res->", res);
        setProducts(res);
      });
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        {/* MAIN HEADING */}
        <div className="text-center mb-10 flex justify-center items-center flex-col">
          <h1 className="mainHeading FeaturedProdsHeading uppercase relative w-fit sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-7">
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
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            {products?.map((data) => {
              console.log(data);
              return (
                <SwiperSlide
                  key={data?.id}
                  className=" p-4 lg:w-1/4 sm:w-1/2 w-full"
                >
                  <Link to={`/ProductDetail/${data.id}`}>
                    <div className="FeaturedProdsCard cursor-grab ">
                      <div className="FeaturedProdsImgCover mb-2 rounded-lg h-80 overflow-hidden">
                        <img
                          alt="content"
                          className="object-contain object-center h-full w-full transition-all duration-100 ease-linear "
                          src={data?.images[0]}
                        />
                      </div>
                      <p className="featuredProdsItemHeading leading-relaxed text-gray-600 font-medium uppercase  ">
                        {data.title}
                      </p>
                      <span className="FeaturedProdsWarranty capitalize title-font text-black  mt-6 mb-1">
                        {data.warrantyInformation}
                      </span>
                      <br />
                      <span className="text-orange-500">${data.price}</span>
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}

            {/* 1ST */}
            {/* <SwiperSlide className="p-4 lg:w-1/4 sm:w-1/2 w-full">
              <div className="FeaturedProdsCard cursor-grab ">
                <div className="FeaturedProdsImgCover rounded-lg h-80 overflow-hidden">
                  <img
                    alt="content"
                    className="object-contain object-center h-full w-full transition-all duration-100 ease-linear "
                    src="http://ps.magentech.com/themes/sp_histore/c/113-category_default/skirts-dresses.jpg"
                  />
                </div>
                <span className="FeaturedProdsShopAddress uppercase title-font text-gray-500 text-xs mt-6 mb-1">
                  Shop , Fashion , Men Fashion
                </span>
                <p className="featuredProdsItemHeading leading-relaxed text-gray-600 font-medium uppercase  ">
                  Blanca lorem reiciendis voluibus
                </p>
                <span className="text-orange-500">$125.12</span>
              </div>
            </SwiperSlide> */}
            {/* 2ND */}
            {/* <SwiperSlide className="p-4 lg:w-1/4 sm:w-1/2 w-full">
              <div className="FeaturedProdsCard cursor-grab ">
                <div className="FeaturedProdsImgCover rounded-lg h-80 overflow-hidden">
                  <img
                    alt="content"
                    className="object-contain object-center h-full w-full transition-all duration-100 ease-linear "
                    src="http://ps.magentech.com/themes/sp_histore/c/139-category_default/trousers-jeans.jpg"
                  />
                </div>
                <h2 className="FeaturedProdsSubHeading uppercase title-font text-center font-medium text-gray-900 mt-6 mb-1">
                  Trousers & Jeans
                </h2>
                <p className="leading-relaxed text-base text-center">
                  9 Products
                </p>
              </div>
            </SwiperSlide> */}
            {/* 3RD */}
            {/* <SwiperSlide className="p-4 lg:w-1/4 sm:w-1/2 w-full">
              <div className="FeaturedProdsCard cursor-grab ">
                <div className="FeaturedProdsImgCover rounded-lg h-80 overflow-hidden">
                  <img
                    alt="content"
                    className="object-contain object-center h-full w-full transition-all duration-100 ease-linear "
                    src="http://ps.magentech.com/themes/sp_histore/c/140-category_default/bag-backpacks.jpg"
                  />
                </div>
                <h2 className="FeaturedProdsSubHeading uppercase title-font text-center font-medium text-gray-900 mt-6 mb-1">
                  Bag & Backpacks
                </h2>
                <p className="leading-relaxed text-base text-center">
                  9 Products
                </p>
              </div>
            </SwiperSlide> */}
            {/* 4RTH */}
            {/* <SwiperSlide className="p-4 lg:w-1/4 sm:w-1/2 w-full">
              <div className="FeaturedProdsCard  cursor-grab ">
                <div className="FeaturedProdsImgCover rounded-lg h-80 overflow-hidden">
                  <img
                    alt="content"
                    className="object-contain object-center h-full w-full transition-all duration-100 ease-linear "
                    src="http://ps.magentech.com/themes/sp_histore/c/141-category_default/shoes-sandals.jpg"
                  />
                </div>
                <h2 className="FeaturedProdsSubHeading uppercase title-font text-center font-medium text-gray-900 mt-6 mb-1">
                  Shoes & Sandals
                </h2>
                <p className="leading-relaxed text-base text-center">
                  9 Products
                </p>
              </div>
            </SwiperSlide> */}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
export default FeaturedProds;
