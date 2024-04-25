import { authInstance } from '@/axios';

export const getMyContents = async () => {
  const response = await authInstance.get(`/users/my-posts`);
  console.log('게시물 데이터', response);
  return response;
};

export const getMyBookMarks = async () => {
  const response = await authInstance.get(`/bookmarks/users`);
  console.log('저장됨 데이터', response);
  return response;
};
