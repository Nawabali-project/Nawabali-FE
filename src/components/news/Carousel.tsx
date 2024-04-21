import React, { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useGetAllPostsByDistrictOrCategory } from '@/api/news';
import * as s from './CasouselStyle';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import { PostItem } from '@/interfaces/main/news.interface';

function Carousel() {
  const userDistrict = localStorage.getItem('district')!;
  const { data } = useGetAllPostsByDistrictOrCategory(userDistrict);
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 7;
  const actualSlides = data?.content.length || 0;
  const emptySlidesCount = Math.max(0, totalSlides - actualSlides);

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    beforeChange: (oldIndex: number, newIndex: number) => {
      console.log('Changing from', oldIndex, 'to', newIndex);
      setCurrentSlide(newIndex);
    },
    arrows: false,
    centerPadding: '0px',
  };

  const slickRef = useRef<Slider | null>(null);

  const centerIndex = currentSlide;

  const previous = useCallback(() => {
    if (slickRef.current) {
      console.log('Current Slide before prev:', currentSlide);
      slickRef.current.slickPrev();
    }
  }, [currentSlide]);

  const next = useCallback(() => {
    if (slickRef.current) {
      console.log('Current Slide before next:', currentSlide);
      slickRef.current.slickNext();
    }
  }, [currentSlide]);

  const MemoizedPost = React.memo(Post, (prevProps, nextProps) => {
    return (
      prevProps.$backgroundImage === nextProps.$backgroundImage &&
      prevProps.$isCenter === nextProps.$isCenter
    );
  });

  return (
    <CarouselContainer>
      <s.Col>
        <s.TitleSpan>이번주 우리동네</s.TitleSpan>
        <s.TitleSpan>인기글을 모아봤어요!</s.TitleSpan>
        <s.Row>
          <span style={{ fontSize: '10px' }}>0{currentSlide + 1}</span>
          <BarContainer style={{ margin: '0 5px' }}>
            <Progress $index={currentSlide + 1} />
          </BarContainer>
          <span style={{ fontSize: '10px' }}>07</span>
        </s.Row>{' '}
      </s.Col>
      <StyledSlider ref={slickRef} {...settings}>
        {data?.content.map((item: PostItem, idx: number) => {
          const isCenter = idx === centerIndex;
          console.log(
            `Real Post - Index: ${idx}, Current Slide: ${currentSlide}, Is Center: ${isCenter}`,
          );
          return (
            <ImageContainer key={idx}>
              <MemoizedPost
                $backgroundImage={item.imageUrls[0]}
                $isCenter={isCenter}
              />
            </ImageContainer>
          );
        })}
        {[...Array(emptySlidesCount)].map((_, idx) => {
          const emptyIndex = idx + actualSlides;
          const isCenter = emptyIndex === centerIndex;
          console.log(
            `Empty Post - Index: ${emptyIndex}, Current Slide: ${currentSlide}, Is Center: ${isCenter}`,
          );
          return (
            <ImageContainer key={`empty-${idx}`}>
              <EmptyPost $isCenter={isCenter}>
                <span style={{ fontSize: '13px', color: '#616161' }}>
                  아직 TOP7의 자리가 남아있습니다!
                </span>
              </EmptyPost>
            </ImageContainer>
          );
        })}
      </StyledSlider>
      <Arrows>
        <IoArrowBackCircleOutline onClick={previous} />
        <IoArrowForwardCircleOutline onClick={next} />
      </Arrows>
    </CarouselContainer>
  );
}

export default Carousel;

const CarouselContainer = styled.div`
  position: relative;
  width: 722px;
  height: 350px;
  margin: 0 auto;
`;

const StyledSlider = styled(Slider)`
  margin: 0 auto;
  height: 400px;
  width: 722px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  .slick-list {
    height: 3;
  }
  .slick-slide {
    transition:
      transform 0.3s ease-out,
      width 0.3s ease-out,
      height 0.3s ease-out;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px;
`;

const Post = styled.div<{ $backgroundImage: string; $isCenter: boolean }>`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  width: ${(props) => (props.$isCenter ? '240px' : '180px')};
  height: ${(props) => (props.$isCenter ? '336px' : '252px')};
  display: block;
  border-radius: 20px;
  margin: 0;
  transition: all 0.3s ease-in-out;
`;

const EmptyPost = styled.div<{ $isCenter: boolean }>`
  width: ${(props) => (props.$isCenter ? '240px' : '180px')};
  height: ${(props) => (props.$isCenter ? '336px' : '252px')};
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Arrows = styled.div`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: grey;
    cursor: pointer;
  }
`;

const Progress = styled.div<{ $index: number }>`
  width: ${(props) => 15 * props.$index}px;
  height: 2px;
  background-color: black;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.5s ease-in-out;
`;

const BarContainer = styled.div`
  width: 105px;
  height: 2px;
  border-radius: 3px;
  background-color: #bebebe;
  position: relative;
  margin: 15px 0;
`;
