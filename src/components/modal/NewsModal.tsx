import styled from 'styled-components';
import { Districts } from '@/utils/districts';
import { useEffect, useRef } from 'react';

interface NewsModalProps {
  open: boolean;
  type: string;
  onClose: () => void;
  setSelectedDistrict: (value: string) => void;
  setSelectedCategory?: (value: string) => void;
  position: { x: number; y: number };
  trans?: string;
}

export const CategoryMappings: { [key: string]: string } = {
  전체: 'ALL',
  카페: 'CAFE',
  맛집: 'FOOD',
  사진스팟: 'PHOTO',
};

function NewsModal({
  type,
  onClose,
  setSelectedDistrict,
  setSelectedCategory,
  position,
  trans = '-50%',
}: NewsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleCloseModal = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleCloseModal);
    return () => {
      document.removeEventListener('mousedown', handleCloseModal);
    };
  }, []);

  const handleSelect = (value: string) => {
    if (type === 'district') {
      setSelectedDistrict(value);
    } else if (setSelectedCategory && type === 'category') {
      setSelectedCategory(value);
    }
    onClose();
  };

  return (
    <StyledModal
      ref={modalRef}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        transform: `translateX(${trans})`,
      }}
    >
      {type === 'district' && (
        <div>
          {Districts.map((district) => (
            <OptionP key={district} onClick={() => handleSelect(district)}>
              {district}
            </OptionP>
          ))}
        </div>
      )}
      {type === 'category' && (
        <div>
          {Object.keys(CategoryMappings).map((category) => (
            <OptionP key={category} onClick={() => handleSelect(category)}>
              {category}
            </OptionP>
          ))}
        </div>
      )}
    </StyledModal>
  );
}

export default NewsModal;

const StyledModal = styled.div`
  position: absolute;
  z-index: 10;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  max-height: 100px;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
    height: 15px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const OptionP = styled.p`
  margin: 3px 0;
  font-size: 13px;
  text-align: left;
  border-radius: 3px;
  cursor: pointer;
  &:hover {
    background-color: rgb(223, 223, 223);
  }
`;
