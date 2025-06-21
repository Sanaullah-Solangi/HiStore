import { StarFilled } from "@ant-design/icons";
import { Image } from "antd";

const RelatedProducts = ({ images, brand, price }) => {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Related Product</h2>
        <a href="#" className="text-sm text-blue-600">
          View All
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {images.thumbnails.map((item) => (
          <div key={item} className="rounded overflow-hidden">
            <Image
              src={item}
              alt="Related product"
              className="w-full h-auto object-cover"
            />
            <div className="p-3">
              <h3 className="text-sm font-semibold mb-1">{brand}</h3>
              <p className="text-base font-semibold mb-1">
                ${price.toFixed(2)}
              </p>
              <div className="flex items-center gap-1 text-xs text-gray-600">
                <StarFilled style={{ color: "#fadb14" }} />
                <span>4.8</span>
                <span>(230 Sold)</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RelatedProducts;
