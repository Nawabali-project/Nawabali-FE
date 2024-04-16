import { checkPassWord } from '@/api/user';
import { useState } from 'react';

interface DeleteAccountModalProps {
  onClose: () => void;
  onDeleteConfirmed: () => void;
}

function DeleteAccountModal({
  onClose,
  onDeleteConfirmed,
}: DeleteAccountModalProps) {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmClick = async () => {
    try {
      const isValid = await checkPassWord(password); // checkPassword는 API 호출 함수
      if (isValid) {
        if (window.confirm('정말로 계정을 삭제하시겠습니까?')) {
          onDeleteConfirmed();
        }
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      alert('오류가 발생했습니다. 다시 시도해주세요.');
      console.error('Password check failed:', error);
    }
  };

  return (
    <div className="modal">
      <input
        type="password"
        value={password}
        onChange={handlePasswordChange}
        placeholder="비밀번호 입력"
      />
      <button onClick={handleConfirmClick}>확인</button>
      <button onClick={onClose}>취소</button>
    </div>
  );
}

export default DeleteAccountModal;
