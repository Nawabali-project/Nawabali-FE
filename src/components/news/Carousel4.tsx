import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as s from './CasouselStyle';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import {
  useGetAllPostsByDistrictOrCategory,
  useGetCategoryCountsByDistrict,
} from '@/api/news';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CategoryData, PostItem } from '@/interfaces/main/news.interface';
import { useNavigate } from 'react-router-dom';
import DetailPostModal from '../modal/DetailPostModal';

function useFetchPosts(district: string) {
  const queryParams = {
    district: district,
  };

  const { data } = useGetCategoryCountsByDistrict(queryParams.district);
  return { data };
}

const getRandomSVGName = () => {
  const svgNames = ['FOOD', 'CAFE', 'PHOTOZONE'];
  const randomIndex = Math.floor(Math.random() * svgNames.length);
  return svgNames[randomIndex];
};
const iconCategory = getRandomSVGName();

function useFetchCarouslPosts(district: string, category: string) {
  const queryParams = {
    district: district,
    category: category,
  };

  const { data } = useGetAllPostsByDistrictOrCategory(
    queryParams.district,
    queryParams.category,
    9,
  );
  return { data };
}

function Carousel4() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [maxCategory, setMaxCategory] = useState<string>('');
  const [maxCategoryKorean, setMaxCategoryKorean] = useState<string>('');
  const district = localStorage.getItem('district')!;
  const { data: categoryCounts } = useFetchPosts(district);
  const { data: carouselPosts } = useFetchCarouslPosts(district, maxCategory);
  const slickRef = useRef<Slider | null>(null);
  const navigate = useNavigate();
  const [isDetailPostModalOpen, setIsDetailPostModalOpen] =
    useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const totalSlides = 9;
  const actualSlides = carouselPosts?.content.length || 0;
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

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    initialSlide: 0,
    beforeChange: (newIndex: number) => {
      setCurrentSlide(newIndex);
    },
  };

  const goToPosts = () => {
    navigate(
      `/listpage?district=${encodeURIComponent(district)}&category=${encodeURIComponent(maxCategory)}`,
    );
  };

  const handlePostClick = (item: PostItem) => {
    setSelectedPost(item);
    setIsDetailPostModalOpen(true);
  };

  const findMaxPostCategory = (
    categoryCounts: CategoryData[] | undefined,
  ): string => {
    if (!categoryCounts || categoryCounts.length === 0)
      return 'No data available';

    let maxCategory = categoryCounts[0];
    categoryCounts.forEach((item) => {
      if (item.postCount > maxCategory.postCount) {
        maxCategory = item;
      }
    });
    return maxCategory.category;
  };

  useEffect(() => {
    if (categoryCounts && categoryCounts.length > 0) {
      setCategoryData(categoryCounts);
      const maxCat = findMaxPostCategory(categoryCounts);
      setMaxCategory(maxCat);
      if (maxCat === 'FOOD') {
        setMaxCategoryKorean('맛집이');
      } else if (maxCat === 'CAFE') {
        setMaxCategoryKorean('카페가');
      } else {
        setMaxCategoryKorean('사진스팟이');
      }
    }
  }, [categoryCounts]);

  return (
    <s.Wrapper
      style={{
        height: '350px',
        marginTop: '100px',
        backgroundColor: '#FAFAFA',
        paddingTop: '10px',
      }}
    >
      <s.Row
        style={{
          justifyContent: 'center',
          paddingTop: '5px',
        }}
      >
        <s.Col style={{ width: '215px' }}>
          <div>
            <span style={{ fontSize: '12px' }}>우리동네 대표 카테고리</span>
            <s.Col>
              <s.TitleSpan>
                {district}는 {maxCategoryKorean}
              </s.TitleSpan>
              <s.TitleSpan>활성화 된 동네예요!</s.TitleSpan>
            </s.Col>
          </div>
          <s.Col style={{ margin: '5px 0' }}>
            <TextSpan>한 달간 작성된 게시물을 분석한 결과</TextSpan>
            <span
              style={{
                fontSize: '9px',
                color: '#707070',
                fontWeight: '500',
                margin: '3px 0',
              }}
            >
              {categoryData.map((cat, index) => (
                <span
                  key={cat.category}
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  {cat.category === 'FOOD'
                    ? '맛집'
                    : cat.category === 'CAFE'
                      ? '카페'
                      : '사진스팟'}{' '}
                  {cat.postCount}개
                  {index < categoryData.length - 1 ? ' | ' : '의 '}
                </span>
              ))}
            </span>
            <TextSpan>게시물이 올라왔어요!</TextSpan>
          </s.Col>
          <span
            style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#707070',
              marginTop: '5px',
              textDecoration: 'underLine',
            }}
            onClick={goToPosts}
          >
            게시물 보러가기
          </span>
          <s.BarContainerWithDistrict>
            <s.ProgressWithDistrict $index={currentSlide + 1} />
          </s.BarContainerWithDistrict>
          <s.Arrows style={{ marginLeft: '-3px' }}>
            <IoArrowBackCircleOutline onClick={previous} />
            <IoArrowForwardCircleOutline onClick={next} />
          </s.Arrows>
        </s.Col>
        <s.StyledSliderWithGreyBackground ref={slickRef} {...settings}>
          {carouselPosts?.content.map((item: PostItem, idx: number) => (
            <s.ImageContainer key={idx} onClick={() => handlePostClick(item)}>
              <s.PostWithGreyBackground $backgroundImage={item.mainImageUrl} />
            </s.ImageContainer>
          ))}
          {[...Array(emptySlidesCount)].map((_, idx) => (
            <s.ImageContainer key={`empty-${idx}`}>
              <s.EmptyPostWithGreyBackground>
                <img src={`/assets/svgs/noPost${iconCategory}.svg`} />
              </s.EmptyPostWithGreyBackground>
            </s.ImageContainer>
          ))}
        </s.StyledSliderWithGreyBackground>
      </s.Row>
      {isDetailPostModalOpen && selectedPost && (
        <DetailPostModal
          postId={selectedPost.postId}
          setIsDetailPostModalOpen={setIsDetailPostModalOpen}
        />
      )}
    </s.Wrapper>
  );
}

export default Carousel4;

const TextSpan = styled.span`
  font-size: 12px;
  color: #707070;
`;
