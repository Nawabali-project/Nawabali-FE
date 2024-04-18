import styled from 'styled-components';

//div
export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Container = styled.div`
  width: 720px;
  margin: 50px auto 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

//text
export const TitleSpan = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

export const InnerSpan = styled.span`
  font-weight: 600;
  font-size: 13px;
`;
