import styled, { keyframes } from 'styled-components';
import { useSearchedPosts } from '@/api/header';

interface SearchBarProps {
  content: string;
  $isOpen: boolean;
  onPostSelect: (postId: number) => void;
}

interface Post {
  id: string;
  contents: string;
  postId: number;
}
const SearchBar: React.FC<SearchBarProps> = ({
  content,
  $isOpen,
  onPostSelect,
}) => {
  const { data: posts, isLoading, isError, error } = useSearchedPosts(content);

  return (
    <ModalDiv $isOpen={$isOpen}>
      <StyledUl>
        {isLoading ? (
          <StyledLi>Loading...</StyledLi>
        ) : isError ? (
          <StyledLi>Error: {error.message}</StyledLi>
        ) : (
          posts &&
          posts.length > 0 &&
          posts.map((post: Post) => (
            <StyledLi
              style={{ cursor: 'pointer' }}
              onMouseDown={() => onPostSelect(post.postId)}
              key={post.id}
            >
              {post.contents}
            </StyledLi>
          ))
        )}
      </StyledUl>
    </ModalDiv>
  );
};

export default SearchBar;

const ModalDiv = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  left: 0;
  top: 35px;
  width: 250px;
  height: 300px;
  border: 1px solid transparent;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-size: 13px;
  border-radius: 10px;
  background-color: white;
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  transition:
    opacity 0.3s,
    transform 0.3s;
  animation: ${({ $isOpen }) => ($isOpen ? slideDown : 'none')} 0.3s ease;
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledUl = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLi = styled.span`
  padding: 10px;

  &:hover {
    background-color: #e9e9e9;
  }
`;
