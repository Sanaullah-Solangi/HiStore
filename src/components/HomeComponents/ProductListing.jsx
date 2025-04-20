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
const filterOptions = [
  { label: "category", id: "category", type: "text", options: categoriesArray },
  {
    label: "sort-by",
    id: "sortBy",
    type: "text",
    options: ["none", "brand", "title", "price"],
  },
  {
    label: "order-by",
    id: "sort-Direction",
    type: "text",
    options: ["accending", "decsending"],
  },
];

function ProductListing() {
  //CONTEXTS
  const { isUser } = useContext(UserContext);
  const { theme, textColor, bgColor, mainColor, shadowColor } =
    useContext(ThemeContext);
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
      ".product-listing-card:last-child"
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
          color: `${textColor}`,
          backgroundColor: `${bgColor}`,
        }}
        className="text-gray-600 body-font "
      >
        {/* CONTAINER */}
        <div className="container  px-3 py-24 mx-auto">
          {/* HEADING SECTION */}
          <div className="text-center mb-10 flex justify-center items-center flex-col">
            <h1
              className="main-heading  uppercase relative w-fit sm:text-5xl text-2xl font-medium text-center title-font text-gray-900 mb-7"
              style={{
                color: `${textColor}`,
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
              className="absolute flex gap-2 -top-14 left-0 text-4xl cursor-pointer"
            >
              {isFilterOpen ? (
                <IoClose className="text-3xl" />
              ) : (
                <FaFilter className=" text-3xl" />
              )}
              <h1 className="font-bold">Filter</h1>
            </div>

            {/* FILTER CONTAINER */}
            <div className="filter-container h-screen transition-all duration-200 absolute z-20 bg-white rounded-lg gap-4 p-4">
              <div className="filter-inputs flex flex-col h-full">
                {filterOptions.map((filter) => (
                  <label className="text-black capitalize" htmlFor={filter.id}>
                    {filter.label}
                    <select
                      className="rounded-lg w-full border border-gray-300 mt-1 capitalize"
                      type="text"
                      id="category"
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      {filter.options.map((option) => (
                        <option
                          key={option}
                          value={option}
                          className="capitalize"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}

                {/* APPLY BTN */}
                <Button
                  onClick={() => filterData()}
                  variant="contained"
                  className="w-full filter-btn"
                >
                  Apply All
                </Button>
              </div>
            </div>
            {/* CONTENT CONTAINER */}
            <div className="product-listing-container flex w-full gap-4 flex-wrap ">
              {/* CARD */}
              {products.length != 0 ? (
                products?.map((data) => {
                  return (
                    <div
                      key={data?.id}
                      className="product-listing-card flex flex-col"
                    >
                      {/* CARD IMAGE */}
                      <Image
                        height={"15rem"}
                        width={"100%"}
                        className="rounded object-contain object-center mb-6 bg-gray-100"
                        src={data.images[0]}
                        alt="content"
                      />
                      {/* PRODUCT DETAILS */}
                      <div className="cart-content p-6 flex flex-col ">
                        {/* PRODUCT BRAND */}
                        <h3 className="brand tracking-widest text-indigo-500 font-medium title-font">
                          {data.brand}
                        </h3>
                        {/* TITLE */}
                        <h2
                          style={{
                            color: `${
                              theme == "light" ? "rgb(17, 24, 39 )" : "white"
                            }`,
                          }}
                          className="title font-medium title-font h-16"
                        >
                          {data.title}
                        </h2>
                        {/* DESCRIPTION */}
                        <p className="desc leading-relaxed text-base h-48">
                          {data.description}
                        </p>
                        {/* PRICE & TOTAL */}
                        <div className="flex justify-between icon-link">
                          <p className="price">
                            <DollarOutlined style={{ fontSize: "22px" }} />
                            {Math.round(data.price)}
                          </p>
                          <p className="total-amount">
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
                          className="cart-btn w-full flex"
                          variant={`${
                            theme == "black" ? "outlined" : "contained"
                          }`}
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
                                style={{ fontSize: "1.6rem" }}
                              />
                            </>
                          )}
                        </Button>
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
        <style jsx global>{`
          .filter-container {
            box-shadow: ${shadowColor};
            left: ${isFilterOpen ? "0" : "-100%"};
            opacity: ${isFilterOpen ? "1" : "0"};
            width: 25%;
          }
          .filter-inputs > label {
            margin-bottom: 1rem !important;
            font-size: 1.6rem;
          }
          .filter-inputs > label > select {
            font-size: 1.4rem;
            padding: 1rem;
          }

          .filter-inputs > label > select:focus {
            border-color: ${mainColor} !important;
            box-shadow: none !important;
          }

          .filter-btn {
            background: ${mainColor};
            font-size: 1.6rem;
            font-weight: normal;
            text-transform: capitalize;
            font-family: "Jost", sans-serif;
          }

          .product-listing-card {
            box-shadow: ${shadowColor};
          }

          .cart-content {
            border: ${theme == "black" ? "2px solid rgba(10,10,10,0.2)" : ""};
            background: ${theme === "black" ? "black" : "white"};
            justify-content: space-between !important;
            flex: 1 1 100%;
            justify-content: end !important;
          }
          .brand,
          .desc {
            font-size: 1.5rem;
          }
          .title {
            font-size: 2rem;
          }

          .price,
          .total-amount {
            font-size: 1.7rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 1rem;
            font-weight: bold;
            color: ${textColor};
          }
          .cart-btn {
            font-size: 1.2rem;
            margin-top: 1rem;
            gap: 2rem;
            background: ${theme == "light" ? `${mainColor}` : ""};
            color: ${theme == "black" ? "white" : ""};
            border: ${theme == "black" ? "2px solid white" : ""};
          }
        `}</style>
      </section>
      {loader && <Loader />}
    </>
  );
}
export default ProductListing;
