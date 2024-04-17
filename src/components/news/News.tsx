// import Carousel from './Carousel';
import Carousel2 from './Carousel2';
import Carousel3 from './Carousel3';
import Carousel4 from './Carousel4';
import Carousel5 from './Carousel5';
import Carousel15 from './Carousel15';

function News() {
  return (
    <>
      {/* <Carousel /> */}
      <Carousel15 />
      <Carousel2 />
      <Carousel3 />
      <Carousel4 />
      <Carousel5 iconCategory="food" category="맛집" />
      <Carousel5 iconCategory="cafe" category="카페" />
      <Carousel5 iconCategory="photo" category="사진스팟" />
    </>
  );
}

export default News;
