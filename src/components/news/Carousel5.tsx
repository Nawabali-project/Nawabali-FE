import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as s from './CasouselStyle';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  useGetAllPostsByDistrictOrCategory,
  useGetCountOfPostsByDistrict,
} from '@/api/news';
import { useCallback, useRef } from 'react';
import { CarouselProps, PostItem } from '@/interfaces/main/news.interface';

function Carousel5({ iconCategory, category }: CarouselProps) {
  const slickRef = useRef<Slider | null>(null);
  const {
    data: bestDistrict,
    isLoading: isLoadingBestDistrict,
    isError: isErrorBestDistrict,
  } = useGetCountOfPostsByDistrict(iconCategory);

  const {
    data: postsData,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetAllPostsByDistrictOrCategory(bestDistrict?.district, iconCategory);

  const safeData = bestDistrict || { district: '', postCount: 0, content: [] };

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
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
  };

  if (isLoadingBestDistrict || isLoadingPosts) {
    return <div>Loading...</div>;
  }

  if (isErrorBestDistrict || isErrorPosts || !bestDistrict || !postsData) {
    return <div>Error or no data available</div>;
  }
  return (
    <>
      <s.Container>
        <div
          style={{ width: '720px', display: 'flex', flexDirection: 'column' }}
        >
          <div>
            <div style={{ marginBottom: '5px' }}>
              <img
                src={`/assets/svgs/${iconCategory}Icon.svg`}
                alt={`${iconCategory} Icon`}
                style={{ height: '30px', verticalAlign: 'middle' }}
              />
              <span
                style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  marginLeft: '10px',
                }}
              >
                {category}의 중심
              </span>
            </div>
            <s.Col>
              <s.TitleSpan>
                {safeData.district} {category} 구경하기
              </s.TitleSpan>
              <span style={{ fontSize: '9px' }}>
                {safeData.district}는 한 달간 {category} 게시물이{' '}
                {safeData.postCount}개 작성되어 {category} 동네로 선정되었어요!
              </span>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  style={{
                    fontSize: '9px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <span>게시글 전체보기</span>
                  <img
                    src="/assets/svgs/arrowIcon.svg"
                    alt="Arrow Icon"
                    style={{ height: '4px', marginLeft: '2px' }}
                  />
                </div>
                <Arrows>
                  <IoArrowBackCircleOutline onClick={previous} />
                  <IoArrowForwardCircleOutline onClick={next} />
                </Arrows>
              </div>
            </s.Col>
          </div>
        </div>
      </s.Container>
      <StyledSlider ref={slickRef} {...settings}>
        {postsData?.content
          .concat(postsData.content)
          .map((item: PostItem, idx: number) => (
            <ImageContainer key={idx}>
              <Post $backgroundImage={item.imageUrls[0]} />
              <s.Col>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    margin: '10px 0',
                  }}
                >
                  파스타앤코
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: '400',
                    marginBottom: '5px',
                  }}
                >
                  서울특별시 연남동 48-7 1층
                  <FaMapMarkerAlt />
                </span>
                <span
                  style={{
                    fontSize: '9px',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    marginRight: '5px',
                  }}
                >
                  게시물 보러가기
                </span>
              </s.Col>
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
  height: 3%;
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
