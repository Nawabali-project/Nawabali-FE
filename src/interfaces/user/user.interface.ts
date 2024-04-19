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
  imgUrl: string;
  district: string;
}

export interface AuthUser {
  id: string;
  nickname: string;
  profileImageUrl: string;
  district: string;
  rank: string;
  totalLikesCount: number;
  totalLocalLikesCount: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  user: AuthUser | null;
  login: (user: AuthUser) => void;
  logout: () => void;
}
