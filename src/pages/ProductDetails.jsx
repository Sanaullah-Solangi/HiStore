import ProductMainInfo from "../components/sections/ProductDetails/MainProductInfo";
import PriceHistory from "../components/sections/ProductDetails/PriceHistory";
import RelatedProducts from "../components/sections/ProductDetails/RelatedProducts";
import ProductReviews from "../components/sections/ProductDetails/ProductReviews";
import PopularProducts from "../components/sections/ProductDetails/PopularProducts";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const ProductDetails = () => {
  const { id } = useParams();
  const { mainColor, textColor, bgColor } = useContext(ThemeContext);
  const [productInfo, setProductInfo] = useState({});
  useEffect(() => {
    getProductInfo(id);
  }, []);
  const getProductInfo = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((res) => {
        console.log("id in func ==>", id);

        // console.clear();
        console.log("res->", res);
        setProductInfo(res);
        // setLoader(false);
        // res.message ? setNotFound(true) : setNotFound(false);
      })
      .catch((err) => {
        console.log(err);
        // setNotFound(true);
        // setLoader(false);
      });
  };
  /* const product = {
    id: 1,
    title: "Men's Casual Shirt",
    description:
      "A comfortable and stylish casual shirt for men, perfect for everyday wear.",
    price: 29.99,
    discount: "20", // 20% discount
    stock: 50,
    rating: [4.5, 3.8, 5, 4.2, 4.7], // Array of ratings
    reviews: [
      {
        id: 1,
        user: "John Doe",
        rating: 4.5,
        comment: "Great shirt, fits perfectly!",
        date: "2023-07-23",
        avatar: "https://via.placeholder.com/40", // User avatar image
      },
      {
        id: 2,
        user: "Jane Smith",
        rating: 5,
        comment: "Amazing quality and fast delivery.",
        date: "2023-07-20",
        avatar: "https://via.placeholder.com/40", // User avatar image
      },
      {
        id: 3,
        user: "Alice Johnson",
        rating: 3.8,
        comment:
          "Good shirt, but the color is slightly different from the picture.",
        date: "2023-07-18",
        avatar: "https://via.placeholder.com/40", // User avatar image
      },
    ],
    brand: "Nike",
    category: "Shirts",
    likes: ["user1", "user2", "user3"], // Array of user IDs who liked the product
    totalSold: 120,
    priceHistory: [
      { date: "2023-07-01", oldPrice: 35.99 },
      { date: "2023-06-15", oldPrice: 39.99 },
      { date: "2023-06-01", oldPrice: 45.99 },
    ],
    status: "In Stock", // Product status
    images: {
      main: "https://www.gulahmedshop.com/media/catalog/product/2/9/293312_1_.jpg?optimize=medium&fit=bounds&height=&width=", // Main product image
      thumbnails: [
        "https://www.gulahmedshop.com/media/catalog/product/2/9/293312_5_.jpg?optimize=medium&fit=bounds&height=&width=", // Thumbnail 1
        "https://www.gulahmedshop.com/media/catalog/product/2/9/293312_2_.jpg?optimize=medium&fit=bounds&height=&width=", // Thumbnail 2
        "https://www.gulahmedshop.com/media/catalog/product/2/9/293312_4_.jpg?optimize=medium&fit=bounds&height=&width=", // Thumbnail 3
        "https://www.gulahmedshop.com/media/catalog/product/2/9/293312_5_.jpg?optimize=medium&fit=bounds&height=&width=", // Thumbnail 4
        "https://www.gulahmedshop.com/media/catalog/product/2/9/293312_3_.jpg?optimize=medium&fit=bounds&height=&width=", // Thumbnail 5
      ],
    },
  };

  /*   const {
     title,
     description,
     price,
     discount,
     stock,
     rating,
     reviews,
     brand,
     category,
     likes,
     totalSold,
     priceHistory,
     images, // Added images property
   } = product;
     */

  let {
    title,
    description,
    price,
    discount,
    stock,
    rating,
    reviews,
    brand,
    category,
    likes,
    totalSold,
    priceHistory,
    images, // Added images property
    thumbnail,
  } = productInfo;
  console.log(productInfo);
  // Calculate average rating
  const averageRating = rating;
  // const averageRating =
  //   rating.reduce((acc, curr) => acc + curr, 0) / rating.length;

  // Calculate original price based on discount
  const discountPercentage = Number.parseInt(discount);
  const originalPrice = Math.round(price / (1 - discountPercentage / 100));

  // Price history columns for Ant Design Table
  const priceHistoryColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Old Price",
      dataIndex: "oldPrice",
      key: "oldPrice",
      render: (price) => `$${price.toFixed(2)}`,
    },
  ];

  // Reviews breakdown
  const reviewCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  };

  // reviews.forEach((review) => {
  //   const roundedRating = Math.round(review.rating);
  //   reviewCounts[roundedRating] = (reviewCounts[roundedRating] || 0) + 1;
  // });

  return (
    <div className="product-details-contianer font-sans ">
      {/* Breadcrumb */}
      <div className="breadcrumb py-3 text-base text-gray-600">
        <span>Homepage</span> &gt; <span>Women</span> &gt;{" "}
        <span>Women's Shirts & Tops</span> &gt; <span>{title}</span>
      </div>

      <ProductMainInfo
        id={id}
        images={images}
        thumbnail={thumbnail}
        title={title}
        brand={brand}
        originalPrice={originalPrice}
        price={price}
        stock={stock}
        averageRating={averageRating}
        description={description}
        product={productInfo}
        category={category}
        totalSold={totalSold}
        likes={likes}
      />

      {/* Product Reviews Section */}
      <ProductReviews
        averageRating={averageRating}
        reviews={reviews}
        reviewCounts={reviewCounts}
      />
      {/* Popular This Week Section */}
      <PopularProducts brand={brand} price={price} images={images} />
      <style>
        {`
          .product-details-contianer {
            padding: 3rem 5rem;
            background: ${bgColor};
          }

          .breadcrumb {
            font-size: 1.6rem;
            margin-bottom: 1rem;
          }
        `}
      </style>
    </div>
  );
};

export default ProductDetails;
