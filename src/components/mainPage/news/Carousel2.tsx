import { useState } from 'react';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import items from '../Items';
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
          border: '1px solid pink',
          height: '18vw',
          marginTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Arrows>
            <IoArrowBackCircleOutline onClick={handlePrev} />
            <IoArrowForwardCircleOutline onClick={handleNext} />
          </Arrows>
          <TransitionGroup
            component="div"
            style={{ display: 'flex', flexDirection: 'row' }}
          >
            {items
              .slice(currentIndex, currentIndex + itemsPerPage)
              .map((item, idx) => (
                <ImageContainer key={idx}>
                  <StyledDiv backgroundImage={item.item} isCenter={idx === 1} />
                </ImageContainer>
              ))}
          </TransitionGroup>
        </div>
      </div>
    </>
  );
}

export default Carousel2;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15vw;
`;

export const StyledDiv = styled.div<{
  backgroundImage: string;
  isCenter?: boolean;
}>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  width: 12vw;
  height: 14vw;
  display: block;
  border-radius: 20px 0 20px 0;
  margin: ${(props) => (props.isCenter ? '0 2vw' : 0)};
`;

const Arrows = styled.div`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: grey;
    cursor: pointer;
  }
`;
