// REACT HOOKS
import { useContext, useState } from "react";
// CONTXTS
import { ThemeContext } from "../../contexts/ThemeContext";
// ICONS & OTHERS
import { Form } from "antd";
import FormInput from "../GlobalComponents/FormInput";
import FormButton from "../GlobalComponents/FormButton";
import Swal from "sweetalert2";
import { addDoc, collection, db, doc } from "../../utils/firebase";
import { Textarea } from "flowbite-react";
// FUNCTION TO INDICATE ANY ERROR
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
// CART COMPONENT STARTS
function UploadProductForm() {
  const [form] = Form.useForm();
  const { theme, color, bgColor, mainColor } = useContext(ThemeContext);
  const [isHover, setIsHover] = useState(false);
  // CART ITEM CARD
  return (
    <div
      style={{
        color: `${color}`,
        backgroundColor: `${bgColor}`,
      }}
      className="p-6 w-full flex justify-center items-center "
    >
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
        className="p-5 rounded-lg md:w-[50%] w-[100%] flex flex-col  "
        initialValues={{
          title: "mouse",
          brand: "sani",
          category: "laptop",
          price: "20",
          stock: "2",
          discount: "no discount",
          thumbnail: "asdf",
          descripton: "asdfasdf",
        }}
        onFinish={async () => {
          const values = form.getFieldValue();
          const categoriesArray = [
            "beauty",
            "fragrances",
            "furniture",
            "groceries",
            "home-decoration",
            "kitchen-accessories",
            "laptops",
            "mens-shirts",
            "mens-shoes",
            "mens-watches",
            "mobile-accessories",
            "motorcycle",
            "skin-care",
            "smartphones",
            "sports-accessories",
            "sunglasses",
            "tablets",
            "tops",
            "vehicle",
            "womens-bags",
            "womens-dresses",
            "womens-jewellery",
            "womens-shoes",
            "womens-watches",
          ];

          try {
            // const ref = collection(db, "Products");
            // await addDoc(ref, {
            //   ...values,
            // });
            const response = await fetch(
              `https://dummyjson.com/products/category/sports-accessories?limit=10&skip=0`
            );

            const res = await response.json();
            console.log(values);
            console.log(res);
          } catch (error) {
            console.log(error);
          }
          form.resetFields();
        }}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <h1 className="font-bold text-3xl font-mono mb-5">Upload Products</h1>

        {/* TITLE INPUT */}
        <FormInput
          name={"title"}
          message={"Please Input Product Title"}
          lable={"Title"}
          id={"title"}
        />

        {/* BRAND INPUT */}
        <FormInput
          name={"brand"}
          message={"Please Input Your Brand"}
          lable={"Brand"}
          id={"brand"}
        />
        {/* CATEGORY INPUT */}
        <FormInput
          name={"category"}
          message={"Please Input Product Category"}
          lable={"Category"}
          id={"category"}
        />
        {/* PRICE INPUT */}
        <FormInput
          name={"price"}
          message={"Please Input Product Price"}
          lable={"Price"}
          id={"price"}
        />

        {/* STOCK INPUT */}
        <FormInput
          name={"stock"}
          message={"Please Input Your Stock"}
          lable={"Stock"}
          id={"stock"}
        />

        {/* DISCOUNT INPUT */}
        <FormInput
          name={"discount"}
          message={"Please Input Discount"}
          lable={"Discount"}
          id={"discount"}
        />
        {/* THUMBNAIL INPUT */}
        <FormInput
          name={"thumbnail"}
          message={"Please Input thumbnail URL"}
          id={"thumbnail"}
          lable={"Thumbnail URL"}
        />
        {/* DISCRIPTIN TEXTAREA */}

        <textarea
          name="descripton"
          id="descripton"
          style={{
            color: `${color}`,
            border: `${isHover ? `1px solid ${mainColor}` : ""}`,
            borderRadius: "20px",
            marginBottom: "20px",
          }}
          onFocus={() => {
            setIsHover(true);
          }}
          onBlur={() => {
            setIsHover(false);
          }}
          rows="4"
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Description..."
        ></textarea>
        <Textarea name="description" />
        {/* SUBMIT BTN */}
        <FormButton
          type={"primary"}
          text={"Upload Product"}
          buttonVariant="contained"
        />
      </Form>
    </div>
  );
}
export default UploadProductForm;
