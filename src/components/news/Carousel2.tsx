import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
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
    size: 9,
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

  const totalSlides = 9;
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

  const getRandomSVGName = () => {
    const svgNames = ['FOOD', 'CAFE', 'PHOTOZONE'];
    const randomIndex = Math.floor(Math.random() * svgNames.length);
    return svgNames[randomIndex];
  };
  const iconCategory = getRandomSVGName();

  return (
    <>
      <s.Container>
        <div
          style={{ width: '850px', display: 'flex', flexDirection: 'column' }}
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
            <s.Arrows>
              <IoArrowBackCircleOutline onClick={previous} />
              <IoArrowForwardCircleOutline onClick={next} />
            </s.Arrows>
          </div>
        </div>
      </s.Container>
      <s.StyledSlider ref={slickRef} {...settings}>
        {data?.content.map((item: PostItem, idx: number) => (
          <s.ImageContainer key={idx} onClick={() => handlePostClick(item)}>
            <s.Post $backgroundImage={item.mainImageUrl} />
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
              {item.placeName ? item.placeName : item.placeAddr}
              <FaMapMarkerAlt />
            </div>
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
