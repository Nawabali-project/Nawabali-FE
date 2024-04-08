import { useState } from 'react';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import items from '../Items';
import { TransitionGroup } from 'react-transition-group';
import './Carousel.css';

function Carousel() {
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
          height: '18vw',
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TransitionGroup
          component="div"
          style={{ display: 'flex', flexDirection: 'row' }}
        >
          {items
            .concat(items)
            .slice(currentIndex, currentIndex + itemsPerPage)
            .map((item, idx) => (
              <ImageContainer key={idx}>
                {idx === 0 && (
                  <LeftDiv>
                    <div>
                      <LeftDivSpan>이번주 우리동네</LeftDivSpan>
                      <LeftDivSpan>인기글을 모아봤어요!</LeftDivSpan>
                    </div>
                    <StyledDiv backgroundImage={item.item} />
                  </LeftDiv>
                )}
                {idx === 1 && (
                  <StyledDiv backgroundImage={item.item} isCenter={idx === 1} />
                )}
                {idx === itemsPerPage - 1 && (
                  <RightDiv>
                    <StyledDiv backgroundImage={item.item} />
                    <div>
                      <IoArrowBackCircleOutline onClick={handlePrev} />
                      <IoArrowForwardCircleOutline onClick={handleNext} />
                    </div>
                  </RightDiv>
                )}
              </ImageContainer>
            ))}
        </TransitionGroup>
      </div>
    </>
  );
}

export default Carousel;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 18vw;
`;

export const StyledDiv = styled.div<{
  backgroundImage: string;
  isCenter?: boolean;
}>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  width: ${(props) => (props.isCenter ? '12vw' : '9vw')};
  height: ${(props) => (props.isCenter ? '17vw' : '13vw')};
  display: block;
  border-radius: 15px;
  margin: ${(props) => (props.isCenter ? '0 5vw' : 0)};
`;

const RightDiv = styled.div`
  height: 17vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: grey;
    cursor: pointer;
  }
`;

const LeftDiv = styled.div`
  height: 17vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const LeftDivSpan = styled.span`
  font-size: 0.7rem;
  display: block;
`;
