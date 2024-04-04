export interface SignUpUser {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  admin?: boolean;
  certificated: boolean;
  city: string;
  district: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface DuplicateCheck {
  email: string;
  code: string;
}
