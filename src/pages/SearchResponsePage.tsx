import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function SearchResponsePage() {
  const { keword } = useParams();
  return (
    <>
      <Container>
        <NoResults>
          <NoResultIcon src="/assets/svgs/searchWithNoAnswers.svg" />
          <div>
            <span>'{keword}'</span>
            <span>에 대한 검새결과를 찾지 못했어요.</span>
          </div>
        </NoResults>
      </Container>
    </>
  );
}

export default SearchResponsePage;

const Container = styled.div`
  height: 800px;
  width: 1000px;
  margin: 0 auto;
`;

const NoResults = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const NoResultIcon = styled.img`
  width: 500px;
  height: 500px;
  object-fit: cover;
`;
