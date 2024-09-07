import category1 from "../assets/images/category1.jpg"
import category2 from "../assets/images/category2.jpg"
import category3 from "../assets/images/category3.jpg"
import category4 from "../assets/images/category4.jpg"
function Catogaries() {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        {/* MAIN HEADING */}
        <div className="text-center mb-10 flex justify-center items-center flex-col">
          <h1 className="mainHeading catogariesHeading capitalize relative w-fit sm:text-3xl text-2xl font-medium text-center title-font text-gray-900 mb-7">
            Shop by categories
          </h1>
          <p className="catogariesPara text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">
            Blue bottle crucifix vinyl post-ironic four dollar toast vegan
            taxidermy. Gastropub indxgo juice poutine, ramps microdosing banh mi
            pug.
          </p>
        </div>
        {/* CATOGARIES CARDS */}
        <div className="flex flex-wrap -m-4">
          {/* 1ST */}
          <div className="catogariesCard cursor-pointer p-4 lg:w-1/4 sm:w-1/2 w-full">
            <div className="catogariesImgCover rounded-lg h-80 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full transition-all duration-100 ease-linear "
                src={category1}
              />
            </div>
            <h2 className="catogariesSubHeading uppercase title-font text-center font-medium text-gray-900 mt-6 mb-1">
              Skirts & Dresses
            </h2>
            <p className="leading-relaxed text-base text-center">9 Products</p>
          </div>
          {/* 2ND */}
          <div className="catogariesCard cursor-pointer p-4 lg:w-1/4 sm:w-1/2 w-full">
            <div className="catogariesImgCover rounded-lg h-80 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full transition-all duration-100 ease-linear "
                src={category2}
              />
            </div>
            <h2 className="catogariesSubHeading uppercase title-font text-center font-medium text-gray-900 mt-6 mb-1">
              Trousers & Jeans
            </h2>
            <p className="leading-relaxed text-base text-center">9 Products</p>
          </div>
          {/* 3RD */}
          <div className="catogariesCard cursor-pointer p-4 lg:w-1/4 sm:w-1/2 w-full">
            <div className="catogariesImgCover rounded-lg h-80 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full transition-all duration-100 ease-linear "
                src={category3}
              />
            </div>
            <h2 className="catogariesSubHeading uppercase title-font text-center font-medium text-gray-900 mt-6 mb-1">
              Bag & Backpacks
            </h2>
            <p className="leading-relaxed text-base text-center">9 Products</p>
          </div>
          {/* 4RTH */}
          <div className="catogariesCard cursor-pointer p-4 lg:w-1/4 sm:w-1/2 w-full">
            <div className="catogariesImgCover rounded-lg h-80 overflow-hidden">
              <img
                alt="content"
                className="object-cover object-center h-full w-full transition-all duration-100 ease-linear "
                src={category4}
              />
            </div>
            <h2 className="catogariesSubHeading uppercase title-font text-center font-medium text-gray-900 mt-6 mb-1">
              Shoes & Sandals
            </h2>
            <p className="leading-relaxed text-base text-center">9 Products</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Catogaries;
