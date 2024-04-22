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
import { useGetAllPostsByDistrictOrCategory } from '@/api/news';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PostItem } from '@/interfaces/main/news.interface';
import NewsModal, { CategoryMappings } from '@/components/modal/NewsModal';
import DetailPostModal from '../modal/DetailPostModal';

function useFetchPosts(district: string, category: string) {
  const queryParams = {
    district: district.split(' ')[1],
    category:
      CategoryMappings[category] !== 'ALL'
        ? CategoryMappings[category]
        : undefined,
    size: 10,
  };

  const { data, isLoading, isError, refetch } =
    useGetAllPostsByDistrictOrCategory(
      queryParams.district,
      queryParams.category,
      queryParams.size,
    );

  return { data, isLoading, isError, refetch };
}

function Carousel2() {
  const districtRef = useRef(null);
  const categoryRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedDistrict, setSelectedDistrict] = useState(() => {
    const district = localStorage.getItem('district') || '';
    if (!district.startsWith('서울특별시')) {
      return `서울특별시 ${district}`;
    }
    return district;
  });
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const { data, refetch } = useFetchPosts(selectedDistrict, selectedCategory);
  const slickRef = useRef<Slider>(null);
  const [isDetailPostModalOpen, setIsDetailPostModalOpen] =
    useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);

  const totalSlides = 7;
  const actualSlides = data?.content.length || 0;
  const emptySlidesCount = Math.max(0, totalSlides - actualSlides);

  const handlePostClick = (item: PostItem) => {
    setSelectedPost(item);
    setIsDetailPostModalOpen(true);
  };

  useEffect(() => {
    refetch();
  }, [selectedDistrict, selectedCategory, refetch]);

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

  const handleOpenModal = (
    type: string,
    ref: React.RefObject<HTMLDivElement>,
  ) => {
    const rect = ref.current!.getBoundingClientRect();
    setModalPosition({
      x: rect.left + rect.width / 2 + window.scrollX,
      y: rect.bottom + window.scrollY,
    });
    setModalType(type);
    setOpenSelectModal(true);
  };

  const handleCloseModal = () => {
    setOpenSelectModal(false);
  };

  let settings = {
    dots: false,
    infinite: true,
    // autoplay: true,
    // autoplaySpeed: 4000,
    slidesToShow: 3,
    slidesToScroll: 3,
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
              marginTop: '10px',
            }}
          >
            <div style={{ display: 'flex' }}>
              <div
                ref={districtRef}
                style={{
                  display: 'flex',
                  height: '25px',
                  cursor: 'pointer',
                  marginRight: '15px',
                }}
                onClick={() => handleOpenModal('district', districtRef)}
              >
                <FaMapMarkerAlt style={{ marginRight: '3px' }} />
                <s.InnerSpan>{selectedDistrict}</s.InnerSpan>
                <IoIosArrowDown />
              </div>
              <div
                ref={categoryRef}
                style={{ display: 'flex', height: '25px', cursor: 'pointer' }}
                onClick={() => handleOpenModal('category', categoryRef)}
              >
                <s.InnerSpan>{selectedCategory}</s.InnerSpan>
                <IoIosArrowDown />
              </div>
            </div>
            <Arrows>
              <IoArrowBackCircleOutline onClick={previous} />
              <IoArrowForwardCircleOutline onClick={next} />
            </Arrows>
          </div>
        </div>
      </s.Container>
      <StyledSlider ref={slickRef} {...settings}>
        {data?.content.map((item: PostItem, idx: number) => (
          <ImageContainer key={idx}>
            <Post $backgroundImage={item.imageUrls[0]} />
            {selectedCategory === '전체' && (
              <s.PostType $category={item.category}>
                {item.category === 'FOOD'
                  ? '맛집'
                  : item.category === 'CAFE'
                    ? '카페'
                    : item.category === 'PHOTOZONE'
                      ? '사진'
                      : ' '}
              </s.PostType>
            )}
            <p
              style={{ fontSize: '13px', fontWeight: '700', marginTop: '10px' }}
            >
              {item.contents}
            </p>
            <div
              style={{
                fontSize: '11px',
                fontWeight: '400',
                color: '#525252',
                margin: '5px 0',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              서울특별시 연남동 48-7 1층
              <FaMapMarkerAlt />
            </div>
            <p
              style={{
                fontSize: '8px',
                fontWeight: '400',
                color: '#858585',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={() => handlePostClick(item)}
            >
              게시물 보러가기
            </p>
          </ImageContainer>
        ))}
        {[...Array(emptySlidesCount)].map((_, idx) => (
          <ImageContainer key={`empty-${idx}`}>
            <EmptyPost>
              <span style={{ fontSize: '13px', color: '#616161' }}>
                아직 TOP7의 자리가 남아있습니다!
              </span>
            </EmptyPost>
          </ImageContainer>
        ))}
      </StyledSlider>
      {openSelectModal && (
        <NewsModal
          open={openSelectModal}
          type={modalType}
          position={modalPosition}
          onClose={handleCloseModal}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      {isDetailPostModalOpen && selectedPost && (
        <DetailPostModal
          postId={selectedPost.postId}
          setIsDetailPostModalOpen={setIsDetailPostModalOpen}
        />
      )}
    </>
  );
}

export default Carousel2;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
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
  margin-top: 20px;
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

const EmptyPost = styled.div`
  width: 234px;
  height: 234px;
  border-radius: 20px 0 20px 0;
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
