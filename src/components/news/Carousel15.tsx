import { useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useGetAllPostsByDistrict } from '@/api/news';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';

function Carousel() {
  const { data } = useGetAllPostsByDistrict('중구');
  const [centerSlideIndex, setCenterSlideIndex] = useState(0);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    beforeChange: (current: number, next: number) => setCenterSlideIndex(next),
    arrows: false,
    centerPadding: '0px',
  };

  const slickRef = useRef<Slider | null>(null);

  const previous = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickPrev();
    }
  }, [slickRef]);

  const next = useCallback(() => {
    if (slickRef.current) {
      slickRef.current.slickNext();
    }
  }, [slickRef]);

  return (
    <CarouselContainer>
      <StyledSlider ref={slickRef} {...settings}>
        {data?.content.map((item: PostItem, idx: number) => (
          <ImageContainer key={idx}>
            <StyledDiv
              $isCenter={idx === centerSlideIndex}
              $position={
                idx < centerSlideIndex
                  ? 'left'
                  : idx > centerSlideIndex
                    ? 'right'
                    : 'center'
              }
            >
              {idx !== centerSlideIndex && (
                <>
                  {idx < centerSlideIndex && (
                    <TextContainer $position="top">
                      <div>
                        <LeftDivSpan>이번주 우리동네</LeftDivSpan>
                        <LeftDivSpan>인기글을 모아봤어요!</LeftDivSpan>
                      </div>
                    </TextContainer>
                  )}
                  {idx > centerSlideIndex && (
                    <TextContainer $position="bottom">
                      <div>
                        <IoArrowBackCircleOutline onClick={previous} />
                        <IoArrowForwardCircleOutline onClick={next} />
                      </div>
                    </TextContainer>
                  )}
                </>
              )}
              <Post
                $backgroundImage={item.imageUrls[0]}
                $isCenter={idx === centerSlideIndex}
              />
            </StyledDiv>
          </ImageContainer>
        ))}
      </StyledSlider>
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
    transition: transform 0.3s ease-out;
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

const TextContainer = styled.div<{ $position: 'top' | 'bottom' }>`
  position: absolute;
  width: 100%;
  top: ${(props) => (props.$position === 'top' ? '0' : 'auto')};
  bottom: ${(props) => (props.$position === 'bottom' ? '0' : 'auto')};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  div {
    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: grey;
      cursor: pointer;
    }
  }
`;

const StyledDiv = styled.div<{
  $isCenter: boolean;
  $position: 'left' | 'center' | 'right';
}>`
  height: 336px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const LeftDivSpan = styled.span`
  font-size: 0.9rem;
  display: block;
`;
