import { IoIosSearch } from 'react-icons/io';
import { FaMapMarkerAlt } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';

interface SearchBarProps {
  address: string;
  $isOpen: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ address, $isOpen }) => {
  const [isSearchbarOpen, setSearchbarOpen] = useState<boolean>(false);

  useEffect(() => {
    setSearchbarOpen(!!address.trim());
  }, [address]);

  return (
    <ModalDiv $isOpen={$isOpen}>
      <div>
        <span>
          <FaMapMarkerAlt />
          서울특별시 성동구 성수동 1가
        </span>
      </div>
      <div>
        <p>
          <IoIosSearch style={{ color: 'gray' }} />
          성수 레이어
        </p>
        <span>서울특별시 성동구 뚝섬로9길 20 2층</span>
      </div>
      {isSearchbarOpen && <SearchInput />}
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

const SearchInput = styled.input.attrs({
  type: 'text',
  placeholder: '지역명, 상호 등으로 검색할 수 있어요!',
})`
  width: 100%;
  border: none;
  font-size: 13px;
  &:focus {
    outline: none;
  }
`;
