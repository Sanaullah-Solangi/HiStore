// HOOKS
import { useContext, useEffect, useState } from "react";
// CONTEXT
import { ThemeContext } from "../../../../contexts/ThemeContext";
// ICONS & OTHER COMPONENTS
import AppModal from "./featured-products-components/AppModal";
import Loader from "../../../../components/ui/Loader";
import HeadingBorder from "../../../../components/ui/HeadingBorder";
import StatusMessage from "../../../../components/ui/StatusMessage";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import ProductCard from "./featured-products-components/ProductCard";
// FEATURED PRODUCTS COMPONENT
function FeaturedProducts() {
  // CONTEXTS
  const { theme, textColor, bgColor, mainColor } = useContext(ThemeContext);
  // STATES
  const [Id, setId] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productInfo, setProductInfo] = useState({});
  const [loader, setLoader] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  // HOOKS
  useEffect(() => {
    setLoader(true);
    setNotFound(false);
    getProducts();
  }, []);

  useEffect(() => {
    setLoader(true);
    setNotFound(false);
    getProductInfo(Id);
  }, [Id]);
  const getProducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((res) => {
        // console.log("res->", res);
        setProducts(res.products);
        setLoader(false);
        res.message ? setNotFound(true) : setNotFound(false);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
        setLoader(false);
      });
  };

  const getProductInfo = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        // console.log("res->", res);
        setProductInfo(res);
        setLoader(false);
        res.message ? setNotFound(true) : setNotFound(false);
      })
      .catch((err) => {
        console.log(err);
        setNotFound(true);
        setLoader(false);
      });
  };

  return loader ? (
    <Loader />
  ) : notFound ? (
    <>
      <StatusMessage
        status="500"
        title={"500 Internet Issue"}
        subTitle={
          " Unable to load data. Check your internet connection and try again."
        }
        onClick={() => window.scrollTo(0, 0)}
        btnTxt={"Back Home"}
      />
    </>
  ) : (
    <section id="featured-products" className="text-gray-600 body-font">
      <AppModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        productInfo={productInfo}
      />
      <div className="container featured-prods-container relative px-5 pt-16 mx-auto">
        {/* MAIN HEADING */}
        <div className="featured-prods-content text-center mb-10 flex justify-center items-center flex-col">
          <h1 className="main-heading Featured-prods-heading uppercase relative w-fitsm:text-5xl text-4xl font-medium text-center title-font text-gray-900 mb-7">
            Featured Products
            <HeadingBorder />
          </h1>
        </div>
        {/* FEATURED CARDS */}
        <ProductCard
          products={products}
          setId={setId}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        {/* VIEW ALL PRODUCTS */}
        <Button
          variant={`${theme == "black" ? "outlined" : "contained"}`}
          className="view-all-products-btn"
          onClick={() => navigate("/all-products/all")}
        >
          View All Products
        </Button>
      </div>
      <style>{`
        #featured-products {
          color: ${textColor};
          background: ${bgColor};
        }

        .main-heading {
          color: ${theme == "light" ? "#4b5563" : "white"};
        }

        .featured-prods-container .swiper-slide {
          min-height: fit-content !important;
          height: 40rem !important;
          gap: 1rem !important;
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          color: ${mainColor};
        }
        .view-all-products-btn {
          font-size: 1.4rem;
          background-color: ${theme == "black" ? "" : mainColor};
          color: ${theme == "black" ? "white" : ""};
          border: ${theme == "black" ? "1px solid white" : ""};
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      `}</style>
    </section>
  );
}
export default FeaturedProducts;
