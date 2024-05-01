import { AlertLogoIcon, CheckIcon } from '@/utils/icons';
import styled from 'styled-components';
import { useEffect } from 'react';

const AlertModal = ({
  message,
  closeAlert,
  alertType,
}: {
  message: React.ReactNode;
  closeAlert: any;
  alertType: string;
}) => {
  useEffect(() => {
    if (alertType === 'complete') {
      const timer = setTimeout(() => {
        closeAlert(false);
      }, 1500);

      return () => clearTimeout(timer);
    } else if (alertType === 'postAdd') {
      const timer = setTimeout(() => {
        closeAlert(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [alertType, closeAlert]);

  return (
    <>
      {alertType === 'error' ? (
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
      ) : alertType === 'complete' ? (
        <CustomModalContainer>
          <CheckIcon />
          <MessageBox>{message}</MessageBox>
        </CustomModalContainer>
      ) : alertType === 'postAdd' ? (
        <AddLoadingBox>
          <img src="/assets/images/mapLoadingWalk.gif" alt="로딩 중" />
          <AddCompleteMessage>{message}</AddCompleteMessage>
        </AddLoadingBox>
      ) : null}
    </>
  );
};

const AddLoadingBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 940px;
  height: 580px;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  z-index: 1000;
`;

const AddCompleteMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 20px 0px 20px;
  padding: 0 0 50px 0;
  text-align: center;
  font-size: 40px;
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
  width: auto;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px gray;
  z-index: 1000;
`;

const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 0px 20px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

const CloseBox = styled.div`
  margin-top: 20px;
  padding: 8px 15px;
  background-color: #00a3ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  cursor: pointer;
`;

export default AlertModal;
