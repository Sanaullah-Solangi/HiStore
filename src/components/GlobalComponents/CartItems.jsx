import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { FaDollarSign } from "react-icons/fa";

import { RiNumbersFill } from "react-icons/ri";

import {
  DeleteFilled,
  DollarOutlined,
  DeliveredProcedureOutlined,
} from "@ant-design/icons";

function CartItems() {
  const { cartItems, removeItemFromCartList, isProductExist } =
    useContext(CartContext);
  const totalAmount = cartItems.reduce(
    (total, product) => Math.round(total + product.price * product.quantity),
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );

  console.log(totalQuantity);
  return (
    <section className="text-gray-600 body-font ">
      <div className="container pb-24 mx-auto ">
        {/* === HEADING SECTION === */}
        <div className="container mx-auto flex flex-wrap py-5  md:flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center  text-xl">
              <FaDollarSign />{" "}
              <span style={{ fontSize: "22px" }}>{totalAmount}</span>
            </div>
            <div className="flex items-center  text-xl">
              <FaDollarSign />{" "}
              <span style={{ fontSize: "22px" }}>{totalQuantity}</span>
            </div>
          </div>

          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Button
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* === CONTENT SECTION === */}
        <div className="grid gap-4 px-5  -m-4">
          {cartItems.map((item, ind) => {
            console.log(item);
            return (
              <div key={item.id} className="cartItemCard relative  mt-6">
                <DeleteFilled
                  onClick={() => {
                    removeItemFromCartList(item.id);
                  }}
                  className="removeCardIcon absolute p-2 right-0  top-0 text-white  hover:bg-red-700 bg-red-500 cursor-pointer  transition-all duration-100 ease-linear"
                />
                <div className=" pb-6 rounded-lg">
                  <img
                    className="bg-gray-100 h-60 rounded w-full object-contain object-center mb-6"
                    src={
                      Array.isArray(item.images) ? item.images[0] : item.images
                    }
                    alt="content"
                  />
                  <div className="px-6">
                    <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                      {item.brand}
                    </h3>
                    <h2 className="text-lg text-gray-900 font-medium title-font mb-4">
                      {item.title}
                    </h2>
                    <p className="leading-relaxed text-base">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center flex-wrap">
                      <p className="leading-relaxed text-base">
                        <span className="p-1 px-2 bg-orange-500 font-medium text-white rounded-md">
                          Quantity
                        </span>{" "}
                        <span style={{ fontSize: "24px" }}>
                          {item.quantity}
                        </span>
                      </p>
                      <p className="leading-relaxed text-base">
                        <DollarOutlined /> {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
            console.log(item);
          })}
        </div>
      </div>
    </section>
  );
}
export default CartItems;
