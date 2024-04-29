import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as s from './CasouselStyle';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import { FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa';
import { useGetAllPostsByDistrictOrCategory } from '@/api/news';
import { useCallback, useRef, useState } from 'react';
import { PostItem } from '@/interfaces/main/news.interface';

const getRandomSVGName = () => {
  const svgNames = ['FOOD', 'CAFE', 'PHOTOZONE'];
  const randomIndex = Math.floor(Math.random() * svgNames.length);
  return svgNames[randomIndex];
};
const iconCategory = getRandomSVGName();

function Carousel1() {
  const userDistrict = localStorage.getItem('district')!;
  const { data } = useGetAllPostsByDistrictOrCategory(
    userDistrict,
    undefined,
    7,
  );
  const [isHovering, setIsHovering] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slickRef = useRef<Slider | null>(null);

  const totalSlides = 9;
  const actualSlides = data?.content.length || 0;
  const emptySlidesCount = Math.max(0, totalSlides - actualSlides);

  const previous = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickPrev();
    }
  }, []);

  const next = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickNext();
    }
  }, []);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    beforeChange: (newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <s.Wrapper
      style={{
        height: '350px',
        marginTop: '50px',
        backgroundColor: '#FAFAFA',
        paddingTop: '25px',
      }}
    >
      <s.Row
        style={{
          justifyContent: 'center',
        }}
      >
        <s.Col style={{ width: '215px' }}>
          <div>
            <s.Col>
              <s.TitleSpan>이번주 우리동네</s.TitleSpan>
              <s.TitleSpan>인기글을 모아봤어요!</s.TitleSpan>
            </s.Col>
          </div>
          <s.Row>
            <span style={{ fontSize: '12px' }}>0{currentSlide + 1}</span>
            <s.BarContainer>
              <s.Progress $index={currentSlide + 1} />
            </s.BarContainer>
            <span style={{ marginLeft: '3px', fontSize: '12px' }}>07</span>
            {isHovering ? (
              <FaRegStopCircle
                style={{ marginLeft: '3px', fontSize: '15px' }}
                className="stop-icon"
              />
            ) : (
              <FaRegPlayCircle
                style={{ marginLeft: '3px', fontSize: '15px' }}
                className="play-icon"
              />
            )}
          </s.Row>
          <s.Arrows style={{ marginTop: '12px', marginLeft: '-3px' }}>
            <IoArrowBackCircleOutline onClick={previous} />
            <IoArrowForwardCircleOutline onClick={next} />
          </s.Arrows>
        </s.Col>
        <s.StyledSliderWithGreyBackground ref={slickRef} {...settings}>
          {data?.content.map((item: PostItem, idx: number) => (
            <s.ImageContainer key={idx}>
              <s.PostWithGreyBackground
                $backgroundImage={item.mainImageUrl}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </s.ImageContainer>
          ))}
          {[...Array(emptySlidesCount)].map((_, idx) => (
            <s.ImageContainer key={`empty-${idx}`}>
              <s.EmptyPostWithGreyBackground
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img src={`/assets/svgs/noPost${iconCategory}.svg`} />
              </s.EmptyPostWithGreyBackground>
            </s.ImageContainer>
          ))}
        </s.StyledSliderWithGreyBackground>
      </s.Row>
    </s.Wrapper>
  );
}

export default Carousel1;
