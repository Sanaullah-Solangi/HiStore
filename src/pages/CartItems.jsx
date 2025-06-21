// REACT HOOKS
import { useContext } from "react";
// CONTXTS
import { CartContext } from "../contexts/CartContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
// COMPONENTS
// ICONS & OTHERS
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { Button } from "antd";
import { IoBagCheckOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import {
  DeleteFilled,
  DollarOutlined,
  PlusOutlined,
  MinusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import StatusMessage from "../components/ui/StatusMessage";
Link;
// CART COMPONENT STARTS
function CartItems() {
  const { isUser } = useContext(UserContext);
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const navigate = useNavigate();
  const { theme, shadowColor, textColor, bgColor, borderColor, mainColor } =
    useContext(ThemeContext);
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
        color: `${textColor}`,
        backgroundColor: `${bgColor}`,
      }}
      className="text-gray-600 body-font "
    >
      <div className="container relative grid grid-cols-5 gap-4 pb-24 mx-auto overflow-hidden ">
        {/* === CONTENT SECTION === */}
        <div className="py-6 col-span-5 md:col-span-3 ">
          {loggedInUser?.isLogIn ? (
            cartItems.map((item, ind) => {
              if (item.orderedBy == loggedInUser.userCart) {
                return (
                  <div
                    key={item.id}
                    className="flex cart-item-card rounded-md relative mb-5"
                  >
                    {/* DELETE BTN */}
                    <DeleteFilled
                      onClick={() => {
                        loggedInUser.isLogIn
                          ? removeItemFromCartList(item.id)
                          : navigate("/auth/login");
                      }}
                      className="remove-card-icon absolute p-2 right-0  top-0 hover:text-white text-gray-200  hover:bg-red-700 bg-red-500 cursor-pointer  transition-all duration-100 ease-linear "
                    />
                    {/* ITEM IMAGE */}
                    <img
                      className="cart-item-img bg-gray-100 object-contain"
                      src={
                        Array.isArray(item.images)
                          ? item.images[0]
                          : item.images
                      }
                      alt="content"
                    />
                    {/* ===== CARD CONTENT ===== */}
                    <div className="cart-item-content flex flex-col justify-between p-7  rounded-lg ">
                      {/* BRAND */}
                      <h3 className="brand tracking-widest text-indigo-500 text-xs font-medium title-font">
                        {item.brand}
                      </h3>
                      {/* TITLE */}
                      <h2
                        style={{
                          color: `${theme == "black" ? "white" : "black"}`,
                        }}
                        className="title text-gray-900 font-medium title-font mb-4"
                      >
                        {item.title}
                      </h2>
                      {/* DESCRIPTION */}
                      <p className="desc leading-relaxed text-base">
                        {item.description}
                      </p>

                      {/* AMOUNT & QUANTITY */}
                      <div className="flex  items-center flex-wrap">
                        <p className="leading-relaxed flex items-center gap-2 font-bold text-2xl"></p>
                        <p className="calculation leading-relaxed flex items-center gap-2 font-bold  ">
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
                            loggedInUser.isLogIn
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
                            loggedInUser.isLogIn
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
            <StatusMessage
              status={"warning"}
              title={"Please log in to view your cart"}
              subTitle={"You need to log in to see the items in your cart"}
              onClick={() => navigate("/auth/login")}
              btnTxt={"Log in"}
            />
          )}
        </div>
        {/* === ORDER SUMMARY === */}
        <div className="order-summary col-span-5  md:col-span-2 py-5   ">
          <h1>Order Summary</h1>
          <div className="summary-content-wrapper">
            <div className="summary-content">
              {/* TOTAL AMOUNT */}
              <div className="totalAmount">
                <span>Amount</span>
                <span>{totalAmount}</span>
              </div>
              {/* TOTAL Tax */}
              <div className="discount">
                <span>Discount</span>
                <span>0.00</span>
              </div>
              {/* TOTAL QUANTITY */}
              <div className="totalQuantity">
                <span>Total Quantity</span>
                <span>{totalQuantity}</span>
              </div>
            </div>
            <div className="btns">
              {/* BUTTON TO PROCESS NEXT */}
              <button
                className="btn"
                onClick={() => navigate("/all-products/all")}
              >
                <IoBagCheckOutline />
                Continue Shopping
              </button>
              {/* BUTTON TO CONTINUE SHOPPING */}
              <button className="btn" onClick={() => navigate("/checkout")}>
                <IoBagCheckOutline />
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <style >{`
        .order-summary {
          color: ${textColor};
          background: ${bgColor};
          border: 1px solid ${borderColor} !important;
          margin-top: 1.5rem;
          padding: 1rem 2rem;
          height: 45rem;
        }
        .order-summary,
        .summary-content-wrapper,
        .summary-content,
        .btns,
        .btn {
          display: flex;
        }

        .order-summary,
        .summary-content-wrapper,
        .summary-content,
        .btns {
          flex-direction: column !important;
        }
        .summary-content-wrapper {
          height: 100%;
          padding-bottom: 1rem;
        }
        .summary-content-wrapper,
        .summary-content {
          justify-content: space-between;
          gap: 2rem;
        }
        .order-summary h1 {
          font-weight: bold;
          font-size: 2rem;
          text-align: center;
        }
        .totalAmount,
        .discount,
        .totalQuantity {
          font-size: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid #9ca3af;
        }
        :is(.totalAmount, .discount, .totalQuantity) > span:last-child {
          color: red;
        }
        .cart-item-card {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
          height: fit-content;
          border: ${theme == "black" ? `2px solid${borderColor}` : ""};
        }

        .cart-item-content {
          display: flex;
        }

        .remove-card-icon {
          font-size: 2rem;
          border-bottom-left-radius: 10px;
        }
        .cart-item-img {
          height: 24rem;
          min-width: 25rem;
          background: ${shadowColor};
        }
        .brand {
          font-size: 1.5rem;
        }
        .title {
          font-size: 2.2rem;
        }
        .desc {
          font-size: 1.6rem;
        }
        .calculation {
          font-size: 2rem;
        }
        .btns {
          gap: 1rem;
        }
        .btn {
          align-items: center;
          justify-content: center;
          gap: 1rem;
          color: white;
          padding: 1rem;
          border: none;
          border-radius: 3px;
          font-size: 2rem;
          width: 100%;
          border: 1px solid ${mainColor};
          background: transparent;
          color: ${mainColor};
          transition: all 0.1s linear;
        }
        .btn:hover {
          border: 1px solid transparent;
          background: ${mainColor};
          color: white;
        }
        .btn:focus {
          outline: none;
        }
      `}</style>
    </section>
  ) : (
    <StatusMessage
      status="warning"
      title="Your cart is empty"
      subTitle="It looks like you haven't added any items to your cart yet. Browse
          products and add them to your cart."
      onClick={() => navigate("/all-products/all")}
      btnTxt={"Start Shopping"}
    />
  );
}
export default CartItems;
