import Carousel2 from './Carousel2';
import Carousel3 from './Carousel3';
import Carousel4 from './Carousel4';
import Carousel5 from './Carousel5';
import Carousel from './Carousel';

function News() {
  return (
    <>
      <Carousel />
      <Carousel2 />
      <Carousel3 />
      <Carousel4 />
      <Carousel5 iconCategory="FOOD" category="맛집" />
      <Carousel5 iconCategory="CAFE" category="카페" />
      <Carousel5 iconCategory="PHOTOZONE" category="사진스팟" />
    </>
  );
}

export default News;
