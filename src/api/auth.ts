import { authInstance, instance } from '../axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import type {
  SignUpUser,
  LoginUser,
  VarifyCheck,
} from '@/interfaces/main/auth/auth.interface';
import { Cookies } from 'react-cookie';
import useAuthStore from '@/store/AuthState';
import { UserInfo } from '@/interfaces/main/auth/auth.interface';

export const signUp = async (user: SignUpUser) => {
  try {
    const res = await instance.post('/users/signup', user);
    return res;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};

export const login = async (user: LoginUser) => {
  try {
    const res = await authInstance.post('/users/login', user);
    return res;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      const result = axiosError.response.data.status;
      return result;
    }
  }
};

export const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response = await authInstance.get('/users/my-info');
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

export const logout = async () => {
  const cookie = new Cookies();
  try {
    const response = await authInstance.post('/users/logout');
    if (response.status === 302) {
      cookie.remove('accessToken', { path: '/' });
      useAuthStore.getState().logout();
    }
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};
