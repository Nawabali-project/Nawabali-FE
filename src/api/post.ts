import { instance, authInstance } from '../axios';

export const getPosts = async ({ pageParam }: { pageParam: number }) => {
  let params = {
    page: String(pageParam),
    size: '10',
    sort: ['string'],
  };

  let pageable = new URLSearchParams();
  pageable.append('page', params.page);
  pageable.append('size', params.size);
  params.sort.forEach((s) => pageable.append('sort', s));

  const response = await instance.get(`/posts?${pageable.toString()}`);
  console.log('포스트들 가져오기 getPosts api');
  console.log(response);
  return response;
};

export const getAllPosts = async ({ pageParam }: { pageParam: number }) => {
  let params = {
    page: String(pageParam),
    size: '1000',
    sort: ['string'],
  };

  let pageable = new URLSearchParams();
  pageable.append('page', params.page);
  pageable.append('size', params.size);
  params.sort.forEach((s) => pageable.append('sort', s));

  const response = await instance.get(`/posts?${pageable.toString()}`);
  console.log('포스트들 가져오기 getAllPosts api');
  console.log(response);
  return response;
};

export const createPost = async (newPost: FormData) => {
  console.log('새로운 포스트 생성 createPost api');
  await authInstance.post('/posts', newPost);
};

export const getPostsByFilter = async ({
  pageParam,
  category,
  district,
}: {
  pageParam: number;
  category: string;
  district: string;
}) => {
  let params = {
    page: String(pageParam),
    size: '10',
    sort: ['date,desc'],
  };

  let pageable = new URLSearchParams();
  pageable.append('page', params.page);
  pageable.append('size', params.size);
  params.sort.forEach((s) => pageable.append('sort', s));

  if (category) pageable.append('category', category);
  if (district) pageable.append('district', district);

  const response = await instance.get(`/posts/filtered?${pageable.toString()}`);
  return response.data.content;
};

export const getAreaScore = async () => {
  const data = await authInstance.get('/posts/district');
  console.log(data);
  return data;
};
