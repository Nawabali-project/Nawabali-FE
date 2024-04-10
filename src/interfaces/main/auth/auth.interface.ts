export interface SignUpUser {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  city: string;
  district: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface VerifyCheck {
  email: string;
  code: string;
}
