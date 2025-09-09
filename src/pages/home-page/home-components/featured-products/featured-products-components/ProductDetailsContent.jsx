import RatingAndRevies from "./RatingAndRevies";
import StockAndOrderInfo from "./StockAndOrderInfo";
import CartAndLikeButtons from "./CartAndLikeButtons";
import { useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeContext";

function ProductDetailsContent({ productInfo }) {
  const { textColor } = useContext(ThemeContext);
  const {
    brand,
    category,
    description,
    price,
    rating,
    stock,
    title,
    minimumOrderQuantity,
  } = productInfo;
  return (
    <div className="md:w-1/2 w-full md:pl-8 md:py-6 mt-6 md:mt-0">
      {/*=== Brand ===*/}
      <h2 className="product-brand text-sm title-font text-indigo-500 tracking-widest">
        {brand ? brand : "Not Mentioned"}
      </h2>
      {/*=== Title ===*/}
      <h1 className="product-title text-gray-900 text-3xl  title-font font-medium mt-2 mb-6">
        {title}
      </h1>
      {/*=== Price ===*/}
      <span className="product-price title-font font-medium flex text-2xl text-gray-900 mb-6">
        $ {price}
      </span>

      {/* Description */}
      <p className="product-desc leading-relaxed">{description}.</p>
      {/* Stock , Minimum Orders */}
      <StockAndOrderInfo
        stock={stock}
        minimumOrderQuantity={minimumOrderQuantity}
      />
      {/* Add To Cart Button */}
      <CartAndLikeButtons productInfo={productInfo} />
      {/* Rating And Revies */}
      <RatingAndRevies rating={rating} />
      <style>
        {`
        .product-title,
        .product-price,
        .product-desc{
          color: ${textColor};
        }

        .product-brand {
          font-size: 1.4rem;
        }

        .product-title {
          font-size: 2.5rem;
        }

        .product-price {
          font-size: 1.6rem;
        }

        .product-desc {
          font-size: 1.6rem;
          text-align: justify;
        }
         `}
      </style>
    </div>
  );
}

export default ProductDetailsContent;
