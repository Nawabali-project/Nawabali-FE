export const queryKeys = {
  allPosts: ['allPosts'],
  scrollPosts: (category: string, district: string) => [
    'scrollPosts',
    category,
    district,
  ],
  scrollComments: (postId: number) => ['scrollComments', postId],
};
