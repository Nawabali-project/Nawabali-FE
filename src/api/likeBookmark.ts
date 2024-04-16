import { authInstance } from '@/axios';

export const checkLike = async (postId: number) => {
  await authInstance.patch(`/posts/${postId}/likes`);
};

export const checkLocalLike = async (postId: number) => {
  await authInstance.patch(`/posts/${postId}/localLikes`);
};

export const checkBookmark = async (postId: number) => {
  await authInstance.post(`/bookmarks/posts/${postId}`);
};
