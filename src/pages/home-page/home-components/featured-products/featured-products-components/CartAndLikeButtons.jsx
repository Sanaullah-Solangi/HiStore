import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../../../contexts/UserContext";
import { CartContext } from "../../../../../contexts/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { ThemeContext } from "../../../../../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function CartAndLikeButtons({ productInfo }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { addItemToCart, isProductExist } = useContext(CartContext);
  const { mainColor } = useContext(ThemeContext);
  const userCart = localStorage.getItem("userCart");
  const navigateToLogin = () => {
    navigate("/auth/login");
    message.warning("🛒 Please log in to add items to your cart.");
  };
  return (
    <div className="flex justify-between items-center flex-wrap gap-4 mb-10">
      {/* ADD TO CART BTN */}
      <button
        onClick={() => {
          user
            ? addItemToCart({
                ...productInfo,
                quantity: 1,
                orderedBy: userCart,
                deliveryStatus: "pending",
                deliveryDetails: {},
              })
            : navigateToLogin();
        }}
        className="add-to-cart-btn flex justify-center items-center gap-4   text-white bg-gray-800 border-0 py-3 w-72 focus:outline-none rounded"
      >
        {isProductExist(productInfo.id) ? (
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
      <style>
        {`
         .add-to-cart-btn:hover{
          background-color:${mainColor};
        }
            `}
      </style>
    </div>
  );
}

export default CartAndLikeButtons;
