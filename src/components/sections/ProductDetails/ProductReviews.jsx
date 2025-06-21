import { Rate, Pagination, Progress, Flex } from "antd";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";
const ProductReviews = ({ averageRating, reviews, reviewCounts }) => {
  const { mainColor, bgColor, textColor } = useContext(ThemeContext);
  const reviewTopics = [
    { id: "product-quality", label: "Product Quality" },
    { id: "seller-services", label: "Seller Services" },
    { id: "product-price", label: "Product Price" },
    { id: "shipment", label: "Shipment" },
    { id: "match-description", label: " Match with Description" },
  ];
  return (
    <div className="reviews-container mb-10">
      <h2 className="reviews-heading font-semibold mb-6">Product Reviews</h2>

      <div className="rating-wrapper flex gap-10 mb-6 p-6 bg-gray-50 rounded-lg">
        <div className="flex flex-col items-center gap-2">
          <Progress
            type="circle"
            percent={averageRating?.toFixed(1)}
            format={() => `${averageRating?.toFixed(1)}`}
            strokeColor={mainColor}
          />

          <Rate disabled defaultValue={averageRating} allowHalf className="" />
          <p className="rating-txt text-gray-600">
            Based on {reviews?.length} reviews
          </p>
        </div>

        {/* REVIEW BARS */}

        <div className="flex-1">
          {[3, 4, 3, 2, 5].map((star) => (
            // <div key={star} className="flex items-center gap-2 mb-2">
            //   <span className="text-sm text-gray-600 w-6">{star}.0</span>
            //   <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
            //     <div
            //       className="h-full bg-yellow-400"
            //       style={{
            //         width: `${(reviewCounts[star] / reviews.length) * 100}%`,
            //       }}
            //     ></div>
            //   </div>
            //   <span className="text-sm text-gray-600">
            //     {reviewCounts[star]}
            //   </span>
            // </div>
            <Progress
              percent={(star / 5) * 100}
              format={() => `${star}.0`}
              strokeColor={mainColor}
            />
          ))}
        </div>
      </div>
      {/* ====== REVIEW FILTERS & REVIEW TOPICS ======    */}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-60">
          <h3 className="review-filter-heading font-semibold mb-4">
            Reviews Filter
          </h3>
          {/* BUTTONS TO RATE VIA STAR */}
          <div className="mb-6">
            <h4 className="rating text-sm font-semibold mb-3">Rating</h4>
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id={`star-${star}`}
                  className="rate-btn"
                />
                <label
                  htmlFor={`star-${star}`}
                  className="rate-btn-label text-gray-800"
                >
                  {star} ★
                </label>
              </div>
            ))}
          </div>
          {/* REVIEW TOPICS */}
          <div className="mb-6">
            <h4 className="review-topics-heading font-semibold mb-3">
              Review Topics
            </h4>

            {reviewTopics.map((topic) => (
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  id={topic.id}
                  className="review-topic-btn"
                />
                <label
                  htmlFor={topic.id}
                  className="review-topics-label text-gray-800"
                >
                  {topic.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex border-b border-gray-200 mb-6">
            <div className="px-4 py-3 topic-heading border-b-2 border-black font-semibold">
              All Reviews
            </div>
            <div className="px-4 py-3 topic-heading cursor-pointer">
              With Photo & Video
            </div>
            <div className="px-4 py-3 topic-heading cursor-pointer">
              With Description
            </div>
          </div>

          <div className="flex gap-10">
            {reviews?.map((review) => (
              <div
                key={review.id}
                className="reviews-star-wrapper py-6 border-b border-gray-200"
              >
                <div className="mb-3">
                  <Rate
                    disabled
                    defaultValue={review.rating}
                    allowHalf
                    className=""
                  />
                </div>
                <div className="mb-4">
                  <p className="topic-desc leading-relaxed text-gray-800 mb-2">
                    This is amazing product! I love it.
                  </p>
                  <p className="topic-date text-gray-500">
                    July 23, 2023 03:45 PM
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  {/* <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src="/placeholder.svg?height=40&width=40"
                      alt={review.user}
                      className="w-full h-full object-cover"
                    />
                  </div> */}
                  <div className="review-user uppercase font-semibold">
                    {review.user}
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1 topic-like text-gray-600">
                    <span>👍</span> 123
                  </button>
                  <button className="flex items-center gap-1 topic-unlike text-gray-600">
                    <span>👎</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* <div className="mt-6 flex justify-center">
            <Pagination defaultCurrent={1} total={50} />
          </div> */}
        </div>
      </div>
      <style>
        {`
          .reviews-container,
          .rating-wrapper {
            background: ${bgColor};
          }

          .reviews-container,
          .rating-wrapper,
          .rating-txt,
          .ant-progress-text,
          .rate-btn-label,
          .review-topics-label,
          .topic-desc {
            color: ${textColor} !important;
          }
          .reviews-heading {
            font-size: 3rem;
          }

          .review-filter-heading {
            font-size: 2rem;
          }
          .rating,
          .rating-txt,
          .rate-btn-label,
          .review-topics-heading,
          .topic-like,
          .topic-unlike {
            font-size: 1.6rem;
          }
          .topic-desc {
            font-size: 1.8rem;
          }
          .rate-btn,
          .review-topic-btn {
            width: 1.6rem;
            height: 1.6rem;
          }
          .review-topics-label,
          .topic-heading,
          .topic-date,
          .review-user {
            font-size: 1.5rem;
          }
          .ant-progress-circle {
            background: rgba(27, 31, 35, 0.4) !important;
          }
          .ant-progress-circle-inner {
            background: red !important;
          }
          :is(.rating, .rating-wrapper, .reviews-star-wrapper)
            .ant-rate-star
            div {
            color: ${mainColor} !important;
          }
        `}
      </style>
    </div>
  );
};
export default ProductReviews;
