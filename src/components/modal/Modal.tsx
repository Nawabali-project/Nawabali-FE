import React, { useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

interface ModalProps {
  children?: React.ReactNode;
  size?: 'regular' | 'auth';
  onClose?: () => void;
  isAlertModalOpen: any;
}

const Modal: React.FC<ModalProps> = ({
  size = 'regular',
  children,
  onClose,
  isAlertModalOpen,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!onClose) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        !isAlertModalOpen
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose, isAlertModalOpen]);

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
      height: 730px;
      justify-content: normal;
    `}
`;

export default Modal;
