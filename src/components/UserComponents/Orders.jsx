// REACT HOOKS
import { useContext } from "react";
// CONTXTS
import { CartContext } from "../../contexts/CartContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
// COMPONENTS
import StatusMessage from "../ui/StatusMessage";
// ICONS & OTHERS
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { DollarOutlined, CloseOutlined } from "@ant-design/icons";

// CART COMPONENT STARTS
function Orders() {
  const { isUser } = useContext(UserContext);
  const { theme, color, bgColor, mainColor } = useContext(ThemeContext);
  const { deliveredItems } = useContext(CartContext);
  const navigate = useNavigate();
  // CALCULATING TOTAL AMOUNT OF CART ITEMS
  const totalAmount = deliveredItems.reduce(
    (total, product) => Math.round(total + product.price * product.quantity),
    0
  );
  // CALCULATING QUANTITY OF ITEMS
  const totalQuantity = deliveredItems.reduce(
    (total, product) => total + product.quantity,
    0
  );
  // CART ITEM CARD
  return deliveredItems.length != 0 ? (
    <section
      style={{
        color: `${color}`,
        backgroundColor: `${bgColor}`,
      }}
      className="text-gray-600 body-font px-4"
    >
      <div className="container relative pb-24 mx-auto overflow-hidden ">
        {/* === CONTENT SECTION === */}
        <div className="py-6 md:col-span-3 ">
          {isUser?.isLogIn ? (
            deliveredItems.map((item, ind) => {
              return (
                <div
                  style={{
                    border: `${
                      theme == "black" ? "2px solid rgba(255,255,255,0.4)" : ""
                    }`,
                  }}
                  key={item.id}
                  className=" flex cartItemCard rounded-md relative mb-5"
                >
                  {/* DELETE BTN */}

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
                  </div>
                </div>
              );
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
      </div>
    </section>
  ) : (
    // <EmptyData />
    <StatusMessage
      status={"warning"}
      title={"Your cartasd is empty"}
      subTitle={
        " It looks like you haven't added any items to your cart yet. Browse products and add them to your cart."
      }
      onClick={() => navigate("/all-products/all")}
      btnTxt={"Start Shopping"}
    />
  );
}
export default Orders;
