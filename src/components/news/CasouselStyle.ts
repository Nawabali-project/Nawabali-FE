import Slider from 'react-slick';
import styled from 'styled-components';

//div
export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
`;

export const Wrapper = styled.div`
  height: 450px;
  margin: 50px 0;
`;

export const Container = styled.div`
  width: 850px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  cursor: pointer;
  p {
    text-decoration: none;
    text-align: left;
    margin: 0;
  }
`;

export const Arrows = styled.div`
  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: grey;
    cursor: pointer;
  }
`;

export const EmptyPost = styled.div`
  width: 275px;
  height: 275px;
  border-radius: 20px 0 20px 0;
  border: 1px solid #e2e2e2;
  background-color: #e1e1e1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 170px;
  }
`;

export const Post = styled.div<{
  $backgroundImage: string;
}>`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  width: 275px;
  height: 275px;
  display: block;
  border-radius: 20px 0 20px 0;
  border: 1px solid #e2e2e2;
`;

export const EmptyPostWithGreyBackground = styled.div`
  width: 190px;
  height: 266px;
  border: 1px solid #e2e2e2;
  background-color: #e1e1e1;
  display: flex;
  border-radius: 20px;
  align-items: center;
  justify-content: center;

  img {
    width: 170px;
  }
`;

export const PostWithGreyBackground = styled.div<{
  $backgroundImage: string;
}>`
  background-image: url(${(props) => props.$backgroundImage});
  background-size: cover;
  background-position: center;
  border: 1px solid #e2e2e2;
  width: 190px;
  height: 266px;
  display: block;
  border-radius: 20px;
`;

//text
export const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 20px;
  margin: 2px 0;
`;

export const InnerSpan = styled.span`
  font-weight: 600;
  font-size: 13px;
`;

export const AddressDiv = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #525252;
  display: flex;
  align-items: center;
  width: 277px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContentSpan = styled.span`
  font-size: 14px;
  display: block;
  margin-top: 5px;
  width: 270px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LikesBar = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  margin: 5px 0 0;
  color: #919191;
`;

//posttype
export const PostType = styled.div<{ $category: string }>`
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 3px 10px;
  background-color: ${(props) => {
    switch (props.$category) {
      case 'FOOD':
        return '#FE6847';
      case 'CAFE':
        return '#9BCF53';
      case 'PHOTOZONE':
        return '#00A3FF';
      default:
        return '#ccc';
    }
  }};
  color: white;
  border-radius: 20px;
  font-size: 9px;
  z-index: 15;
`;

//slider
export const StyledSlider = styled(Slider)`
  margin: 0 auto;
  height: 300px;
  width: 850px;
  margin-top: 10px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

export const StyledSliderWithGreyBackground = styled(Slider)`
  margin: 0 0 0 30px;
  padding-top: 30px;
  width: 620px;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

//progressBar
export const Progress = styled.div<{ $index: number }>`
  width: ${(props) => 20 * props.$index}px;
  height: 1px;
  background-color: black;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.5s ease-in-out;
`;

export const BarContainer = styled.div`
  width: 140px;
  height: 1px;
  background-color: #bebebe;
  border-radius: 3px;
  position: relative;
  margin: 15px 5px 15px;
`;

export const ProgressWithDistrict = styled.div<{ $index: number }>`
  width: ${(props) => 50 * (Math.floor(props.$index / 3) + 1)}px;
  height: 1px;
  background-color: black;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.5s ease-in-out;
`;

export const BarContainerWithDistrict = styled.div`
  width: 150px;
  height: 1px;
  background-color: #bebebe;
  border-radius: 3px;
  position: relative;
  margin: 15px 0;
`;
