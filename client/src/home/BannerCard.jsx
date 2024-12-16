import React from "react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "./BannerCard.css";

import book1 from "./../assets/books/book1.jpg";
import book3 from "./../assets/books/book3.jpg";
import book4 from "./../assets/books/book4.jpg";

const BannerCard = () => {
  return (
    <div className="banner">
      <Swiper
        effect={"coverflow"}
        spaceBetween={70}
        grabCursor={false}
        initialSlide={2}
        centeredSlides={true}
        loop={true}
        breakpoints={{
          320: { spaceBetween: 40 },
          640: { spaceBetween: 20 },
          1024: { spaceBetween: 50 },
          1280: { spaceBetween: 70 },
        }}
        allowTouchMove={false}
        slidesPerView={"auto"} // Show 3 slides in view
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          reverseDirection: true,
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src={book1} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={book3} alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={book4} alt="slide_image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerCard;
