import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { FaDollarSign } from "react-icons/fa";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import EmptyData from "./EmptyData";
import { Button } from "antd";
import { IoBagCheckOutline } from "react-icons/io5";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";
import {
  DeleteFilled,
  DollarOutlined,
  ProductOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
} from "@ant-design/icons";

function CartItems() {
  const { isUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const {
    cartItems,
    addItemToCart,
    removeItemFromCartList,
    decreaseItemQuantity,
  } = useContext(CartContext);
  // CALCULATING TOTAL AMOUNT OF CART ITEMS
  const totalAmount = cartItems.reduce(
    (total, product) => Math.round(total + product.price * product.quantity),
    0
  );
  // CALCULATING QUANTITY OF ITEMS
  const totalQuantity = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  // CART ITEM CARD
  return cartItems.length != 0 ? (
    <section
      style={{
        color: `${theme == "light" ? "#4b5563" : "white"}`,
        backgroundColor: `${theme == "light" ? "white" : "black"}`,
      }}
      className="text-gray-600 body-font "
    >
      <div className="container relative pb-24 mx-auto overflow-hidden ">
        {/* === CONTENT SECTION === */}
        <div className="py-6 ">
          {cartItems.map((item, ind) => {
            return (
              <div
                style={{
                  border: `${
                    theme == "black" ? "2px solid rgba(255,255,255,0.4)" : ""
                  }`,
                }}
                key={item.id}
                className=" flex  cartItemCard rounded-md relative mb-5"
              >
                {/* DELETE BTN */}
                <DeleteFilled
                  onClick={() => {
                    isUser
                      ? removeItemFromCartList(item.id)
                      : navigate("/auth/LogInPage");
                  }}
                  className="removeCardIcon absolute p-2 right-0  top-0 hover:text-white text-gray-200  hover:bg-red-700 bg-red-500 cursor-pointer  transition-all duration-100 ease-linear"
                />
                {/* ITEM IMAGE */}
                <img
                  className="bg-gray-100 cartImg object-contain"
                  src={
                    Array.isArray(item.images) ? item.images[0] : item.images
                  }
                  alt="content"
                />
                {/* ===== CARD CONTENT ===== */}
                <div className="p-4  rounded-lg h-70 ">
                  {/* BRAND */}
                  <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                    {item.brand}
                  </h3>
                  {/* TITLE */}
                  <h2
                    style={{ color: `${theme == "black" ? "white" : "black"}` }}
                    className="text-lg text-gray-900 font-medium title-font mb-4"
                  >
                    {item.title}
                  </h2>
                  {/* DESCRIPTION */}
                  <p className="leading-relaxed text-base">
                    {item.description}
                  </p>

                  {/* AMOUNT & QUANTITY */}
                  <div className="flex  items-center flex-wrap">
                    <p className="leading-relaxed flex items-center gap-2 font-bold text-2xl"></p>
                    <p className="leading-relaxed flex items-center gap-2 font-bold text-2xl ">
                      <span className="flex gap-2">
                        <DollarOutlined />
                        {Math.round(item.price)}
                      </span>
                      <CloseOutlined />
                      <span className="flex">
                        {/* <ProductOutlined /> */}
                        {item.quantity}
                      </span>
                      <RiArrowRightDoubleLine />
                      <span>{Math.round(item.price * item.quantity)}</span>
                    </p>
                  </div>

                  {/*==== INCREASE & DECREASE BTNS ====*/}
                  <div className="flex justify-start items-center gap-4 flex-wrap mt-3">
                    {/* INCREASE BTN */}
                    <Button
                      title="Increase Item quantity"
                      onClick={() => {
                        isUser
                          ? addItemToCart(item)
                          : navigate("/auth/LogInPage");
                      }}
                      className="quantityBtn bg-blue-400 text-white py-4"
                      style={{
                        fontSize: "22px",
                        color: `${theme == "black" ? "white" : "white"}`,
                      }}
                    >
                      <PlusOutlined />
                    </Button>
                    {/* DECREASE BTN */}
                    <Button
                      title="Decrease Item quantity"
                      disabled={item.quantity > 1 ? false : true}
                      onClick={() => {
                        isUser
                          ? decreaseItemQuantity(item.id)
                          : navigate("/auth/LogInPage");
                      }}
                      className="quantityBtn bg-red-400  text-white py-4"
                      style={{
                        fontSize: "22px",
                        color: `${theme == "black" ? "white" : "white"}`,
                      }}
                    >
                      <MinusOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* === ORDER SUMMARY === */}
        <div
          style={{
            color: `${theme == "light" ? "#4b5563" : "white"}`,
            backgroundColor: `${theme == "light" ? "white" : "black"}`,
            border: "none !important",
          }}
          className="orderSummary fixed bottom-0 right-0  border border-y-2 w-screen  flex flex-wrap   md:flex-row items-center justify-between"
        >
          {/* SUMMARY OF AMOUNT & QUANTITY */}
          <div className="amountAndQuantity flex items-center">
            {/* TOTAL AMOUNT */}
            <div className="flex items-center flex-wrap text-xl">
              <span
                style={{ fontSize: "22px" }}
                className="totalAmount flex items-center bg-green-600 px-10 text-white"
              >
                <FaDollarSign /> Final Amount
                <span className="ml-5 font-bold flex items-center">
                  {totalAmount}
                </span>
              </span>
            </div>
            {/* TOTAL QUANTITY */}
            <div className="flex items-center flex-wrap text-xl">
              <span
                style={{ fontSize: "22px" }}
                className="totalQuantity flex items-center bg-blue-600 px-10 text-white"
              >
                <ProductOutlined className="mr-2" /> Total Quantity
                <span className="ml-5 font-bold flex items-center">
                  {totalQuantity}
                </span>
              </span>
            </div>
          </div>
          {/* BUTTON TO PROCESS NEXT */}
          <button
            style={{ fontSize: "22px" }}
            className="flex items-center bg-red-500  border-0 px-6 focus:outline-none capitalize text-white  hover:bg-red-800  text-base "
          >
            <IoBagCheckOutline />
          </button>
        </div>
      </div>
    </section>
  ) : (
    <EmptyData />
  );
}
export default CartItems;
