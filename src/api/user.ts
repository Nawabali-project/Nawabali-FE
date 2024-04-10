import { authInstance } from './axios/axios';
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';
import { UserInfo } from '@/interfaces/user/user.interface';
import { useQuery } from '@tanstack/react-query';

const getUserInfo = async () => {
  const { data } = await authInstance.get('/users/my-info');
  return data;
};

export const useUserInfo = () => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  });
};

export const editUserInfo = async (userInfo: UserInfo) => {
  try {
    await authInstance.patch('/users/my-info', userInfo);
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response.data;
    }
    return '';
  }
};

export const checkPassWord = async (password: string) => {
  try {
    const response = await authInstance.post('users/check-myPassword', {
      password: password,
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response) {
      return axiosError.response.data;
    }
    return '';
  }
};
