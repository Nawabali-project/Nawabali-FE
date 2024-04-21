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

export const Container = styled.div`
  width: 720px;
  margin: 60px auto 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

//posttype
export const PostType = styled.div<{ $category: string }>`
  position: absolute;
  top: 10px;
  right: 10px;
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
