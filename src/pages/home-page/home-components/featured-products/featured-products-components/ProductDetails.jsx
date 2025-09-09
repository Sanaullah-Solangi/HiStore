import ProductMainImage from "./ProductMainImage";
import ProductDetailsContent from "./ProductDetailsContent";
import { useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeContext";

function ProductDetails({ productInfo }) {
  const { bgColor, textColor } = useContext(ThemeContext);
  const { images } = productInfo;
  return (
    <div className="product-wrapper py-8 px-5">
      <div className="flex flex-wrap prodDetailCover  rounded-xl">
        {/*=== Product Image ===*/}
        <ProductMainImage images={images} />
        {/* === Product Content === */}
        <ProductDetailsContent productInfo={productInfo} />
      </div>
      <style>
        {`
        .product-wrapper{
            width:1000px;
            background: ${bgColor};
            color: ${textColor};
        }
      
        @media(width<=1030px){
         .product-wrapper{
            width:800px !important;
         }
        }

         @media(width<=820px){
         .product-wrapper{
            width:100% !important;
         }
        }

       
        `}
      </style>
    </div>
  );
}

export default ProductDetails;
