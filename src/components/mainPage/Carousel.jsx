// import { FaArrowCircleRight, FaArrowCircleLeft } from 'react-icons/fa';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, EffectCoverflow } from 'swiper/core';

// Swiper의 모듈을 설치합니다.
SwiperCore.use([Navigation, EffectCoverflow]);

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const slideStyle = (index) => ({
    transform: index === activeIndex ? 'translate(30px, 30px)' : 'none',
    transition: 'transform 0.5s ease-in-out',
  });

  return (
    <Swiper
      modules={[Navigation, EffectCoverflow]}
      effect="coverflow"
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 0, // No rotation for simplicity
        stretch: -100, // Negative value to reduce space between slides
        depth: 200, // Depth value for perspective
        modifier: 1, // Effect multiplier
        slideShadows: false, // Disable shadows to match the uploaded image
      }}
      navigation={true}
      onSlideChange={handleSlideChange}
      onSwiper={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      <SwiperSlide style={slideStyle(0)}>
        <img
          src="/assets/testImgs/1.png"
          alt="이미지01"
          style={{ width: '200px', height: '200px' }}
        />
      </SwiperSlide>
      <SwiperSlide style={slideStyle(1)}>
        <img
          src="/assets/testImgs/2.png"
          alt="이미지02"
          style={{ width: '200px', height: '200px' }}
        />
      </SwiperSlide>
      <SwiperSlide style={slideStyle(2)}>
        <img
          src="/assets/testImgs/3.png"
          alt="이미지03"
          style={{ width: '200px', height: '200px' }}
        />
      </SwiperSlide>
      {/* 필요에 따라 추가 슬라이드 */}
    </Swiper>
  );
};

export default Carousel;

// const items: itemsProps[] = [
//   {
//     item: '/assets/testImgs/1.png',
//     name: '이미지01',
//   },
//   {
//     item: '/assets/testImgs/2.png',
//     name: '이미지02',
//   },
//   {
//     item: '/assets/testImgs/3.png',
//     name: '이미지03',
//   },
// ];
