import { authInstance, instance } from '../axios';
import { AxiosError } from 'axios';
import type {
  SignUpUser,
  LoginUser,
  VarifyCheck,
} from '@/interfaces/main/auth/auth.interface';
// import { Cookies } from 'react-cookie';
import useAuthStore from '@/store/AuthState';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}
export const signUp = async (user: SignUpUser) => {
  try {
    const res = await instance.post('/users/signup', user);
    return res;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      const message = axiosError.response.data.message || '회원가입 실패';
      throw new Error(message);
    }
    throw new Error('Network error');
  }
};
export const login = async (user: LoginUser) => {
  try {
    const res = await authInstance.post('/users/login', user);
    return res;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      const message = axiosError.response.data.message || 'Login 실패';
      throw new Error(message);
    }
    throw new Error('Network error');
  }
};

export const getUserInfo = async () => {
  console.log('getUserInfo실행됨');

  try {
    const response = await authInstance.get('/users/my-info');
    localStorage.setItem('user', JSON.stringify(response.data));
    const userStr: any = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      localStorage.setItem('district', user.district);
      localStorage.setItem(
        'profileImageUrl',
        JSON.stringify(user.profileImageUrl),
      );
      localStorage.setItem('rankName', user.rankName);
      localStorage.setItem('userId', user.id);
      localStorage.setItem(
        'totalLikesCount',
        JSON.stringify(user.totalLikesCount),
      );
      localStorage.setItem(
        'totalLocalLikesCount',
        JSON.stringify(user.totalLocalLikesCount),
      );
      localStorage.setItem('nickname', user.nickname);
      localStorage.setItem('needPosts', JSON.stringify(user.needPosts));
      localStorage.setItem('needLikes', JSON.stringify(user.needLikes));
    }
    return response.data;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const sendVerificationCode = async (email: string) => {
  try {
    await instance.post(`/email-verification?email=${email}`);
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const varifyNumberCheck = async (user: VarifyCheck) => {
  const { email, code } = user;
  try {
    const res = await instance.get(
      `/email-verification?email=${email}&code=${code}`,
    );
    const result = res.data;
    return result;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const nicknameDupCheck = async (nickname: string) => {
  try {
    const res = await instance.get(
      `/users/check-nickname?nickname=${nickname}`,
    );
    return res;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const useLogout = () => {
  const navigate = useNavigate();
  return async () => {
    try {
      await authInstance.post(`/users/logout`);
    } catch (error) {
      console.error('Logout failed:', error);
    }
    useAuthStore.getState().logout();
    navigate('/');
  };
};

export const checkAuthStatus = async () => {
  const cookie = new Cookies();
  try {
    const response = await authInstance.get('/users/authenticate');
    const { authenticated } = response.data;

    if (authenticated) {
      const accessToken = response.headers['Authorization'];

      if (accessToken) {
        cookie.set('accessToken', accessToken, {
          path: '/',
          secure: true,
          sameSite: 'none',
        });
      }
      return {
        isLoggedIn: true,
      };
    } else {
      return {
        isLoggedIn: false,
      };
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status != 403) {
      console.error('Error checking authentication status:', error);
    }
    return {
      isLoggedIn: false,
    };
  }
};
