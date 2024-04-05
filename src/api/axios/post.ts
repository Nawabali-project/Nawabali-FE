import { instanceWithToken } from './axios';

export const getPosts = async () => {
  const response = await instanceWithToken.get('/posts');
  console.log('포스트들 가져오기');
  console.log(response);
  return response;
};

export const createPost = async (newPost: any) => {
  console.log('새로운 포스트 생성');
  console.log(newPost);
  await instanceWithToken.post('/posts', newPost);
};
