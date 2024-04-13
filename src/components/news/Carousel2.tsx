import { useState } from 'react';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';
import items from './Items';
import { TransitionGroup } from 'react-transition-group';
import './Carousel.css';

function Carousel2() {
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
          // border: '1px solid pink',
          width: '720px',
          margin: '50px auto 0',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div>일주일간 사람들이 많이 찾은 곳이에요!</div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <span style={{ marginRight: '20px' }}>
                <FaMapMarkerAlt />
                서울특별시 서초구
                <IoIosArrowDown />
              </span>
              <span>
                전체
                <IoIosArrowDown />
              </span>
            </div>
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
                <ImageContainer key={idx} $isCenter={idx === 1}>
                  <StyledDiv backgroundImage={item.item} />
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
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}

export default Carousel2;

const ImageContainer = styled.div<{ $isCenter?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: ${(props) => (props.$isCenter ? '0 10px' : '0')};

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
  width: 234px;
  height: 270px;
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
