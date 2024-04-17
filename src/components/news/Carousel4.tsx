import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import { useGetAllPostsByDistrict } from '@/api/news';
import { useCallback, useRef } from 'react';

function Carousel4() {
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
      <div
        style={{
          // border: '1px solid pink',
          width: '720px',
          margin: '50px auto 0',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <span style={{ fontSize: '10px' }}>우리동네 대표 카테고리</span>
              <p>
                서교동은 카페가
                <br />
                활성화 된 동네예요!
              </p>
            </div>
            <span style={{ fontSize: '9px' }}>
              한 달간 작성된 게시물을 분석한 결과
            </span>
            <span style={{ fontSize: '9px', fontWeight: '500' }}>
              맛집 184개 | 카페 324개 | 사진스팟 89개
            </span>
            <span style={{ fontSize: '9px' }}>의 게시물이 올라왔어요!</span>
            <span style={{ fontSize: '9px', textDecoration: 'underLine' }}>
              게시물 보러가기
            </span>
            <Arrows>
              <IoArrowBackCircleOutline onClick={previous} />
              <IoArrowForwardCircleOutline onClick={next} />
            </Arrows>
          </div>
          <StyledSlider ref={slickRef} {...settings}>
            {data?.content
              .concat(data.content)
              .map((item: PostItem, idx: number) => (
                <ImageContainer key={idx}>
                  <Post $backgroundImage={item.imageUrls[0]} />
                </ImageContainer>
              ))}
          </StyledSlider>
        </div>
      </div>
    </>
  );
}

export default Carousel4;

const ImageContainer = styled.div<{ isCenter?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${(props) => (props.isCenter ? '0 10px' : '0')};

  p {
    text-decoration: none;
    text-align: left;
    margin: 0;
  }
`;

const StyledSlider = styled(Slider)`
  margin: 0 auto;
  height: 400px;
  width: 550px;
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
  width: 180px;
  height: 240px;
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
