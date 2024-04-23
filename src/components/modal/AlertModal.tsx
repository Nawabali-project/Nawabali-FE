import { AlertLogoIcon } from '@/utils/icons';
import styled from 'styled-components';

const AlertModal = ({
  message,
  closeAlert,
}: {
  message: React.ReactNode;
  closeAlert: any;
}) => {
  return (
    <CustomModalContainer>
      <AlertLogoIcon />
      <MessageBox>{message}</MessageBox>
      <CloseBox
        onClick={(e) => {
          e.stopPropagation();
          closeAlert(false);
        }}
      >
        닫기
      </CloseBox>
    </CustomModalContainer>
  );
};

const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0px 0px 0px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

const CustomModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 230px;
  height: 180px;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const CloseBox = styled.div`
  margin-top: 20px;
  padding: 0px 20px;
  color: gray;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    color: #00a3ff;
  }
`;

export default AlertModal;
