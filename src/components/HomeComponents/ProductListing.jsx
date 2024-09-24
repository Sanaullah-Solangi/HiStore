// HOOKS
import { useContext, useEffect, useState } from "react";
// CONTEXTS
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import { CartContext } from "../../contexts/CartContext";
import { ShoppingCartOutlined } from "@ant-design/icons";
// ICONS & OTHER COMPONENT
import Loader from "../GlobalComponents/Loader";
import Button from "@mui/material/Button";
import { DollarOutlined } from "@ant-design/icons";
import { Image } from "antd";

function ProductListing() {
  //CONTEXTS
  const { isUser } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const { isProductExist, addItemToCart } = useContext(CartContext);
  //STATES
  const [loader, setLoader] = useState(true);
  const [limit, setLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loadMore, setLoadMore] = useState(true);
  const [products, setProducts] = useState([]);
  // GETTING DATA ON CHANGING LIMIT STATE
  useEffect(() => {
    getProducts();
  }, [limit]);

  // CHECK SCROLL POSITION IF LAST PRODUCT IS REACHED THEN INCREASES LIMIT AND CALLS getPoduct FUNCTION
  const getDataOnScroll = () => {
    const scrollHeight = window.scrollY;
    const productDistance = document.querySelector(
      ".productListingCard:last-child"
    ).offsetTop;
    if (scrollHeight >= productDistance - 200) {
      setLimit(limit + 5);
    }
  };
  // CHANGING LIMIT ON SCROLLING TO THE END
  useEffect(() => {
    window.addEventListener("scroll", getDataOnScroll);

    return () => {
      window.removeEventListener("scroll", getDataOnScroll);
    };
  }, [loadMore]);
  // FUNCTION TO GET DATA FROM API
  const getProducts = () => {
    setLoader(true);
    fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("res->", res);
        setProducts(res.products);
        console.log(res.total);
        setLoader(false);
        loadMore ? setLoadMore(false) : setLoadMore(true);
      })
      .catch((err) => {
        setLoader(false);
        setLoadMore(false);
        console.log(err);
      });
  };

  return (
    <>
      <section
        style={{
          color: `${theme == "light" ? "#4b5563" : "white"}`,
          backgroundColor: `${theme == "light" ? "white" : "black"}`,
        }}
        className="text-gray-600 body-font"
      >
        {/* CONTAINER */}
        <div className=" container px-3 py-24 mx-auto">
          {/* HEADING SECTION */}
          <div className="text-center mb-10 flex justify-center items-center flex-col">
            <h1
              className="mainHeading FeaturedProdsHeading uppercase relative w-fit sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-7"
              style={{
                color: `${theme == "light" ? "#4b5563" : "white"}`,
              }}
            >
              All Products Listing
            </h1>
          </div>
          {/* CONTENT SECTION */}
          <div className="productListingContainer flex gap-4 flex-wrap -m-4">
            {/* CARD */}
            {products?.map((data) => {
              return (
                <div
                  key={data?.id}
                  className="productListingCard "
                  style={{ boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
                >
                  <div className="bg-gray-100 rounded-lg">
                    {/* CARD IMAGE */}
                    <Image
                      height={"15rem"}
                      width={"100%"}
                      className=" rounded  object-contain object-center mb-6"
                      src={data.images[0]}
                      alt="content"
                    />
                    {/* PRODUCT DETAILS */}
                    <div
                      className="p-6 flex flex-col"
                      style={{
                        border: `${
                          theme == "black"
                            ? "2px solid rgba(255,255,255,0.4)"
                            : ""
                        }`,
                        backgroundColor: `${
                          theme === "black" ? "black" : "white"
                        }`,
                      }}
                    >
                      {/* PRODUCT BRAND */}
                      <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font">
                        {data.brand}
                      </h3>
                      {/* TITLE */}
                      <h2
                        style={{
                          color: `${
                            theme == "light" ? "rgb(17, 24, 39 )" : "white"
                          }`,
                        }}
                        className="text-lg font-medium title-font mb-4"
                      >
                        {data.title}
                      </h2>
                      {/* DESCRIPTION */}
                      <p className="leading-relaxed text-base h-full">
                        {data.description}
                      </p>
                      {/* PRICE & TOTAL */}
                      <div className="flex justify-between icon-link">
                        <p className="flex justify-between items-center gap-2 text-gray-900 font-bold">
                          <DollarOutlined style={{ fontSize: "22px" }} />{" "}
                          {Math.round(data.price)}
                        </p>
                        <p className="flex justify-between items-center gap-2 text-gray-900 font-bold">
                          <span>Total</span>
                          {isProductExist(data.id)
                            ? Math.round(
                                data.price * isProductExist(data.id).quantity
                              )
                            : 0}
                        </p>
                      </div>
                      {/* ADD TO CART BTN */}
                      <Button
                        onClick={() => {
                          isUser
                            ? addItemToCart({ ...data, quantity: 1 })
                            : navigate("/auth/LogInPage");
                        }}
                        className="productListingCartBtn w-full"
                        variant={`${
                          theme == "black" ? "outlined" : "contained"
                        }`}
                        style={{
                          color: `${theme == "black" ? "white" : ""}`,
                          border: `${
                            theme == "black" ? "2px solid white" : ""
                          }`,
                        }}
                      >
                        {isProductExist(data.id) ? (
                          <>
                            Increase Quantity
                            <span>( {isProductExist(data.id).quantity} )</span>
                          </>
                        ) : (
                          <>
                            Add to Cart
                            <ShoppingCartOutlined
                              style={{ fontSize: "22px" }}
                            />
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      {loader && <Loader />}
    </>
  );
}
export default ProductListing;
