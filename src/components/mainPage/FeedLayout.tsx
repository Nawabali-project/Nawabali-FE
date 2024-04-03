import Feed from './Feed';
import styled from 'styled-components';

// 반응형 구조
const FeedsLayout = () => {
  return (
    <Layout>
      <Box>
        {Array.from({ length: 50 }).map((_, index) => (
          <Feed key={index} />
        ))}
      </Box>
    </Layout>
  );
};

const Layout = styled.div`
  padding: 0 10%;
`;

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

export default FeedsLayout;
