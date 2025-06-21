// HOOKS
import { useContext, useState } from "react";
// IMPORTING CONTEXTS
import { ThemeContext } from "../../../../../contexts/ThemeContext";
import { CartContext } from "../../../../../contexts/CartContext";
import { UserContext } from "../../../../../contexts/UserContext";
// ICONS & OTHER COMPONENTS
import { Modal, Image } from "antd";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

const AppModal = ({ isModalOpen, setIsModalOpen, productInfo }) => {
  // CONTEXT
  const { isUser } = useContext(UserContext);
  const { addItemToCart, isProductExist } = useContext(CartContext);
  const { theme, bgColor, textColor, mainColor } = useContext(ThemeContext);
  const [isHover, setIsHover] = useState(true);
  const [helper, setHelper] = useState(0);
  const userCart = localStorage.getItem("userCart");
  // FUNCTIONS & OTHERS
  const navigate = useNavigate();
  // DESTRUCTING OBJECT
  const {
    brand,
    category,
    description,
    images,
    price,
    rating,
    stock,
    title,
    minimumOrderQuantity,
    id,
  } = productInfo;
  const onCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className="AppModal"
        open={isModalOpen}
        onCancel={onCancel}
        footer={false}
        closeIcon={<CloseOutlined className="close-icon" />}
      >
        <div className="modal-wrapper mx-auto py-8 px-5">
          <div className=" mx-auto flex flex-wrap prodDetailCover  rounded-xl">
            {/*=== PRODUCT IMAGE ===*/}
            <div className="prodDetailImg lg:w-1/2 lg:h-auto  rounded">
              <Image
                alt="ecommerce"
                width={"100%"}
                height={"100%"}
                style={{ objectFit: "contain" }}
                src={Array.isArray(images) ? images[0] : images}
              />
            </div>

            <div className="lg:w-1/2 w-full lg:pl-8 lg:py-6 mt-6 lg:mt-0">
              {/*=== BRAND NAME ===*/}
              <h2 className="modal-brand text-sm title-font text-indigo-500 tracking-widest">
                {brand ? brand : "Not Mentioned"}
              </h2>
              {/*=== PRODUCT TITLE ===*/}
              <h1 className="modal-title text-gray-900 text-3xl  title-font font-medium mt-2 mb-6">
                {title}
              </h1>
              {/*=== PRODUCT PRICE ===*/}
              <span className="modal-price title-font font-medium flex text-2xl text-gray-900 mb-6">
                $ {price}
              </span>

              {/*=== PRODUCT DESCRPTION ===*/}
              <p className="modal-desc leading-relaxed">{description}.</p>
              {/*=== STOCK , MINIMUM ORDER QUANTITY ===*/}
              <div className="flex mt-6 justify-between items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/*=== STOCK ===*/}
                <div className="modal-stock flex items-center justify-center ">
                  <span className="mr-3 font-medium uppercase text-lg text-orange-500">
                    Stock
                  </span>
                  <span>{stock ? stock : "Not Mentioned"}</span>
                </div>
                {/*=== ORDER QUANTITY ===*/}
                <div className="modal-quantity flex ml-6 items-center">
                  <span className="mr-3 capitalize text-lg">
                    minimum Order Quantity -
                  </span>
                  <span>{minimumOrderQuantity}</span>
                </div>
              </div>
              {/*=== ADD TO CART BUTTON ===*/}
              <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
                {/* ADD TO CART BTN */}
                <button
                  onClick={() => {
                    isUser?.isLogIn
                      ? addItemToCart({
                          ...productInfo,
                          quantity: 1,
                          orderedBy: userCart,
                          deliveryStatus: "pending",
                          deliveryDetails: {},
                        })
                      : navigate("/auth/login");
                  }}
                  className="flex justify-center items-center gap-4   text-white bg-gray-800 border-0 py-3 w-72 focus:outline-none rounded"
                  style={{ backgroundColor: `${isHover ? mainColor : ""}` }}
                  onMouseOver={() => {
                    setIsHover(true);
                    setHelper(1);
                  }}
                  onMouseLeave={() => {
                    setIsHover(false);
                    setHelper(0);
                  }}
                >
                  {isProductExist(id) ? (
                    "Increase Quantity"
                  ) : (
                    <>
                      Add To Cart
                      <FiShoppingCart size={22} />
                    </>
                  )}
                </button>
                {/* CART COUNT */}
                <button
                  style={{
                    backgroundColor: `${
                      isProductExist(productInfo.id) ? `${mainColor}` : ""
                    }`,
                    color: `${isProductExist(productInfo.id) ? "white" : ""}`,
                  }}
                  className="flex items-center justify-center bg-transparent border border-gray-500 py-2 px-6 focus:outline-none text-md font-medium   rounded"
                >
                  {isProductExist(productInfo.id)
                    ? isProductExist(productInfo.id).quantity
                    : 0}
                </button>
                {/* LIKE BTN */}
                <button className="like-btn rounded-full w-10 h-10 bg-gray-500 p-0 border-0 inline-flex items-center justify-center ml-4">
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
              {/*=== RATING OR REVIES ===*/}
              <div className="rating-revies flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                {/* RATING */}
                <div className="flex mb-4">
                  {/* STARS */}
                  <span className=" flex items-center">
                    {/* 1ST */}
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      className="star text-indigo-500"
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
                      className="star text-indigo-500"
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
                      className="star text-indigo-500"
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
                      className="star text-indigo-500"
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
                      className="star text-indigo-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-gray-600 ml-3 rating">{rating}</span>
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
                        className="social-icon"
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
                        className="social-icon"
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
                        className="social-icon"
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
      </Modal>
      <style>{`
        .ant-modal-close {
          top: 1% !important;
          right: 0.1% !important;
        }

        .ant-modal-close:hover .anticon-close {
          color: red !important;
        }
        .anticon-close {
          font-size: 2rem;
          color: ${textColor};
          font-weight: 900;
        }
        .ant-modal-wrap {
          overflow: hidden !important;
        }
        .modal-wrapper,
        .modal-title,
        .modal-price,
        .modal-desc,
        .modal-stock,
        .modal-quantity {
          color: ${textColor};
        }
        .modal-wrapper {
          background: ${bgColor};
          padding-right: 3rem;
        }
        .modal-brand {
          font-size: 1.4rem;
        }

        .modal-title {
          font-size: 2.5rem;
        }

        .modal-price {
          font-size: 1.6rem;
        }

        .modal-desc {
          font-size: 1.6rem;
          text-align: justify;
        }
        .modal-stock span,
        .modal-quantity span {
          font-size: 1.7rem;
        }

        like-btn {
          background: ${mainColor};
          color: white;
        }

        .star {
          width: 2rem;
          height: 2rem;
        }
        .rating {
          font-size: 1.7rem;
        }
        .social-icon {
          width: 3rem;
          height: 3rem;
        }

        .ant-modal-body {
          margin-top: -6rem;
        }
        @media (width < 1025px) {
          .ant-modal-wrap {
            overflow: auto !important;
          }

          .ant-modal-wrap::-webkit-scrollbar {
            display: none;
          }
        }
      `}</style>
    </>
  );
};
export default AppModal;
