import { StarFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PopularProducts = ({ brand, price, images }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="popular-main-heading font-semibold">
          Popular this week
        </h2>
        <a href="#" className="text-sm text-blue-600">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images?.thumbnails?.map((item) => (
          <div key={item} className="rounded overflow-hidden">
            <img
              src={item}
              alt="Popular product"
              className="w-full h-auto object-cover"
            />
            <div className="p-3">
              <h3 className="popular-sub-heading font-semibold mb-1">
                {brand}
              </h3>
              <p className="popular-price font-semibold mb-1">
                ${price.toFixed(2)}
              </p>
              <div className="flex items-center gap-1 popular-rating text-gray-600">
                <StarFilled style={{ color: "#fadb14" }} />
                <span>4.8</span>
                <span>(230 Sold)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>
        {`
          .popular-main-heading {
            font-size: 2rem;
          }
          .popular-sub-heading,
          .popular-rating {
            font-size: 1.7rem;
          }
          .popular-price {
            font-size: 1.3rem;
          }
        `}
      </style>
    </div>
  );
};
export default PopularProducts;
