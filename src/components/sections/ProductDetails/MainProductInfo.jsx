import { ShoppingCartOutlined, StockOutlined } from "@ant-design/icons";
import { Image, Rate } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { CartContext } from "../../../contexts/CartContext";
import { FiShoppingCart } from "react-icons/fi";
const ProductMainInfo = ({
  id,
  images,
  thumbnail,
  thumbnails,
  title,
  brand,
  originalPrice,
  price,
  stock,
  averageRating,
  description,
  product,
  category,
  totalSold,
  likes,
}) => {
  const { theme, mainColor, textColor, bgColor } = useContext(ThemeContext);
  const { addItemToCart, isProductExist } = useContext(CartContext);

  return (
    <div className="main-info-container flex lg:gap-12 mb-10 ">
      {/* === IMAGES CONTAINER === */}
      <div className="imgs-container flex-1">
        {/* Main product image */}
        <Image src={images?.length > 1 ? images[0] : images} alt={title} />

        {/* Thumbnail images */}
        {images?.length > 1 ? (
          <div className="flex gap-2 thumbnails-container">
            {
              /* {images?.thumbnails?.map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`${title} thumbnail ${index}`}
            />
          ))} */
              images?.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`${title} thumbnail ${index}`}
                />
              ))
            }
          </div>
        ) : (
          ""
        )}
      </div>
      {/* === MAIN CONTENT CONTAINER === */}
      <div className="flex-1">
        {/* BRAND */}
        <div className="brand text-indigo-600 mb-2">{brand?.toUpperCase()}</div>
        {/* TITLE */}
        <h1 className="title text-2xl font-semibold mb-4">{title}</h1>
        {/* === PRICE CONTAINER === */}
        <div className="flex items-center">
          {/* ORIGINAL PRICE */}
          <span className="original-price line-through text-gray-500 mr-2">
            ${originalPrice.toFixed(2)}
          </span>
          {/* DISCOUNTED PRICE */}
          <span className="discount text-2xl font-semibold text-black mr-4">
            ${price?.toFixed(2)}
          </span>
        </div>

        {/* === MORE CONTENT CONTANER === */}
        <div className="mb-6">
          {/* DESCRIPTION */}

          <p className="desc mt-8 leading-relaxed text-gray-800 mb-2">
            {description}
          </p>
          <div className="flex justify-between">
            {/* STOCK */}
            <span className="stock uppercase text-gray-600 mr-4">
              Stock <StockOutlined /> {stock}
            </span>
            {/* === RATING CONTAINER ===*/}
            <div className="rating flex items-center gap-2  mb-5">
              <Rate disabled defaultValue={averageRating} allowHalf />
              <span className="rating-num">{averageRating?.toFixed(1)}</span>
            </div>
          </div>
          {/* PRODUCT STATUS */}
          <p className="status leading-relaxed text-gray-800 mb-2">
            <strong>Status:</strong> {product.status}
          </p>
          {/* CATEGORY */}
          <p className="category leading-relaxed text-gray-800 mb-2">
            <strong>Category:</strong>{" "}
            <span className="uppercase">{category}</span>
          </p>
          {/* TOTAL SOLD */}
          <p className="sold leading-relaxed text-gray-800 mb-2">
            <strong>Total Sold:</strong> {totalSold}
          </p>
          {/* LIKES */}
          <p className="likes leading-relaxed flex justify-between items-center text-gray-800 mb-2">
            <strong>Likes:</strong> {likes?.length} {/* LIKE BTN */}
            <button className="like-btn rounded-full w-10 h-10 bg-gray-500 p-0 border-0 inline-flex items-center justify-center ml-4">
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
          </p>
        </div>
        {/* === SIZE CONTAINER === */}
        {/* <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="size-heading text-base font-semibold">
              Size: {stock}
            </h3>
            <a href="#" className="view-size text-blue-600">
              View Size Chart
            </a>
          </div>
          <div className="flex gap-2">
            <button className="size-btn flex items-center justify-center border border-gray-200 rounded">
              6
            </button>
            <button className="size-btn flex items-center justify-center border border-black bg-gray-100 rounded">
              8
            </button>
            <button className="size-btn flex items-center justify-center border border-gray-200 rounded">
              10
            </button>
            <button className="size-btn flex items-center justify-center border border-gray-200 rounded">
              14
            </button>
            <button className="size-btn flex items-center justify-center border border-gray-200 rounded">
              18
            </button>
            <button className="size-btn flex items-center justify-center border border-gray-200 rounded">
              20
            </button>
          </div>
        </div> */}
        {/* === ADD TO CART === */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={() => {
              isUser?.isLogIn
                ? addItemToCart({
                    ...productInfo,
                    quantity: 1,
                    orderedBy: userCart,
                    deliveryStatus: "pending",
                    deliveryDetails: {},
                  })
                : navigate("/auth/login");
            }}
            className="add-to-cart-btn flex-1 py-3 px-6 bg-black text-white rounded"
          >
            {isProductExist(id) ? (
              isProductExist(id) ? (
                `Increase Quantity ${isProductExist(id).quantity}`
              ) : (
                "0"
              )
            ) : (
              <>
                <ShoppingCartOutlined className="mr-2" /> Add To Cart
              </>
            )}
          </button>
          <button className="checkout-btn flex-1 py-3 px-6 bg-white text-black border border-black font-semibold rounded">
            Checkout Now
          </button>
        </div>

        <div className="delivery text-gray-600">
          <p>Delivery: TBC</p>
        </div>
      </div>
      <style jsx global>
        {`
          .main-info-container {
            gap: 1.5rem;
            height: 500px;
            background: ${bgColor};
          }
          .main-info-container,
          .original-price,
          .discount,
          .ant-rate-star div,
          .desc,
          .status,
          .category,
          .sold,
          .likes {
            color: ${textColor} !important;
          }
          .imgs-container > .ant-image {
            height: ${images?.length > 1 ? "70%" : "100%"};
            width: 100% !important;
          }
          .imgs-container > .ant-image img,
          .thumbnails-container .ant-image,
          .thumbnails-container .ant-image img {
            height: 100%;
          }

          .imgs-container > .ant-image .ant-image-img,
          .thumbnails-container .ant-image img {
            object-fit: contain;
            object-position: top;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;
            background: ${theme == "black"
              ? "linear-gradient(to top right, rgba(255,255,255,0.08), rgba(27,31,35,0.4));"
              : "rgb(245, 245, 245)"};
          }

          .thumbnails-container {
            height: 30%;
          }
          .thumbnails-container .ant-image {
            flex: 1 1 100%;
          }
          .brand,
          .rating-num,
          .size-btn,
          .add-to-cart-btn,
          .checkout-btn,
          .delivery {
            font-size: 1.6rem;
          }
          .title {
            font-size: 2.5rem;
          }
          .desc {
            font-size: 1.9rem;
          }
          .original-price,
          .discount,
          .status,
          .category,
          .sold,
          .likes {
            font-size: 1.4rem;
          }

          .stock {
            font-size: 2rem;
            color: ${mainColor};
          }

          .size-heading,
          .view-size {
            font-size: 1.7rem;
          }
          .size-btn {
            width: 4rem;
            height: 4rem;
            border-color: rgba(0, 0, 0, 0.2);
          }
          .add-to-cart-btn {
            background: ${mainColor};
            font-weight: 500 !important;
            border: 2px solid ${mainColor};
          }
          .add-to-cart-btn:hover {
            background: transparent;
            color: ${textColor};
          }

          @media (width < 930px) {
            .main-info-container {
              height: auto;
              flex-direction: column;
            }
            .imgs-container > .ant-image {
              min-height: 50rem !important;
              height: 50rem;
            }
          }
        `}
      </style>
    </div>
  );
};

export default ProductMainInfo;
