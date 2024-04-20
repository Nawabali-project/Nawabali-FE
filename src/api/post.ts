import { useQuery } from '@tanstack/react-query';
import { instance, authInstance } from '../axios';

// 게시글 전체 조회 무한스크롤
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

// 게시글 전체 조회
export const getAllPosts = async () => {
  let params = {
    page: '0',
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

// 게시글 생성
export const createPost = async (newPost: FormData) => {
  console.log('새로운 포스트 생성 createPost api');
  await authInstance.post('/posts', newPost);
};

// 필터링된 게시물 가져오기
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
    size: '5',
    sort: ['string'],
  };

  let pageable = new URLSearchParams();
  pageable.append('page', params.page);
  pageable.append('size', params.size);
  params.sort.forEach((s) => pageable.append('sort', s));

  if (category) pageable.append('category', category);
  if (district) pageable.append('district', district);

  const response = await instance.get(`/posts/filtered?${pageable.toString()}`);
  return response;
};

// 지역 점수 가져오기
export const getAreaScore = async () => {
  const data = await instance.get('/posts/district');
  console.log(data);
  return data;
};

// 게시물 상세보기
export const getDedetailPost = async (postId: number) => {
  const data = await authInstance.get(`posts/${postId}`);
  return data.data;
};

// 게시물 상세보기 useQuery
export const useGetDedetailPost = (postId: number) => {
  return useQuery({
    queryKey: [postId],
    queryFn: () => getDedetailPost(postId),
  });
};

// 게시물 수정
export const editPost = async (postId: number, editedContent: string) => {
  try {
    const response = await authInstance.patch(`/posts/${postId}`, {
      contents: editedContent,
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting post', error);
    throw error;
  }
};

// 게시글 삭제
export const deletePost = async (postId: number) => {
  try {
    const response = await authInstance.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting post', error);
    throw error;
  }
};
