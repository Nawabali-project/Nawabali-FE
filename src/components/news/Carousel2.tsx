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
import { useCallback, useRef, useState } from 'react';
import { PostItem } from '@/interfaces/main/news.interface';
import NewsModal from '@/components/modal/NewsModal';

function Carousel2() {
  const userDistrict = localStorage.getItem('district')!;
  const { data } = useGetAllPostsByDistrict(userDistrict);
  const [selectedDistrict, setSelectedDistrict] =
    useState<string>(userDistrict);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [openSelectModal, setOpenSelectModal] = useState(false);
  const [modalType, setModalType] = useState<string>('');
  const slickRef = useRef<Slider>(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     // 선택된 지역에 따라 데이터를 불러오는 로직
  //     const newData = await useGetAllPostsByDistrict(selectedDistrict);
  //     // 데이터 상태 업데이트 로직
  //     setData(newData);
  //   };

  //   fetchData();
  // }, [selectedDistrict]);

  const handleOpenModal = (type: string) => {
    setModalType(type);
    setOpenSelectModal(true);
  };

  const handleCloseModal = () => {
    setOpenSelectModal(false);
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
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex' }}>
              <div
                style={{ display: 'flex', height: '25px', cursor: 'pointer' }}
                onClick={() => handleOpenModal('district')}
              >
                <FaMapMarkerAlt />
                <s.InnerSpan>{selectedDistrict}</s.InnerSpan>
                <IoIosArrowDown />
              </div>
              <div
                style={{ display: 'flex', height: '25px', cursor: 'pointer' }}
                onClick={() => handleOpenModal('category')}
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
          <ImageContainer key={idx} $isCenter={idx === 1}>
            <Post $backgroundImage={item.imageUrls[0]} />
            <p>파스타앤코</p>
            <p style={{ fontSize: '13px' }}>
              서울특별시 연남동 48-7 1층
              <FaMapMarkerAlt />
            </p>
            <p style={{ fontSize: '10px', textDecoration: 'underline' }}>
              게시물 보러가기
            </p>
          </ImageContainer>
        ))}
      </StyledSlider>
      {openSelectModal && (
        <NewsModal
          open={openSelectModal}
          type={modalType}
          onClose={handleCloseModal}
          setSelectedDistrict={setSelectedDistrict}
          setSelectedCategory={setSelectedCategory}
        />
      )}
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
