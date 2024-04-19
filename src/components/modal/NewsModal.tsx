import styled from 'styled-components';
import { Districts } from '@/utils/districts';

interface NewsModalProps {
  open: boolean;
  type: string;
  onClose: () => void;
  setSelectedDistrict: (value: string) => void;
  setSelectedCategory: (value: string) => void;
}

const Categories = ['전체', '카페', '맛집', '사진스팟'];

function NewsModal({
  open,
  type,
  onClose,
  setSelectedDistrict,
  setSelectedCategory,
}: NewsModalProps) {
  if (!open) return null;

  const handleSelect = (value: string) => {
    if (type === 'district') {
      setSelectedDistrict(value);
    } else if (type === 'category') {
      setSelectedCategory(value);
    }
    onClose(); // 모달 닫기
  };

  return (
    <StyledModal>
      {type === 'district' && (
        <div>
          {Districts.map((district) => (
            <span key={district} onClick={() => handleSelect(district)}>
              {district}
            </span>
          ))}
        </div>
      )}
      {type === 'category' && (
        <div>
          {Categories.map((category) => (
            <span key={category} onClick={() => handleSelect(category)}>
              {category}
            </span>
          ))}
        </div>
      )}
    </StyledModal>
  );
}

const StyledModal = styled.div`
  position: absolute;
  width: 300px;
  top: 330px;
  left: 50%;
  text-align: center;
  z-index: 10;
  background: white;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
`;
export default NewsModal;
