import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

interface ModalProps {
  children?: React.ReactNode;
  size?: 'regular' | 'auth';
  onClose?: () => void; // 모달을 닫는 함수를 선택적 프롭으로 추가
}

const Modal: React.FC<ModalProps> = ({
  size = 'regular',
  children,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // onClose가 제공되지 않은 경우 외부 클릭 이벤트를 추가하지 않습니다.
    if (!onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // 모달 외부 클릭 시 onClose 실행
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <ModalWrapper>
      <ModalContent size={size} ref={modalRef}>
        {children}
      </ModalContent>
    </ModalWrapper>
  );
};

const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(79, 79, 79, 0.6);
  z-index: 10;
`;

const ModalContent = styled.div<{ size?: 'auth' | 'regular' }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border-radius: 15px;
  background-color: white;

  ${(props) =>
    props.size === 'regular' &&
    css`
      padding: 0px;
    `}

  ${(props) =>
    props.size === 'auth' &&
    css`
      padding: 100px;
      margin: 60px auto 0;
      box-sizing: border-box;
      width: 500px;
      height: 700px;
      justify-content: normal;
    `}
`;

export default Modal;
