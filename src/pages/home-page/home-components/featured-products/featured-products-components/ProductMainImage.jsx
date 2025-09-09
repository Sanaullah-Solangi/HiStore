import { Image } from "antd";
import React from "react";

function ProductMainImage({ images }) {
  return (
    <div className="prodDetailImg md:w-1/2 lg:h-auto  rounded">
      <Image
        alt="ecommerce"
        width={"100%"}
        height={"100%"}
        style={{ objectFit: "contain" }}
        src={Array.isArray(images) ? images[0] : images}
      />
    </div>
  );
}

export default ProductMainImage;
