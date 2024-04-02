import styled from 'styled-components';

interface ModalChildrenType {
  children?: React.ReactNode;
}

const Modal: React.FC<ModalChildrenType> = ({ children }) => {
  return (
    <ModalWrapper>
      <ModalContent>{children}</ModalContent>
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
  background-color: rgba(82, 82, 82, 0.6);
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding: 40px;
  border-radius: 15px;
  background-color: white;
  box-shadow: 0 0 5px;
`;

export default Modal;
