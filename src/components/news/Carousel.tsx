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
import { FaRegPlayCircle, FaRegStopCircle } from 'react-icons/fa';
import { PostItem } from '@/interfaces/main/news.interface';

function Carousel() {
  const userDistrict = localStorage.getItem('district')!;
  const { data } = useGetAllPostsByDistrictOrCategory(
    userDistrict,
    undefined,
    7,
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  const totalSlides = 7;
  const actualSlides = data?.content.length || 0;
  const emptySlidesCount = Math.max(0, totalSlides - actualSlides);

  const [isHovering, setIsHovering] = useState(false);

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (oldIndex: number, newIndex: number) => {
      setCurrentSlide(newIndex);
    },
    arrows: false,
    centerPadding: '0px',
  };

  const slickRef = useRef<Slider | null>(null);

  const centerIndex = currentSlide + 1;

  const previous = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickPrev();
    }
  }, [currentSlide]);

  const next = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickNext();
    }
  }, [currentSlide]);

  const MemoizedPost = React.memo(Post, (prevProps, nextProps) => {
    return (
      prevProps.$backgroundImage === nextProps.$backgroundImage &&
      prevProps.$isCenter === nextProps.$isCenter &&
      prevProps.$position === nextProps.$position
    );
  });

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const getRandomSVGName = () => {
    const svgNames = ['FOOD', 'CAFE', 'PHOTOZONE'];
    const randomIndex = Math.floor(Math.random() * svgNames.length);
    return svgNames[randomIndex];
  };
  const iconCategory = getRandomSVGName();

  return (
    <div style={{ backgroundColor: '#fafafa' }}>
      <Container>
        <StyledCol>
          <s.TitleSpan>이번주 우리동네</s.TitleSpan>
          <s.TitleSpan>인기글을 모아봤어요!</s.TitleSpan>
          <s.Row>
            <span style={{ fontSize: '10px' }}>0{currentSlide + 1}</span>
            <BarContainer style={{ margin: '0 5px' }}>
              <Progress $index={currentSlide + 1} />
            </BarContainer>
            <span style={{ marginLeft: '3px', fontSize: '10px' }}>07</span>
            {isHovering ? (
              <FaRegStopCircle
                style={{ marginLeft: '3px', fontSize: '12px' }}
                className="stop-icon"
              />
            ) : (
              <FaRegPlayCircle
                style={{ marginLeft: '3px', fontSize: '12px' }}
                className="play-icon"
              />
            )}
          </s.Row>
        </StyledCol>
        <CarouselContainer>
          <StyledSlider ref={slickRef} {...settings}>
            {data?.content.map((item: PostItem, idx: number) => {
              const isCenter = idx === centerIndex;
              const position =
                idx < centerIndex
                  ? 'left'
                  : idx > centerIndex
                    ? 'right'
                    : 'center';
              return (
                <ImageContainer key={idx}>
                  <MemoizedPost
                    $backgroundImage={item.mainImageUrl}
                    $isCenter={isCenter}
                    $position={position}
                    $currentSlide={currentSlide}
                    $index={idx}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  />
                </ImageContainer>
              );
            })}
            {[...Array(emptySlidesCount)].map((_, idx) => {
              const emptyIndex = actualSlides + idx;
              const isCenter = emptyIndex === centerIndex;
              const position =
                emptyIndex < centerIndex
                  ? 'left'
                  : emptyIndex > centerIndex
                    ? 'right'
                    : 'center';
              return (
                <ImageContainer key={`empty-${emptyIndex}`}>
                  <EmptyPost
                    $isCenter={isCenter}
                    $position={position}
                    $currentSlide={currentSlide}
                    $index={emptyIndex}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <img src={`/assets/svgs/noPost${iconCategory}.svg`} />
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
      </Container>
    </div>
  );
}

export default Carousel;

const Container = styled.div`
  width: 722px;
  padding-top: 30px;
  position: relative;
  margin: 0 auto;
`;

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 722px;
  height: 320px;
  margin: 0 auto;
`;

const StyledSlider = styled(Slider)`
  margin: 0 auto;
  height: 300px;
  width: 720px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  .slick-slide {
    transition:
      transform 0.3s ease-out,
      width 0.3s ease-out,
      height 0.3s ease-out;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  margin: 0 auto;
`;

const Post = styled.div<{
  $backgroundImage: string;
  $isCenter: boolean;
  $position: string;
  $currentSlide: number;
  $index: number;
}>`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  position: absolute;
  width: ${(props) => (props.$isCenter ? '200px' : '150px')};
  height: ${(props) => (props.$isCenter ? '280px' : '210px')};
  display: block;
  border-radius: 20px;
  transition: all 0.3s ease-in-out;

  ${(props) =>
    props.$currentSlide === 5 &&
    props.$index === 0 &&
    `
    top: 0px !important;
    right: 0px !important;
  `}
  ${(props) =>
    props.$currentSlide === 6 &&
    props.$index === 0 &&
    `
width: 200px !important;
height: 280px !important;
top: 0px !important;
    right: 20px !important;
  `}
  ${(props) =>
    props.$currentSlide === 6 &&
    props.$index === 1 &&
    `
    top: 0px !important;
    right: 0px !important;
  `}

  ${(props) =>
    props.$position === 'left' &&
    `
    top: 70px;
    right: 90px;
  `}

  ${(props) =>
    props.$position === 'center' &&
    `
    right: 20px;
  `}

  ${(props) =>
    props.$position === 'right' &&
    `
    top: 0px;
    right: 0px;
  `}

  &:hover {
    .play-icon {
      visibility: hidden;
    }
    .stop-icon {
      visibility: visible;
    }
  }
`;

const EmptyPost = styled.div<{
  $isCenter: boolean;
  $position: string;
  $currentSlide: number;
  $index: number;
}>`
  width: ${(props) => (props.$isCenter ? '200px' : '150px')};
  height: ${(props) => (props.$isCenter ? '280px' : '210px')};
  border-radius: 20px;
  border: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  ${(props) =>
    props.$currentSlide === 5 &&
    props.$index === 0 &&
    `
    top: 0px !important;
    right: 0px !important;
  `}
  ${(props) =>
    props.$currentSlide === 6 &&
    props.$index === 0 &&
    `
width: 200px !important;
height: 280px !important;
top: 0px !important;
    right: 20px !important;
  `}
  ${(props) =>
    props.$currentSlide === 6 &&
    props.$index === 1 &&
    `
    top: 0px !important;
    right: 0px !important;
  `}

  ${(props) =>
    props.$position === 'left' &&
    `
    top: 70px;
    right: 90px;
  `}

  ${(props) =>
    props.$position === 'center' &&
    `
    right: 20px;
  `}

  ${(props) =>
    props.$position === 'right' &&
    `
    top: 0px;
    right: 0px;
  `}

  &:hover {
    .play-icon {
      visibility: hidden;
    }
    .stop-icon {
      visibility: visible;
    }
  }

  img {
    width: 150px;
  }
`;

const Arrows = styled.div`
  position: absolute;
  right: 100px;
  bottom: 80px;
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
