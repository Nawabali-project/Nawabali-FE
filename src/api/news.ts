<<<<<<< HEAD
import { instance } from '../../axios';
=======
import { instance } from '../axios';
>>>>>>> d440a807a13d5fdb8f34a91da1aa5043e03f7aba
import { AxiosError } from 'axios';
import { ErrorResponse } from 'react-router-dom';

export const getPosts = async () => {
  try {
    const res = await instance.get('/posts');
    return res;
  } catch (error) {
    throw error as AxiosError<ErrorResponse>;
  }
};
