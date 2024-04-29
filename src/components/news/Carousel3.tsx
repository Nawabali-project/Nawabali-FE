import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import * as s from './CasouselStyle';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
  IoHeartOutline,
  // IoHeartSharp,
} from 'react-icons/io5';
import { RiChat1Line } from 'react-icons/ri';
import { IoIosArrowDown } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';

import { useGetAllPostsByDistrictOrCategory } from '@/api/news';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PostItem } from '@/interfaces/main/news.interface';
import NewsModal from '@/components/modal/NewsModal';
import DetailPostModal from '../modal/DetailPostModal';

function useFetchPosts(district: string) {
  const queryParams = {
    district: district.split(' ')[1],
  };

  const { data, isLoading, isError, refetch } =
    useGetAllPostsByDistrictOrCategory(queryParams.district, undefined, 9);
  return { data, isLoading, isError, refetch };
}

function Carousel3() {
  const districtRef = useRef(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedDistrict, setSelectedDistrict] = useState('전체');
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const { data, refetch } = useFetchPosts(selectedDistrict);
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
  }, [selectedDistrict, refetch]);

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
    // autoplaySpeed: 2000,
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
          style={{ width: '720px', display: 'flex', flexDirection: 'column' }}
        >
          <s.TitleSpan>다른동네의 인기글을 구경해보세요!</s.TitleSpan>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <div
              ref={districtRef}
              style={{ display: 'flex', height: '25px', cursor: 'pointer' }}
              onClick={() => handleOpenModal('district', districtRef)}
            >
              <s.InnerSpan>{selectedDistrict}</s.InnerSpan>
              <IoIosArrowDown />
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
            <s.Row style={{ marginBottom: '8px' }}>
              <ProfileImg $profileImageUrl={item.profileImageUrl} />
              <span style={{ fontSize: '14px', fontWeight: 800 }}>
                &nbsp;&nbsp;{item.nickname}
              </span>
              <span style={{ fontSize: '12px', fontWeight: 400 }}>
                &nbsp;&nbsp;·&nbsp;&nbsp;{item.district}&nbsp;
              </span>
              <span style={{ fontSize: '12px', fontWeight: 400 }}>
                {item.userRankName}
              </span>
            </s.Row>
            <div style={{ position: 'relative' }}>
              <s.Post $backgroundImage={item.mainImageUrl} />

              <s.PostType $category={item.category}>
                {item.category === 'FOOD'
                  ? '맛집'
                  : item.category === 'CAFE'
                    ? '카페'
                    : item.category === 'PHOTOZONE'
                      ? '사진'
                      : ' '}
              </s.PostType>
            </div>
            <div style={{ padding: '0 5px' }}>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '400',
                  color: '#a1a1a1',
                  margin: '5px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    marginRight: '8px',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <IoHeartOutline />
                  <span>&nbsp;{item.likesCount}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <RiChat1Line />
                  <span>&nbsp;{item.commentCount}</span>
                </div>
              </div>
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: '600',
                  margin: '5px 0',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FaMapMarkerAlt style={{ marginRight: '3px' }} />
                {item.placeName ? item.placeName : item.placeAddr}
              </div>
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: '400',
                  color: '#858585',
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '180px',
                  }}
                >
                  {item.contents}
                </span>
              </div>
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
          trans={'-20%'}
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

export default Carousel3;

const ProfileImg = styled.div<{ $profileImageUrl: string }>`
  background-image: url(${(props) => props.$profileImageUrl});
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-size: cover;
  border: 1px solid #eeeeee;
`;
