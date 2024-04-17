import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useGetAllPostsByDistrict } from '@/api/news';
import { useCallback, useRef } from 'react';

interface Carousel5Props {
  iconCategory: string;
  category: string;
}

function Carousel5({ iconCategory, category }: Carousel5Props) {
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
        <div
          style={{ width: '720px', display: 'flex', flexDirection: 'column' }}
        >
          <div>
            <div>
              <img
                src={`/assets/svgs/${iconCategory}Icon.svg`}
                alt={`${iconCategory} Icon`}
                style={{ height: '30px', verticalAlign: 'middle' }}
              />
              <span>{category}의 중심</span>
            </div>
            <p>중구 {category} 구경하기</p>
            <span>
              중구는 한 달간 {category} 게시물이 798개 작성되어 {category}{' '}
              동네로 선정되었어요!
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <span>게시글 전체보기</span>
                <img
                  src="/assets/svgs/arrowIcon.svg"
                  alt="Arrow Icon"
                  style={{ height: '6px', marginBottom: '6px' }}
                />
              </div>
              <Arrows>
                <IoArrowBackCircleOutline onClick={previous} />
                <IoArrowForwardCircleOutline onClick={next} />
              </Arrows>
            </div>
          </div>
        </div>
      </div>
      <StyledSlider ref={slickRef} {...settings}>
        {data?.content
          .concat(data.content)
          .map((item: PostItem, idx: number) => (
            <ImageContainer key={idx}>
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

export default Carousel5;

const ImageContainer = styled.div`
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
  height: 400px;
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
