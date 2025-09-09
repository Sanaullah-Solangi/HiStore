import { useContext } from "react";
import { ThemeContext } from "../../../../../contexts/ThemeContext";

function StockAndOrderInfo({ stock, minimumOrderQuantity }) {
  const { textColor } = useContext(ThemeContext);
  return (
    <div className="flex mt-6 justify-between items-center pb-5 border-b-2 border-gray-100 mb-5">
      {/*=== STOCK ===*/}
      <div className="product-stock flex items-center justify-center ">
        <span className="mr-3 font-medium uppercase text-lg text-orange-500">
          Stock
        </span>
        <span>{stock ? stock : "Not Mentioned"}</span>
      </div>
      {/*=== ORDER QUANTITY ===*/}
      <div className="product-quantity flex ml-6 items-center">
        <span className="mr-3 capitalize text-lg">
          minimum Order Quantity -
        </span>
        <span>{minimumOrderQuantity}</span>
      </div>
      <style>
        {`

        .product-stock,
        .product-quantity {
          color: ${textColor};
        }
        .product-stock span,
        .product-quantity span {
          font-size: 1.7rem;
        }
            `}
      </style>
    </div>
  );
}

export default StockAndOrderInfo;
