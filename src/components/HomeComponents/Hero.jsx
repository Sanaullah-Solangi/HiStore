import HeroImg from "../../assets/images/sample-3.jpg";
import slide2 from "../../assets/images/slide2.jpg";
import slide3 from "../../assets/images/slide3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFade, Pagination, Navigation, Autoplay } from "swiper/modules";
function Hero() {
  return (
    <section className="hero-container  w-screen text-gray-600">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={"fade"}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[EffectFade, Navigation, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={HeroImg} className="h-full" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} className="h-full" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide3} className="h-full" alt="" />
        </SwiperSlide>
      </Swiper>

      <style jsx global>{`
        .hero-container {
          padding: 0 !important;
        }
        .hero-container .swiper .swiper-button-next {
          right: 2% !important;
        }
        .hero-container .swiper-slide {
          height: 85vh !important;
          overflow: hidden;
        }

        @media (width < 745px) {
          .hero-container .swiper-slide {
            height: 30rem !important;
          }
        }
      `}</style>
    </section>
  );
}
export default Hero;
