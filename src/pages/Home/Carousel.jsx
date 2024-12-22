import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import './carousel.css'
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import slide3 from "../../assets/sliderImg/slider1.jpg";
import slide4 from "../../assets/sliderImg/slider2.jpg";
import slide5 from "../../assets/sliderImg/slider3.jpg";
import slide6 from "../../assets/sliderImg/slider1.jpg";

const Banner = () => {
  return (
    <div className="z-0">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {/* slider 1 */}
        <SwiperSlide>
          <div
            className="hero h-[600px] slider slider1"
           
          >
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-lg">
                <h1 className="mb-5 text-5xl font-bold">Healthcare Volunteers Needed</h1>
                <p className="mb-5">
                Join us to help provide medical aid in underserved communities.
                </p>
                <p>New York, USA</p>
            
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* slider 2 */}
        <SwiperSlide>
          <div
            className="hero h-[600px] slider slider2"
           
          >
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-lg">
                <h1 className="mb-5 text-5xl font-bold">Education Support for Children</h1>
                <p className="mb-5">
                Help children learn and grow through tutoring and mentorship.
                </p>
                <p>California, USA</p>
            
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* slider 3 */}
        <SwiperSlide>
          <div
            className="hero h-[600px] slider slider3"
           
          >
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-lg">
                <h1 className="mb-5 text-5xl font-bold">Animal Welfare Volunteers</h1>
                <p className="mb-5">
                Support animal rescue efforts and help care for abandoned pets.
                </p>
                <p>Texas, USA</p>
            
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* slider 4 */}
        <SwiperSlide>
          <div
            className="hero h-[600px] slider slider4"
           
          >
            <div className="hero-overlay bg-opacity-30"></div>
            <div className="hero-content text-neutral-content text-center">
              <div className="max-w-lg">
                <h1 className="mb-5 text-5xl font-bold">Environmental Cleanup Campaign</h1>
                <p className="mb-5">
                Volunteer to protect the environment by cleaning up local parks.
                </p>
                <p>Florida, USA</p>
            
              </div>
            </div>
          </div>
        </SwiperSlide>
     
      </Swiper>
    </div>
  );
};

export default Banner;
