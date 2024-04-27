import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as s from './CasouselStyle';
import styled from 'styled-components';
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

  const totalSlides = 7;
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
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    initialSlide: 0,
    beforeChange: (newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <div style={{ height: '300px', backgroundColor: '#FAFAFA' }}>
      <s.Container>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <s.Col>
            <div>
              <s.Col style={{ marginBottom: '10px' }}>
                <s.TitleSpan style={{ fontSize: '18px' }}>
                  이번주 우리동네
                </s.TitleSpan>
                <s.TitleSpan style={{ fontSize: '18px' }}>
                  인기글을 모아봤어요!
                </s.TitleSpan>
              </s.Col>
            </div>
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
            <Arrows style={{ marginTop: '10px' }}>
              <IoArrowBackCircleOutline onClick={previous} />
              <IoArrowForwardCircleOutline onClick={next} />
            </Arrows>
          </s.Col>
          <StyledSlider ref={slickRef} {...settings}>
            {data?.content.map((item: PostItem, idx: number) => (
              <ImageContainer key={idx}>
                <Post
                  $backgroundImage={item.mainImageUrl}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                />
              </ImageContainer>
            ))}
            {[...Array(emptySlidesCount)].map((_, idx) => (
              <ImageContainer key={`empty-${idx}`}>
                <EmptyPost
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <img src={`/assets/svgs/noPost${iconCategory}.svg`} />
                </EmptyPost>
              </ImageContainer>
            ))}
          </StyledSlider>
        </div>
      </s.Container>
    </div>
  );
}

export default Carousel1;

const ImageContainer = styled.div<{ isCenter?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${(props) => (props.isCenter ? '0 0px' : '0')};

  p {
    text-decoration: none;
    text-align: left;
    margin: 0;
  }
`;

const EmptyPost = styled.div`
  width: 170px;
  height: 238px;
  border: 1px solid #e2e2e2;
  background-color: #e1e1e1;
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;

  img {
    width: 150px;
  }
`;

const StyledSlider = styled(Slider)`
  margin: 0 0 0 30px;
  padding-top: 30px;
  width: 530px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

export const Post = styled.div<{
  $backgroundImage: string;
}>`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  width: 170px;
  height: 238px;
  display: block;
  border-radius: 20px;
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
  height: 1px;
  background-color: black;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.5s ease-in-out;
`;

const BarContainer = styled.div`
  width: 105px;
  height: 1px;
  background-color: #bebebe;
  border-radius: 3px;
  position: relative;
  margin: 15px 0;
`;
