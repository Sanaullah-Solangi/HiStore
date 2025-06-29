// REACT HOOKS
import { useContext } from "react";
// CONTXTS
import { CartContext } from "../contexts/CartContext";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
// ICONS & OTHERS
import { useNavigate } from "react-router-dom";
import { DollarOutlined, ProductOutlined } from "@ant-design/icons";
import { Form } from "antd";
import FormInput from "../components/ui/FormInput";
import FormButton from "../components/ui/FormButton";
import Swal from "sweetalert2";
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// CART COMPONENT STARTS
function CheckOut() {
  const [form] = Form.useForm();
  const { theme, color, bgColor, mainColor } = useContext(ThemeContext);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isUser } = useContext(UserContext);
  const order = localStorage.getItem("order");
  const navigate = useNavigate();
  const {
    email,
    photoURL,
    uid,
    displayName,
    phoneNumber,
    emailVerified,
    company,
    city,
    country,
  } = isUser;
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

  const placeOrder = (form) => {
    const values = form.getFieldValue();
    let prevDeliveredItem = JSON.parse(localStorage.getItem(order));
    let allDeliveredItem = [];
    cartItems.map((item) => {
      item.deliveryStatus = "done";
      item.deliveryDetails = values;
    });
    if (Array.isArray(prevDeliveredItem) && prevDeliveredItem.length != 0) {
      allDeliveredItem = [...cartItems, ...prevDeliveredItem];
    } else {
      allDeliveredItem = cartItems;
    }

    localStorage.setItem(order, JSON.stringify(allDeliveredItem));
    setCartItems([]);
    localStorage.setItem(isUser.userCart, JSON.stringify([]));
    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your operation was successful!",
      footer: '<a id="viewDetailsLink" href="/user/orders">View details</a>',
    }).then(() => {
      const viewDetailsLink = document.getElementById("viewDetailsLink");
      if (viewDetailsLink) {
        viewDetailsLink.addEventListener("click", () => {
          window.location.href = "/user/orders"; // Redirect to the desired route
        });
      }
    });
  };

  // CART ITEM CARD
  return (
    <section
      style={{
        color: `${color}`,
        backgroundColor: `${bgColor}`,
      }}
      className="text-gray-600 body-font "
    >
      <div className="container relative grid grid-cols-5 gap-4 pb-24 mx-auto overflow-hidden ">
        {/* === CONTENT SECTION === */}
        <div className="p-6 col-span-5 md:col-span-3 ">
          {/* FORM */}
          <Form
            form={form}
            name="basic"
            style={{
              boxShadow: `${theme == "light" ? "0 0 10px rgba(0,0,0,0.2" : ""}`,
              border: `${
                theme == "black" ? "2px solid rgba(255,255,255,0.6)" : ""
              }`,
            }}
            className="p-5 rounded-lg w-full flex flex-col  "
            initialValues={{
              displayName: displayName,
              company: company,
              city: city,
              country: country,
              phone: phoneNumber,
            }}
            onFinish={() => {
              console.log(form);
              placeOrder(form);
              form.resetFields();
            }}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <h1 className="font-bold text-3xl font-mono mb-5">
              Delivery Information
            </h1>

            {/* FIRSTNAME INPUT */}
            <FormInput
              name={"displayName"}
              message={"Please Input Your Full Name"}
              label={"Full Name"}
              id={"displayName"}
            />

            {/* COMPANY INPUT */}
            <FormInput
              name={"company"}
              message={"Please Input Your Company"}
              label={"Company"}
              id={"company"}
            />
            {/* ADDRESS INPUT */}
            <FormInput
              name={"address"}
              message={"Please Input Your Address"}
              label={"Address"}
              id={"address"}
            />
            {/* CITY INPUT */}
            <FormInput
              name={"city"}
              message={"Please Input Your City"}
              label={"City"}
              id={"city"}
            />

            {/* COUNTRY INPUT */}
            <FormInput
              name={"country"}
              message={"Please Input Your Country"}
              label={"Country"}
              id={"country"}
            />

            {/* PHONE INPUT */}
            <FormInput
              name={"phone"}
              message={"Please Input Your Phone Number"}
              label={"Phone Number"}
              id={"phone"}
            />
            {/* SUBMIT BTN */}
            <FormButton
              type={"primary"}
              text={"Place Order"}
              buttonVariant="contained"
              myFunc={() => {}}
            />
          </Form>
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
          </div>
        </div>
      </div>
    </section>
  );
}
export default CheckOut;
