import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import * as s from './CasouselStyle';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useGetAllPostsByDistrict } from '@/api/news';
import { useCallback, useRef } from 'react';
import { PostItem } from '@/interfaces/main/news.interface';

function Carousel2() {
  // const { data } = useGetAllPostsByDistrict(district);
  const { data } = useGetAllPostsByDistrict('중구');
  const slickRef = useRef<Slider | null>(null);

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

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <s.Container>
        <div
          style={{ width: '720px', display: 'flex', flexDirection: 'column' }}
        >
          <s.TitleSpan>일주일간 사람들이 많이 찾은 곳이에요!</s.TitleSpan>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <FaMapMarkerAlt />
              <s.InnerSpan>서울특별시 서초구</s.InnerSpan>
              <IoIosArrowDown />
              <s.InnerSpan>전체</s.InnerSpan>
              <IoIosArrowDown />
            </div>
            <Arrows>
              <IoArrowBackCircleOutline onClick={previous} />

              <IoArrowForwardCircleOutline onClick={next} />
            </Arrows>
          </div>
        </div>
      </s.Container>
      <StyledSlider ref={slickRef} {...settings}>
        {data?.content
          .concat(data.content)
          .map((item: PostItem, idx: number) => (
            <ImageContainer key={idx} $isCenter={idx === 1}>
              <Post $backgroundImage={item.imageUrls[0]} />
              <p>파스타앤코</p>
              <p style={{ fontSize: '13px' }}>
                서울특별시 연남동 48-7 1층
                <FaMapMarkerAlt />
              </p>
              <p style={{ fontSize: '10px', textDecoration: 'underLine' }}>
                게시물 보러가기
              </p>
            </ImageContainer>
          ))}
      </StyledSlider>
    </>
  );
}

export default Carousel2;

const ImageContainer = styled.div<{ $isCenter?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    text-decoration: none;
    text-align: left;
    margin: 0;
  }
`;

const StyledSlider = styled(Slider)`
  margin: 0 auto;
  height: 300px;
  width: 722px;
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
  width: 234px;
  height: 234px;
  display: block;
  border-radius: 20px 0 20px 0;
`;

const Arrows = styled.div`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: grey;
    cursor: pointer;
  }
`;
