import { LogoCharacterIcon } from '@/utils/icons';
import styled from 'styled-components';

const AlertModal = ({
  message,
  closeAlert,
}: {
  message: string;
  closeAlert: any;
}) => {
  return (
    <CustomModalBackground>
      <CustomModalContainer>
        <LogoCharacterIcon />
        <p>{message}</p>
        <ConfirmButton
          onClick={(e) => {
            e.stopPropagation();
            closeAlert;
          }}
        >
          확인
        </ConfirmButton>
      </CustomModalContainer>
    </CustomModalBackground>
  );
};

const CustomModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const CustomModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: 250px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ConfirmButton = styled.div`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

export default AlertModal;
