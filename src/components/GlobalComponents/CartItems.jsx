// REACT HOOKS
import { useContext } from "react";
// CONTXTS
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
// COMPONENTS
import EmptyData from "./EmptyData";
// ICONS & OTHERS
import { FaDollarSign } from "react-icons/fa";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Button } from "antd";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteFilled,
  DollarOutlined,
  ProductOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import LoginToViewCart from "./LoginToViewCart";
Link;
// CART COMPONENT STARTS
function CartItems() {
  const { isUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { theme, color, bgColor, mainColor } = useContext(ThemeContext);
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
        color: `${color}`,
        backgroundColor: `${bgColor}`,
      }}
      className="text-gray-600 body-font "
    >
      <div className="container relative grid grid-cols-5 gap-4 pb-24 mx-auto overflow-hidden ">
        {/* === CONTENT SECTION === */}
        <div className="py-6 col-span-5 md:col-span-3 ">
          {isUser?.isLogIn ? (
            cartItems.map((item, ind) => {
              if (item.orderedBy == isUser.userCart) {
                return (
                  <div
                    style={{
                      border: `${
                        theme == "black"
                          ? "2px solid rgba(255,255,255,0.4)"
                          : ""
                      }`,
                    }}
                    key={item.id}
                    className=" flex  cartItemCard rounded-md relative mb-5"
                  >
                    {/* DELETE BTN */}
                    <DeleteFilled
                      onClick={() => {
                        isUser.isLogIn
                          ? removeItemFromCartList(item.id)
                          : navigate("/auth/login");
                      }}
                      className="removeCardIcon absolute p-2 right-0  top-0 hover:text-white text-gray-200  hover:bg-red-700 bg-red-500 cursor-pointer  transition-all duration-100 ease-linear"
                    />
                    {/* ITEM IMAGE */}
                    <img
                      className="bg-gray-100 cartImg object-contain"
                      src={
                        Array.isArray(item.images)
                          ? item.images[0]
                          : item.images
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
                        style={{
                          color: `${theme == "black" ? "white" : "black"}`,
                        }}
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
                            isUser.isLogIn
                              ? addItemToCart(item)
                              : navigate("/auth/login");
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
                            isUser.isLogIn
                              ? decreaseItemQuantity(item.id)
                              : navigate("/auth/login");
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
              }
            })
          ) : (
            <LoginToViewCart />
          )}
        </div>
        {/* === ORDER SUMMARY === */}
        <div
          style={{
            color: `${color}`,
            backgroundColor: `${bgColor}`,
            border: "none !important",
          }}
          className="orderSummary col-span-5  md:col-span-2 py-5   "
        >
          <h1 className="px-5  font-bold  text-2xl">Order Summary</h1>
          {/* SUMMARY OF AMOUNT & QUANTITY */}
          <div className="amountAndQuantity p-5 flex flex-col gap-3">
            {/* TOTAL AMOUNT */}
            <div className="flex items-center flex-wrap text-xl pb-2 mb-3 border-b border-gray-400">
              <span
                style={{ fontSize: "22px" }}
                className="totalAmount flex items-center justify-between w-full"
              >
                <div>
                  <DollarOutlined /> Amount
                </div>
                <span className="flex items-center">{totalAmount}</span>
              </span>
            </div>
            {/* TOTAL Tax */}
            <div className="flex items-center flex-wrap text-xl pb-2 mb-3 border-b border-gray-400">
              <span
                style={{ fontSize: "22px" }}
                className="totalQuantity flex items-center justify-between w-full"
              >
                <div>
                  <DollarOutlined /> Total Tax
                </div>
                <span className="ml-5 font-bold flex items-center">0.00</span>
              </span>
            </div>
            {/* TOTAL QUANTITY */}
            <div className="flex items-center flex-wrap text-xl pb-2 mb-3 border-b border-gray-400">
              <span
                style={{ fontSize: "22px" }}
                className="totalQuantity flex items-center justify-between w-full"
              >
                <div>
                  <ProductOutlined /> Total Quantity
                </div>
                <span className="ml-5 font-bold flex items-center">
                  {totalQuantity}
                </span>
              </span>
            </div>

            {/* BUTTON TO PROCESS NEXT */}
            <Link to={"/checkout"} className="w-full">
              <button
                style={{ fontSize: "22px", backgroundColor: `${mainColor}` }}
                className="flex items-center justify-center gap-2 text-white p-4 rounded  border-0 px-6 focus:outline-none uppercase text-base w-full"
              >
                <IoBagCheckOutline /> Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <EmptyData />
  );
}
export default CartItems;
