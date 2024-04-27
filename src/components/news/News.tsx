import React from 'react';
import Carousel2 from './Carousel2';
import Carousel3 from './Carousel3';
import Carousel4 from './Carousel4';
import Carousel5 from './Carousel5';
// import Carousel from './Carousel';
import Carousel1 from './Carousel1';

// 불필요한 리렌더링 방지
// const MemoCarousel = React.memo(Carousel);
const MemoCarousel1 = React.memo(Carousel1);
const MemoCarousel2 = React.memo(Carousel2);
const MemoCarousel3 = React.memo(Carousel3);
const MemoCarousel4 = React.memo(Carousel4);
const MemoCarousel5 = React.memo(Carousel5);

function News() {
  return (
    <>
      {/* <MemoCarousel /> */}
      <MemoCarousel1 />
      <MemoCarousel2 />
      <MemoCarousel3 />
      <MemoCarousel4 />
      <MemoCarousel5 iconCategory="FOOD" category="맛집" />
      <MemoCarousel5 iconCategory="CAFE" category="카페" />
      <MemoCarousel5 iconCategory="PHOTOZONE" category="사진스팟" />
    </>
  );
}

export default News;
