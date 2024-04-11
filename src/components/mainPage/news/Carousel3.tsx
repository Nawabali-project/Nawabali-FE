import { useState } from 'react';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import items from '../Items';
import { TransitionGroup } from 'react-transition-group';
import './Carousel.css';

function Carousel3() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const totalItems = items.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
  };
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
  };

  return (
    <>
      <div
        style={{
          border: '1px solid pink',
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
              <IoArrowBackCircleOutline onClick={handlePrev} />
              <IoArrowForwardCircleOutline onClick={handleNext} />
            </Arrows>
          </div>
          <TransitionGroup
            component="div"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            {items
              .concat(items)
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item, idx) => (
                <ImageContainer key={idx} isCenter={idx === 1}>
                  <StyledDiv backgroundImage={item.item} />
                </ImageContainer>
              ))}
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}

export default Carousel3;

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

export const StyledDiv = styled.div<{
  backgroundImage: string;
}>`
  background-image: url(${(props) => props.backgroundImage});
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
