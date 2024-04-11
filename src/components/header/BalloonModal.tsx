import React from 'react';
import styled from 'styled-components';

interface BalloonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BalloonModal: React.FC<BalloonModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{ marginBottom: '10px' }}>마이페이지</span>
          <span>로그아웃</span>
        </div>
      </ModalContainer>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: absolute;
  top: 65px;
  left: -48px;
  width: 150px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background-color: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 10px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  &:after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent rgb(255, 255, 255) transparent;
  }
`;

export default BalloonModal;
