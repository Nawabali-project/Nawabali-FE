export interface UserInfo {
  nickname: string;
  city: string;
  district: string;
  password?: string;
  confirmPassword?: string;
}

export interface ChangedData {
  password?: string;
  confirmPassword?: string;
  nickname: string;
  district: string;
  city: string;
}

export interface User {
  email: string;
  nickname: string;
  profileImageUrl: string;
  district: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}
