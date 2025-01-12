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
import { FaFilter } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

import { DollarOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import HeadingBorder from "../GlobalComponents/HeadingBorder";
import NoResults from "../GlobalComponents/NoMatch";
import {
  getDocs,
  db,
  collection,
  query,
  where,
  limit,
  orderBy,
  getCountFromServer,
} from "../../utils/firebase";
const categoriesArray = [
  "all",
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

function ProductListing() {
  //CONTEXTS
  const { isUser } = useContext(UserContext);
  const { theme, color, bgColor, mainColor } = useContext(ThemeContext);
  const { isProductExist, addItemToCart, searchTerm } = useContext(CartContext);
  //STATES
  const { searchQuery } = useParams();
  const [itemLimit, setitemLimit] = useState(5);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [categories, setCategories] = useState([...categoriesArray]);
  const [category, setCategory] = useState(searchQuery);
  const [sortBy, setSortBy] = useState("none");
  const [sortDirection, setSortDirection] = useState("asc");

  const [loader, setLoader] = useState(true);
  const [loadMore, setLoadMore] = useState(true);
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    searchProducts();
    setIsSearched(true);
  }, [searchTerm]);

  // GETTING DATA ON CHANGING itemLIMIT STATE
  useEffect(() => {
    getProducts();
    setIsSearched(false);
  }, [itemLimit]);

  // CHANGING itemLIMIT ON SCROLLING TO THE END
  useEffect(() => {
    if (itemLimit <= total) {
      window.addEventListener("scroll", getDataOnScroll);

      return () => {
        window.removeEventListener("scroll", getDataOnScroll);
      };
    }
  }, [loadMore]);

  // CHECK SCROLL POSITION IF LAST PRODUCT IS REACHED THEN INCREASES itemLIMIT AND CALLS getPoduct FUNCTION
  const getDataOnScroll = () => {
    const scrollHeight = window.scrollY;
    const productDistance = document.querySelector(
      ".productListingCard:last-child"
    ).offsetTop;
    if (scrollHeight >= productDistance - 200) {
      setitemLimit(itemLimit + 10);
    }
  };

  // FUNCTION TO GET DATA FROM API
  const getProducts = async () => {
    if (!isSearched) {
      try {
        setLoader(true);
        const prodRef = collection(db, "Products");
        const productQueryConditions = [
          category !== "all" && where("category", "==", category),
          sortBy !== "none" && orderBy(sortBy, sortDirection),
          limit(itemLimit),
        ].filter(Boolean);

        const productQuery = query(
          collection(db, "Products"),
          ...productQueryConditions
        );
        const totalProducts = await getCountFromServer(prodRef);
        const products = await getDocs(productQuery);
        const data = products.docs.map((doc) => {
          return doc.data();
        });
        // const response = await fetch(
        //   `https://dummyjson.com/products/${
        //     category == "all" ? "" : `category/${category}`
        //   }?limit=${itemLimit}&skip=${skip}&sortBy=${
        //     sortBy == "none" ? "" : sortBy
        //   }&order=${sortDirection}`
        // );
        // const res = await response.json();
        setProducts(data);
        setTotal(totalProducts.data().count);
        setLoader(false);
        setLoadMore(!loadMore);
        return data;
      } catch (error) {
        setLoader(false);
        setLoadMore(false);
        console.log(error);
      }
    }
  };

  // FUNCTION TO SEARCH PRODUCTS BY INPUT
  const searchProducts = async () => {
    if (isSearched) {
      try {
        setLoader(true);
        fetch(`https://dummyjson.com/products/search?q=${searchTerm}`)
          .then((res) => res.json())
          .then((res) => {
            setProducts(res.products);
            setLoader(false);
            setLoadMore(!loadMore);
            console.clear();
            console.log(res.products);
            console.log("Men Search per chal rha hun");
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // FUNCTION TO FILTER DATA
  const filterData = () => {
    setIsSearched(false);
    setTimeout(() => {
      getProducts();
    }, 500);
    isFilterOpen ? setIsFilterOpen(false) : setIsFilterOpen(true);
  };

  return (
    <>
      <section
        style={{
          color: `${color}`,
          backgroundColor: `${bgColor}`,
        }}
        className="text-gray-600 body-font "
      >
        {/* CONTAINER */}
        <div className="container  px-3 py-24 mx-auto">
          {/* HEADING SECTION */}
          <div className="text-center mb-10 flex justify-center items-center flex-col">
            <h1
              className="mainHeading FeaturedProdsHeading uppercase relative w-fit sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-7"
              style={{
                color: `${color}`,
              }}
            >
              All Products Listing
              <HeadingBorder />
            </h1>
          </div>
          {/*============== CONTENT SECTION ==============*/}
          <div className="flex relative">
            {/* FILTER ICONS */}
            <div
              onClick={() => {
                isFilterOpen ? setIsFilterOpen(false) : setIsFilterOpen(true);
              }}
              className="absolute flex gap-2 -top-10 left-0 text-2xl cursor-pointer"
            >
              {isFilterOpen ? (
                <IoClose className="text-3xl" />
              ) : (
                <FaFilter className=" text-3xl" />
              )}
              <h1 className="font-bold">Filter</h1>
            </div>

            {/* FILTER CONTAINER */}
            <div
              className="filterContainer h-screen transition-all duration-200 absolute z-20 bg-white rounded-lg gap-4 p-4"
              style={{
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                left: `${isFilterOpen ? "0" : "-100%"}`,
              }}
            >
              <h1 className="text-2xl text-black font-bold mb-4">Filter</h1>
              <div className="filterInputs flex flex-col h-full">
                {/* CATEGORY */}
                <label className="text-black" htmlFor="category">
                  Category
                  <select
                    className="rounded-lg w-full border border-gray-300 mt-1 capitalize"
                    type="text"
                    id="category"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    {categories.map((data, ind) => {
                      return (
                        <option key={ind} value={data} className="capitalize">
                          {data}
                        </option>
                      );
                    })}
                  </select>
                </label>
                {/* SORT BY */}
                <label className="text-black" htmlFor="sortBy">
                  SortBy
                  <select
                    className="rounded-lg w-full border border-gray-300 mt-1"
                    type="number"
                    id="sortBy"
                    placeholder="Sort By"
                    value={sortBy}
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                  >
                    <option value={"none"}>None</option>
                    <option value={"brand"}>Brand</option>
                    <option value={"title"}>Title</option>
                    <option value={"price"}>price</option>
                  </select>
                </label>
                {/* ORDER BY*/}
                <label className="text-black" htmlFor="sortDirection">
                  Order By
                  <select
                    className="rounded-lg w-full border border-gray-300 mt-1"
                    type="text"
                    id="sortDirection"
                    placeholder="Order By"
                    value={sortDirection}
                    onChange={(e) => {
                      setSortDirection(e.target.value);
                    }}
                  >
                    <option style={{ color: "black " }} value={"asc"}>
                      Accending
                    </option>
                    <option value={"desc"}>Decsending</option>
                  </select>
                </label>

                {/* APPLY BTN */}
                <Button
                  onClick={() => filterData()}
                  variant="contained"
                  className="w-full filterBtn"
                  style={{ backgroundColor: `${mainColor}` }}
                >
                  Apply All
                </Button>
              </div>
            </div>
            {/* CONTENT CONTAINER */}
            <div className="productListingContainer flex w-full gap-4 flex-wrap ">
              {/* CARD */}
              {products.length != 0 ? (
                products?.map((data) => {
                  return (
                    <div
                      key={data?.id}
                      className="productListingCard "
                      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
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
                          className="p-6 flex flex-col "
                          style={{
                            border: `${
                              theme == "black"
                                ? "2px solid rgba(10,10,10,0.2)"
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
                            className="text-lg font-medium title-font h-16"
                          >
                            {data.title}
                          </h2>
                          {/* DESCRIPTION */}
                          <p className="leading-relaxed text-base h-48">
                            {data.description}
                          </p>
                          {/* PRICE & TOTAL */}
                          <div className="flex justify-between icon-link">
                            <p
                              style={{ color: `${color}` }}
                              className="flex justify-between items-center gap-2 text-gray-900 font-bold"
                            >
                              <DollarOutlined style={{ fontSize: "22px" }} />{" "}
                              {Math.round(data.price)}
                            </p>
                            <p
                              style={{ color: `${color}` }}
                              className="flex justify-between items-center gap-2 text-gray-900 font-bold"
                            >
                              <span>Total</span>
                              {isProductExist(data.id)
                                ? Math.round(
                                    data.price *
                                      isProductExist(data.id).quantity
                                  )
                                : 0}
                            </p>
                          </div>
                          {/* ADD TO CART BTN */}
                          <Button
                            onClick={() => {
                              isUser?.isLogIn
                                ? addItemToCart({
                                    ...data,
                                    quantity: 1,
                                    orderedBy: isUser.userCart,
                                    deliveryStatus: "pending",
                                    deliveryDetails: {},
                                  })
                                : navigate("/auth/login");
                            }}
                            className="productListingCartBtn w-full"
                            variant={`${
                              theme == "black" ? "outlined" : "contained"
                            }`}
                            style={{
                              backgroundColor: `${
                                theme == "light" ? `${mainColor}` : ""
                              }`,
                              color: `${theme == "black" ? "white" : ""}`,
                              border: `${
                                theme == "black" ? "2px solid white" : ""
                              }`,
                            }}
                          >
                            {isProductExist(data.id) ? (
                              <>
                                Increase Quantity
                                <span>
                                  ( {isProductExist(data.id).quantity} )
                                </span>
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
                })
              ) : (
                <NoResults />
              )}
            </div>
          </div>
        </div>
      </section>
      {loader && <Loader />}
    </>
  );
}
export default ProductListing;
