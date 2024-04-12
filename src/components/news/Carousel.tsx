import { useState } from 'react';
import styled from 'styled-components';
import {
  IoArrowBackCircleOutline,
  IoArrowForwardCircleOutline,
} from 'react-icons/io5';
import items from './Items';
import { TransitionGroup } from 'react-transition-group';
import './Carousel.css';
// import { useGetAllPostsByDistrict } from '@/api/news';

function Carousel() {
  // const { data } = useGetAllPostsByDistrict(user.district);
  // const { data } = useGetAllPostsByDistrict('마포구');

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
          width: '860px',
          height: '300px',
          margin: '50px auto 0',
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
                  <StyledDiv position={'left'}>
                    <div>
                      <LeftDivSpan>이번주 우리동네</LeftDivSpan>
                      <LeftDivSpan>인기글을 모아봤어요!</LeftDivSpan>
                    </div>
                    <Post backgroundImage={item.item} position={'left'} />
                  </StyledDiv>
                )}
                {idx === 1 && <Post backgroundImage={item.item} />}
                {idx === 2 && (
                  <StyledDiv position={'right'}>
                    <Post backgroundImage={item.item} position={'right'} />
                    <div>
                      <IoArrowBackCircleOutline onClick={handlePrev} />
                      <IoArrowForwardCircleOutline onClick={handleNext} />
                    </div>
                  </StyledDiv>
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
  height: 300px;
`;

export const Post = styled.div<{
  backgroundImage: string;
  position?: 'left' | 'right';
}>`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  width: ${(props) => (props.position ? '180px' : '220px')};
  height: ${(props) => (props.position ? '240px' : '300px')};
  display: block;
  border-radius: 20px;
  margin: 0;
`;
export const StyledDiv = styled.div<{
  position?: 'left' | 'right';
}>`
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.position === 'left' ? 'flex-end' : 'flex-start'};
  margin: 0 70px;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: grey;
    cursor: pointer;
  }
`;

const LeftDivSpan = styled.span`
  font-size: 0.9rem;
  display: block;
`;
