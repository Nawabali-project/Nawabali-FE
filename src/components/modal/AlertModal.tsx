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
    if (alertType !== 'error') {
      const timer = setTimeout(() => {
        closeAlert(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [alertType, closeAlert]);

  return (
    <CustomModalContainer>
      {alertType == 'error' ? (
        <>
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
        </>
      ) : (
        <>
          <CheckIcon />
          <MessageBox>{message}</MessageBox>
        </>
      )}
    </CustomModalContainer>
  );
};

const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 20px 0px 20px;
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
  width: auto;
  height: auto;
  padding: 20px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 10px gray;
  z-index: 1000;
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
