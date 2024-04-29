import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as s from './CasouselStyle';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoHeartOutline,
} from 'react-icons/io5';
import { FaMapMarkerAlt } from 'react-icons/fa';
import {
  useGetAllPostsByDistrictOrCategory,
  useGetCountOfPostsAndDistrictByCategory,
} from '@/api/news';
import { useCallback, useRef, useState } from 'react';
import { CarouselProps, PostItem } from '@/interfaces/main/news.interface';
import DetailPostModal from '../modal/DetailPostModal';
import { useNavigate } from 'react-router-dom';
import { RiChat1Line } from 'react-icons/ri';

function Carousel5({ iconCategory, category }: CarouselProps) {
  const navigate = useNavigate();
  const [isDetailPostModalOpen, setIsDetailPostModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const slickRef = useRef<Slider | null>(null);

  const {
    data: bestDistrict,
    isLoading: isLoadingBestDistrict,
    isError: isErrorBestDistrict,
  } = useGetCountOfPostsAndDistrictByCategory(iconCategory);

  const {
    data: postsData,
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useGetAllPostsByDistrictOrCategory(
    bestDistrict?.district,
    iconCategory,
    9,
  );

  const safeData = postsData || { district: '', postCount: 0, content: [] };

  const totalSlides = 9;
  const actualSlides = safeData?.content?.length || 0;
  const emptySlidesCount = Math.max(0, totalSlides - actualSlides);

  const handlePostClick = (item: PostItem) => {
    setSelectedPost(item);
    setIsDetailPostModalOpen(true);
  };

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
    // autoplay: true,
    // autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  const goToAllPosts = () => {
    navigate(`/listpage?district=${encodeURIComponent(bestDistrict.district)}`);
  };

  if (isLoadingBestDistrict || isLoadingPosts) {
    return null;
  }

  if (isErrorBestDistrict || isErrorPosts || !bestDistrict || !postsData) {
    return <div>Error or no data available</div>;
  }
  return (
    <s.Wrapper>
      <s.Container>
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
              {bestDistrict.district} {category} 구경하기
            </s.TitleSpan>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>
              {bestDistrict.district}는 한 달간 {category} 게시물이{' '}
              {bestDistrict.postCount}개 작성되어 {category} 동네로
              선정되었어요!
            </span>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div
                style={{
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span onClick={goToAllPosts}>게시글 전체보기</span>
                <img
                  src="/assets/svgs/arrowIcon.svg"
                  alt="Arrow Icon"
                  style={{ height: '4px', marginLeft: '2px' }}
                />
              </div>
              <s.Arrows>
                <IoArrowBackCircleOutline onClick={previous} />
                <IoArrowForwardCircleOutline onClick={next} />
              </s.Arrows>
            </div>
          </s.Col>
        </div>
      </s.Container>
      <s.StyledSlider ref={slickRef} {...settings}>
        {postsData?.content
          .concat(postsData.content)
          .map((item: PostItem, idx: number) => (
            <s.ImageContainer key={idx} onClick={() => handlePostClick(item)}>
              <s.Post $backgroundImage={item.mainImageUrl} />
              <s.Col>
                <s.AddressDiv>{item.placeName}</s.AddressDiv>
                <s.LikesBar>
                  <IoHeartOutline style={{ fontSize: '14px' }} />
                  &nbsp;{item.likesCount}&nbsp;&nbsp;
                  <RiChat1Line />
                  &nbsp;{item.commentCount}
                </s.LikesBar>
                <s.ContentSpan>{item.contents}</s.ContentSpan>
                <s.AddressDiv>
                  <FaMapMarkerAlt style={{ marginRight: '3px' }} />
                  {item.placeName ? item.placeName : item.placeAddr}
                </s.AddressDiv>
              </s.Col>
            </s.ImageContainer>
          ))}
        {[...Array(emptySlidesCount)].map((_, idx) => (
          <s.ImageContainer key={`empty-${idx}`}>
            <s.EmptyPost>
              <img src={`/assets/svgs/noPost${iconCategory}.svg`} />
            </s.EmptyPost>
          </s.ImageContainer>
        ))}
      </s.StyledSlider>
      {isDetailPostModalOpen && selectedPost && (
        <DetailPostModal
          postId={selectedPost.postId}
          setIsDetailPostModalOpen={setIsDetailPostModalOpen}
        />
      )}
    </s.Wrapper>
  );
}

export default Carousel5;
