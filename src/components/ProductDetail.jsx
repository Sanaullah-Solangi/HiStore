import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
import NotFound from "./NotFound";
function ProductDetail() {
  const { id } = useParams();
  const [productInfo, setProductIfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    setLoader(true);
    setNotFound(false);
    getProductInfo();
  }, [id]);
  const getProductInfo = () => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        setProductIfo(res);

        setLoader(false);
        console.log("res->", res);
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
    <section className="text-gray-600 body-font overflow-hidden ">
      <div className="container px-5 py-24 mx-auto ">
        <div className="lg:w-4/5 mx-auto flex flex-wrap ">
          {/*================ PRODUCT IMAGE ================*/}
          <img
            alt="ecommerce"
            className="lg:w-1/2 w-full lg:h-auto h-64 object-contain object-center rounded"
            src={
              Array.isArray(productInfo.images)
                ? productInfo.images[0]
                : productInfo.images
            }
          />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {/*================ BRAND NAME ================*/}
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              {productInfo.brand}
            </h2>
            {/*================ PRODUCT TITLE ================*/}
            <h1 className="text-gray-900 text-3xl  title-font font-medium mt-2 mb-6">
              {productInfo.title}
            </h1>
            {/*================ PRODUCT PRICE ================*/}
            <span className="title-font font-medium flex text-2xl text-gray-900 mb-6">
              $ {productInfo.price}
            </span>

            {/*================ PRODUCT DESCRPTION ================*/}
            <p className="leading-relaxed">{productInfo.description}.</p>
            {/*================ STOCK , MINIMUM ORDER QUANTITY ================*/}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {/* STOCK */}
              <div className="flex items-center justify-center ">
                <span className="mr-3 font-medium uppercase text-lg text-orange-500">
                  Stock
                </span>
                <span>{productInfo.stock}</span>
              </div>
              {/* ORDER QUANTITY */}
              <div className="flex ml-6 items-center">
                <span className="mr-3 capitalize text-lg">
                  minimum Order Quantity -
                </span>
                <span>{productInfo.minimumOrderQuantity}</span>
              </div>
            </div>
            {/*================ BUTTONS WRRAPER ================*/}
            <div className="flex mb-10">
              {/* LEFT BTN */}
              <button className="flex items-center justify-center bg-transparent border border-gray-500 py-2 px-6 focus:outline-none  rounded">
                1
              </button>
              {/* ADD TO CART BTN */}
              <button className="flex ml-auto text-white bg-gray-800 border-0 py-2 px-16 focus:outline-none hover:bg-orange-600 rounded">
                ADD TO CART
              </button>
              {/* LIKE BTN */}
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                </svg>
              </button>
            </div>
            {/*================ RATING OR REVIES ================*/}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
              {/* RATING */}
              <div className="flex mb-4">
                {/* STARS */}
                <span className="flex items-center">
                  {/* 1ST */}
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {/* 2ND */}
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {/* 3RD */}
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {/* 4RTH */}
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  {/* 5TH */}
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-4 h-4 text-indigo-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-gray-600 ml-3">
                    {productInfo.rating}
                  </span>
                </span>
                {/* ICONS */}
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  {/* FACEBOOK */}
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  {/* TWITTER */}
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                    </svg>
                  </a>
                  {/* MESSENGER */}
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ProductDetail;
