// 비밀번호: 영문 + 숫자 + 특수문자 조합  8~15 자리
export const pwCheck = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*\W)[a-zA-Z0-9\W]{8,15}$/;
  return passwordRegex.test(password);
};

// 이메일 형식 체크
export const emailCheck = (id: string) => {
  const emailCheck = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  return emailCheck.test(id);
};

// 닉네임: 특수문자 제외 3자~10자
export const nicknameCheck = (nickname: string) => {
  const nicknameCheck = /^[a-zA-Z0-9가-힣]{3,10}$/;
  return nicknameCheck.test(nickname);
};
